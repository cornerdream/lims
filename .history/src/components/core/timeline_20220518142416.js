import React ,{Component, useState} from "react";

import { Timeline } from "antd";

class Time extends Component{
    constructor(){
        super()
        this.state={
            data:[
                {
                    label:'2022-5-18',
                    color:'gray',
                    title:'create'
                }
            ]
        }
    }
    render(){
        const {data} =this.state
        return (
            <>
             <Timeline>
                {data.map(item=>{
                    return <Timeline.Item label={item.label} color={item.color} >{item.title}</Timeline.Item>
                })}
                 
             </Timeline>
            </>
        )

    }
}

export default Time