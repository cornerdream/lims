import React ,{Component, useState} from "react";

import { Breadcrumb,Timeline } from "antd";

class Time extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            // breadItem:['data-table',props.href.state.code],
            mode:'left',
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
        const {breadItem,mode,data} =this.state
        return (
            <>
             {/* <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    {breadItem.map(item=>{
                        return <Breadcrumb.Item key={item} onClick={()=>this.onBreadItem(item)}>{item}</Breadcrumb.Item>
                    })}
             </Breadcrumb>    */}
             <Timeline mode={mode}>
                {data.map(item=>{
                    return <Timeline.Item label={item.label} color={item.color} key={item.label}><p>{item.title}</p></Timeline.Item>
                })}
                 
             </Timeline>
            </>
        )

    }
}

export default Time