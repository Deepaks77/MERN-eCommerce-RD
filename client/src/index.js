import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from "redux"
import {Provider} from "react-redux"
import {composeWithDevTools} from "redux-devtools-extension"
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import "antd/dist/antd.css"
import "react-toastify/dist/ReactToastify.css"
import rootReducer from "./reducers"

//I am following Ryan Structure's here from redux but geniuely i like structure creating in brad traversy's project.
//create redux store
const store = createStore(rootReducer,composeWithDevTools())
ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

