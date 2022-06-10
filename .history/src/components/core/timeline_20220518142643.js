import React ,{Component, useState} from "react";

import { Timeline } from "antd";

class Time extends Component{
    constructor(){
        super()
        this.state={
            data:[
                {
                    label:'2022-5-16',
                    color:'gray',
                    title:'create'
                },
                {
                    label:'2022-5-17',
                    color:'green',
                    title:'create'
                },
                {
                    label:'2022-5-18',
                    color:'red',
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