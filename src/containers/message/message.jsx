import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
/*
对chatMsgs按chat_id进行分组, 并得到每个组的lastMsg组成的数组
1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id, lastMsg}
2. 得到所有lastMsg的数组
3. 对数组进行排序(按create_time降序)
 */
function getLastMsgs(chatMsgs , userid) {
  //  1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id, lastMsg}
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        //对msg进行个体统计
        if(msg.to === userid && !msg.read){
            msg.unReadCount = 1
        }else{
            msg.unReadCount = 0
        }
        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg){//没有就将信息存进来
            lastMsgObjs[chatId] = msg
        }else{//如果有name比较一下那个是最新的
            //累加unReadCount=已经统计的+当前的msgde
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
            //将unReadCount保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })
    //2. 得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs)
    //3. 对数组进行排序(按create_time降序)
    lastMsgs.sort((m1,m2)=>{
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}
class Message extends Component {

    render() {
        const {user} = this.props
        const {users , chatMsgs} = this.props.chat
        // 对chatMsgs按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs , user._id)
        return (
            <List style={{marginTop:50 , marginBottom:50}}>
                {
                    lastMsgs.map(msg =>{
                        //得到目标用户的id
                        const targetUserId = msg.to===user._id ? msg.from : msg.to
                        //得到目标用户的信息
                        const targetUser = users[targetUserId]
                        return(
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={ targetUser.header ? require(`../../assets/images/${targetUser.header}.png`):null}
                                arrow='horizontal'
                                onClick = {()=>this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }

            </List>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)