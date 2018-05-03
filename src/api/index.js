/*
* 包含n个接口请求函数的模块，每个函数返回的是promise对象*/
import ajax from './ajax'
//注册请求
//注意为什么是user
export const reqRegister = (user) => ajax('/register',user,'POST')
//登录请求
export const reqLogin = (user) => ajax('/login',user,'POST')
// 更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 获取用户信息
export const reqUser = () => ajax('/user')
//获取用户列表
export const reqUserList = (type) =>ajax('/userlist',{type})