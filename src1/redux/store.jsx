//import {createStore} from 'redux'
import {createStore} from "../libs/redux";
import reducers from './reducers'  // reducers包含多个reducer的reducer

export default createStore(reducers)