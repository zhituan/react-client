/*注册、登陆是2种状态：成功，失败
* 成功
* 失败：错误提示信息，请求前、请求后
*/
export const AUTH_SUCCESS = 'auth_success'
export const ERROR_MSG = 'error_msg'
export const RECEIVE_USER = 'receive_user' // 接收用户
export const RESET_USER = 'reset_user' // 重置用户
export const RECEIVE_USER_LIST = 'receive_user_list '//接收用户列表
export const RECEIVE_MSG_LIST = 'receive_msg_list'//接收消息列表
export const RECEIVE_MSG = 'receive_msg' //接收一条消息
export const MSG_READ = 'msg_read' //标识已读消息列表