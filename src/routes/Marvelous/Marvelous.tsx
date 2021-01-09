import axios from 'axios';
import { useRef, useState } from 'react';
import CenteredOnScreen from '../../components/CenteredOnScreen';
import TodoList from '../../components/TodoList';
import Constants from '../../constants';

const Marvelous = () => {

  const [task, setTask] = useState("")
  const todo = useRef(null);
  const done = useRef(null);

  const onSearchChanged = (e: any) => {
    if (todo.current) {
      todo.current.onFilter(e.target.value);
    }
    if (done.current) {
      done.current.onFilter(e.target.value);
    }
  }

  const reload = () => {
    if (todo.current) {
      todo.current.onReload();
    }
    if (done.current) {
      done.current.onReload();
    }
  }

  const onAdd = (e: any) => {
    axios.post(Constants.BASE_URL + "/v1/todos", {
      "task": task,
      completed: false
    })
    .then(response => {
      reload();
      setTask("");
    });
  }

  const onTaskChange = (e: any) => {
    setTask(e.target.value);
  }

  const confirmDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm("Are you sure?");
    if (ok) {
      axios.delete(Constants.BASE_URL + "/v1/todos")
      .then(response => {
        reload();
        setTask("");
      });
    }
  }

  return (
    <CenteredOnScreen>
      <div className="flex-col w-9/12 h-4/6 bg-gray-200 shadow-2xl p-5">

        <div className="flex justify-between justify-items-center">
          <div className="text-3xl font-extrabold">Marvelous v2.0</div>
          <div className="text-sm">
            <button className="py-2 px-4 bg-gray-300 rounded-2xl shadow" onClick={confirmDelete}>Delete All Tasks
            </button>
          </div>
        </div>

        <div className="flex justify-between content-center p-10">
          <div className="flex w-1/2 justify-center">
            <input className="rounded py-2 px-4 w-3/4" value={task} onChange={onTaskChange}/>
            <button className="mx-2 py-2 px-6 bg-gray-300 rounded" onClick={onAdd}>Add</button>
          </div>
          <div className="flex w-1/2 justify-center">
            <input className="rounded py-2 px-4 w-3/4" placeholder="Search..." onChange={onSearchChanged}/>
          </div>
        </div>

        <div className="flex justify-between content-center p-5 h-96">
          <div className="flex w-1/2 justify-center p-2">
            <TodoList ref={todo}
                      className="w-full h-full ag-theme-alpine"
                      title="To Do"
                      completed={false}
                      reload={reload}
            />
          </div>
          <div className="flex w-1/2 justify-center p-2">
            <TodoList ref={done}
                      className="w-full h-full ag-theme-alpine"
                      title="Done"
                      completed={true}
                      reload={reload}
            />
          </div>
        </div>
      </div>
    </CenteredOnScreen>
  );
}

export default Marvelous;
