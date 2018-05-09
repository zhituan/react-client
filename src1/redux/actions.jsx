import {INCREMENT,DECREMENT,ADD_MSG} from './action-types'

export const increment = (num) =>({type:INCREMENT ,data:num})
export const decrement = num => ({type:DECREMENT ,data:num})
export const addMsg = msg => ({type:ADD_MSG, data:msg})