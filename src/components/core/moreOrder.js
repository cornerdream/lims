import React,{Component} from 'react'
import { Breadcrumb } from 'antd';

import {withNavigation} from '../helper/wrap'
class MoreOrder extends Component{
    constructor(props){
        super(props)
        console.log(props)
        console.log(this)
        console.log(this.props.location)
        this.state={
            breadItem:['Home',props.href.state.more]
        }
    }
    render(){
        const {breadItem} =this.state
        return (
            <>
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    {breadItem.map(item=>{
                        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                    })}
                </Breadcrumb>
            </>
        )
    }
}
export default MoreOrder