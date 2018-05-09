/*
redux模块: 对象
  1. createStore(reducer): 接收一个reducer函数, 返回一个store对象
    使用: createStore(reducer)
  2. combineReducers(reducers): 接收一个包含多个reducer函数的对象, 返回一个新的reducer函数
    使用: combineReducers({count, msgs})
  3. store对象
    getState(): 得到内部管理state对象
    distpatch(action): 分发action, 会触发reducer调用,返回一个新的state, 调用所有绑定的listener
    subscribe(listener): 订阅一个state的监听器
 */

export function createStore(reducer) {
    let state
    const listeners=[]
    state = reducer(state , {type:'@mini-redux'})
  function getState() {
      return state
  }
  function dispatch(action) {
    state = reducer(state ,action)
      listeners.forEach(listener => listener())
  }
  function subscribe(listener) {
    listeners.push(listener)
  }
  return {getState,dispatch,subscribe}
}
// 2. combineReducers(reducers): 接收一个包含多个reducer函数的对象, 返回一个新的reducer函数
export function combineReducers(reducers) {
    return function (state={},action) {
      //依次调用reducers对象中的reducer函数
     return Object.keys(reducers).reduce((newState,key)=>{
            newState[key] = reducers[key](state[key],action)
        return newState },
        {})

    }
}
export function combineReducers2(reducers) {
    return function (state={},action) {
        Object.keys(reducers)
      
    }
  
}