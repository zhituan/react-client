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
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG: // data: chatMsg
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const {from, to, count} = action.data
            state.chatMsgs.forEach(msg => {
                if(msg.from===from && msg.to===to && !msg.read) {
                    msg.read = true
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from===from && msg.to===to && !msg.read) { // 需要更新
                        return {...msg, read: true}
                    } else {// 不需要
                        return msg
                    }
                }),
                unReadCount: state.unReadCount-count
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