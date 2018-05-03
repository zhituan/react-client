import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api'

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