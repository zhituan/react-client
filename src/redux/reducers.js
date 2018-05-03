import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'
import {getRedirectTo} from '../utils'
//根据后台返回的数据来更新state?
//{code: 0/1, data: user{username,type,_id}, msg: ''}
const initUser ={
    username:'',
    type:'',//用户类型laban/dashen
    msg:'',//注册或者登陆失败，返回的错误信息
    redirectTo:''//注册或者登陆成功后，重定向到指定页面.该行为可以避免请求失败信息在页面的一直呈现
}
// 产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data是user
            const {type, header} = action.data
            return {...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG: // data是msg
            return {...state, msg: action.data}
        case RECEIVE_USER: // data是user
            return action.data
        case RESET_USER: // data是msg
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

//产生userlist状态的reducer
const initUserList = []
function userList(state = initUserList ,action) {
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data //获取的是数组[{…}, {…}, {…}, {…}, {…}]
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList
})