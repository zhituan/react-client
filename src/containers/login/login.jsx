import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import {
    NavBar,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Button,
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import Register from "../register/register";
class Login extends Component{
    state ={
        username:'',
        password:''
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }
    login = ()=>{
        this.props.login(this.state)
    }
    toRegister = ()=>{
        this.props.history.replace('/register')
    }
    render(){
        const {msg , redirectTo} = this.props.user
        if(redirectTo){
            return <Register to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)