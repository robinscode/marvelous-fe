import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import Constants from '../../constants';
import BtnCellRenderer from '../BtnCellRenderer/BtnCellRenderer';

interface TodoListRef {
  onFilter: (value: string) => void;
  onReload: () => void;
}

interface TodoListProps {
  className?: string,
  title?: string
  completed: boolean
  reload: () => void
}

const TodoList = forwardRef((props: TodoListProps, ref: Ref<TodoListRef>) => {

  const onReload = () => {
    axios.get(Constants.BASE_URL + "/v1/todos?done=" + completed)
    .then(response => {
      setRowData(response.data);
    });
  }

  const {className, title, completed} = props;
  useImperativeHandle(ref, () => ({onFilter, onReload}));

  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line
  const [gridColumnApi, setGridColumnApi] = useState(null);
  // eslint-disable-next-line
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: '',
      field: "id",
      flex: 1,
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {clicked: props.reload, completed: props.completed}
    },
    {headerName: title, field: "task", flex: 10, sort: 'asc'}
  ]);
  // eslint-disable-next-line
  const [frameworkComponents, setFrameworkComponents] = useState({
    btnCellRenderer: BtnCellRenderer
  });

  useEffect(() => onReload());

  const onFilter = (value: string) => {
    const filterInstance = gridApi.getFilterInstance('task');
    if (value && value.length > 0) {
      filterInstance.setModel({
        type: 'startsWith',
        filter: value,
      });
    } else {
      filterInstance.setModel(null);
    }
    gridApi.onFilterChanged();
  }

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div className={className}>
      <AgGridReact columnDefs={columnDefs}
                   onGridReady={onGridReady}
                   frameworkComponents={frameworkComponents}
                   rowData={rowData}
      >
        <AgGridColumn field="task"></AgGridColumn>
      </AgGridReact>
    </div>
  )
});

export default TodoList;
