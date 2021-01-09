import axios from 'axios';
import { Component } from 'react';
import Constants from '../../constants';

class BtnCellRenderer extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler() {
    // @ts-ignore
    const id = this.props.value;

    axios.put(Constants.BASE_URL + "/v1/todos/" + id)
    .then(data => {
      // @ts-ignore
      this.props.clicked();
    })
  }

  render() {
    // @ts-ignore
    const isComplete = this.props.completed;
    if (isComplete) {
      return (
        <button onClick={this.btnClickedHandler} className="active:none focus:none">
          <svg className="w-4 h-4 mt-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
      )
    } else {
      return (
        <button onClick={this.btnClickedHandler} className="active:none focus:none">
          <svg className="w-4 h-4 mt-3 active:none focus:none" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      )
    }
  }
}

export default BtnCellRenderer;
