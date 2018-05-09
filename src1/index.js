import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import store from './redux/store'
ReactDOM.render(<App  store={store}/>, document.getElementById('root'))
//监视状态的变化，状态发生改变重新渲染
store.subscribe(function () {
    ReactDOM.render(<App  store={store}/>, document.getElementById('root'))
})