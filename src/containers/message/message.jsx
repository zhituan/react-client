/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
class Message extends Component {
    render() {
        return (
            <div>信息列表</div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(Message)