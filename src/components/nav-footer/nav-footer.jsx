import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
// 希望在非路由组件中使用路由库的api?
// withRoute()
import {withRouter} from 'react-router-dom' //利用路由组件中props中的一些属性

const Item = TabBar.Item
class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render(){
        let {navList} = this.props
        //过滤掉hide为true的nav
        navList = navList.filter(nav => !nav.hide)//将hide为true的过滤，不显示
        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map((nav)=>(/*key的标识可以是任意一个具有特征的符号*/
                        <Item key={nav.path}
                        title={nav.text}
                        icon = {{uri:require(`./images/${nav.icon}.png`)}}
                    selectedIcon ={{uri:require(`./images/${nav.icon}-selected.png`)}}
                        selected ={path === nav.path}
                        onPress ={()=> this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
// 向外暴露withRouter()包装产生的组件
// 内部会向组件中传入一些路由组件特有的属性: history/location/math
export default withRouter(NavFooter)