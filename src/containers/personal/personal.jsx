/*
用户个人中心路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result , List ,WhiteSpace ,Button ,Modal } from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {
    logout = ()=>{
        Modal.alert('退出','确认退出登录吗？',[
            {text:'取消'},
            {text:'确认',
            onPress:()=>{
                //清除cookie
                Cookies.remove('userid')
                //重置redux的user信息
                this.props.resetUser()
            }
            }
        ])
    }
    render() {
        const {username , header ,post ,info ,salary ,company} =this.props.user
        return (
            <div style={{marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)}/>}

                    title={username}
                    message={company}/*如果company没有值，也不显示*/
                        />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>{/*该属性默认占一行*/}
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资:{salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick = {this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)