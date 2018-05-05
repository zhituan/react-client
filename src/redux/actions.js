import io from 'socket.io-client'
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
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadChatMsg
} from '../api'
/*单例对象
1，创建对象之前：判断对象是否已经存在，只有不存在才去创建
2，创建对象之后：保存对象
*/
//初始化客户端socketio
/*
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */

function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if(!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            // debugger
            if(userid===chatMsg.from || userid===chatMsg.to) {
                dispatch(receiveMsg(chatMsg))
            }
        })

    }
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
        const {users, chatMsgs} = result.data
        console.log('xxxx' , result.data)
        // 分发同步action
        dispatch(receiveMsgList({users, chatMsgs}))
    }
}

//发送消息的异步action
export const sendMsg = ({from , to ,content}) =>{
    return dispatch =>{
        console.log('发送消息'+{from , to, content})
        //发送消息
        io.socket.emit('sendMsg',{from , to ,content})
    }
}
//授权成功的同步action
 const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
 const errorMsg = (msg) => ({type:ERROR_MSG , data:msg})
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//获取用户列表的同步action
const receiveUserList =(userList) =>({type :RECEIVE_USER_LIST,data:userList})
//接收消息列表的同步action
const receiveMsgList = ({users , chatMsgs}) =>({type:RECEIVE_MSG_LIST , data:{users , chatMsgs}})
//接收一个消息的同步action
const receiveMsg = (chatMsg) => ({type:RECEIVE_MSG , data:chatMsg})

//注册异步action
export const register = (user)=>{
     const {username , password ,password2,type} = user
    if(!username){
         return errorMsg('用户名不能为空')
    }else if(password !== password2){
         return errorMsg('2次密码要一致')
    }

    return async dispatch =>{
        // 发送注册的异步ajax请求
        const response = await reqRegister({username , password ,type})
        const result = response.data //  {code: 0/1, data: user, msg: ''}
        if(result.code === 0){
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))

        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
//登陆异步请求
export const login = (user) =>{
     //前台验证
    if(! user.username){
        return errorMsg('用户名不能为空')
    }else if(!user.password){
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        //发送异步，并取得返回的信息
        const respose = await reqLogin(user)
        const result = respose.data // {code: 0/1, data: user, msg: ''}
        if(result.code === 0){
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
// 更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code===0) { // 更新成功: data
            dispatch(receiveUser(result.data))
        } else { // 更新失败: msg
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        // 执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if(result.code===0) { // 成功
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { // 失败
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表的异步action
export const getUserList = (type)=>{
    return async dispatch =>{
        const response = await reqUserList(type)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
           // console.log(result.data) [{…}, {…}, {…}, {…}, {…}]
        }
    }
}

