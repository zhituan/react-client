import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
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
//产生聊天状态的reducer
const initChat ={
    chatMsgs:[],//当前用户所有相关msg的数组
    users:{},//所有用户信息对象的对象，属性名：userid ，属性值：{username，header}
    unReadCount:0,//总的未读数量
}
function chat(state=initChat , action) {
    switch (action.type){
        case RECEIVE_MSG_LIST: //data:{users ,chatMsgs}
            const {users , chatMsgs} = action.data
            console.log('action.data',action.data)
            return {
                users,
                chatMsgs,
                unReadCount:0
            }
        case RECEIVE_MSG://data : chatMsg 在初始化initIO，io.socket接收消息后，分发的receiveMsg(chatMsg)
            const chatMsg = action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],//在前面已有的消息列表基础上添加新的消息
                unReadCount:0
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})