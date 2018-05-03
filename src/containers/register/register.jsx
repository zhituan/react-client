import React ,{Component}from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {
    NavBar,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Button,
    Radio
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'
const ListItem = List.Item

class Register extends Component{
    state = {
        username:'',
        password:'',
        password2:'',
        type:'laoban'
    }
    handleChange = (name,val) =>{
        this.setState({
            [name]:val
        })
    }
    toLogo = ()=>{
        this.props.history.replace('/login')
    }
    register = ()=>{
        this.props.register(this.state)
    } 
    render(){
        const {msg , redirectTo} = this.props.user
        //如果redirectTo有值, 就需要重定向到指定的路由
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                   <List>
                       {msg ? <div className='error-msg'>{msg}</div> : null}
                       <WhiteSpace/>
                      <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)}>用户名：</InputItem>
                       <WhiteSpace/>
                      <InputItem placeholder='请输入密码' type='password' onChange={val=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                      <WhiteSpace/>
                      <InputItem placeholder='请再次输入密码' type='password' onChange={val=>this.handleChange('password2',val)}>确认密码：</InputItem>
                       <WhiteSpace/>
                       <ListItem>
                           <span>用户类型：</span>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={this.state.type === 'dashen'} onClick={()=>this.handleChange('type','dashen')}>大神</Radio>
                           &nbsp;&nbsp;&nbsp;
                           <Radio checked={this.state.type === 'laoban'} onClick={()=>this.handleChange('type','laoban')}>老板</Radio>
                       </ListItem>
                       <WhiteSpace/>
                       <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                       <Button onClick={this.toLogo}>已有账户</Button>
                   </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    //在combineReducers中传入的状态属性user,目前在state中有一个user的状态
    state => ({user:state.user}),
    {register}
)(Register)