import React, { Component, useState } from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'

import {getOrderChart} from '../../api/order_chart'
import OrderChart from './order_chart';



const cardTitle=[
    {
        id:'order',
        title:'订单',
        list:[
            {
                key:'order-number',
                tab:'数量'
            },
            {
                key:'order-unusual',
                tab:'异常'
            }
        ]
    },
    {
        id:'sample',
        title:'样本',
        list:[
            {
                key:'sample-number',
                tab:'数量'
            },
            {
                key:'sample-unusal',
                tab:'异常'
            }
        ]
    },
    {
        id:'report',
        title:'报告',
        list:[
            {
                key:'report-number',
                tab:'数量'
            },
            {
                key:'report-unusual',
                tab:'异常'
            }
        ]
    },
    {
        id:'project',
        title:'项目',
        list:[
            {
                key:'project-number',
                tab:'数量'
            },
            {
                key:'project-unusual',
                tab:'异常'
            }
        ]
    },
    {
        id:'resources',
        title:'资源',
        list:[
            {
                key:'resource-number',
                tab:'数量'
            },
            {
                key:'resource-unusual',
                tab:'异常'
            }
        ]
    }
]

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            activeTabKey:'order-number',
            activeTabKeyorder:'order-number',
            activeTabKeysample:'sample-number',
            activeTabKeyreport:'report-number',
            activeTabKeyproject:'project-number',
            activeTabKeyresource:'resource-number',
            orderChart:[],
        }
    }

    onTab1Change = (key,id) => {
        console.log(key,id)
        this.setState({
            ['activeTabKey'+id]:key
        });
    };
    
    componentDidMount(){
        console.log('home mount')
        getOrderChart().then(res=>{
            console.log(res)
            this.setState({
                orderChart:res.order_chart
            })
        })

    }
    render(){
        const {orderChart} = this.state
        return (
            <>
                 home
                {
                    cardTitle.map((item,i)=>{
                        return (
                            <Card
                            key={item.title}
                            style={{ width: '100%',margin:'10px 0' }}
                            title={item.title}
                            extra={<Link to={`/more/${item.id}`} state={{more:item.id}}>More</Link>}
                            tabList={item.list}
                            activeTabKey={this.state['activeTabKey'+(item.id)]}
                            onTabChange={(key)=>this.onTab1Change(key,item.id)}
                            >
                                {this.state['activeTabKey'+(item.id)]==='order-number'?<OrderChart data={orderChart}></OrderChart>:<p>content</p>}
                                
                            </Card>
                        )
                    })

                }
            
            </>
        )
    }
}

//   const Home = () => {
//     const [activeTabKey1, setActiveTabKey1] = useState('1');
//     const [activeTabKey2, setActiveTabKey2] = useState('1');
//     const [activeTabKey3, setActiveTabKey3] = useState('1');

//     const onTab1Change = key => {
//         console.log(key)
//       setActiveTabKey1(key);
//     };
//     const onTab2Change = key => {
//       setActiveTabKey2(key);
//     };
  
//     return (
//       <>
//         home

//         {
//             cardTitle.map((item,i)=>{
//                 return (
//                 <Card
//                     key={item.title}
//                     style={{ width: '100%',margin:'10px 0' }}
//                     title={item.title}
//                     extra={<a href="#">More</a>}
//                     tabList={item.list}
//                     activeTabKey={'activeTabKey'+(i+1)}
//                     onTabChange={key => {
//                     onTab1Change(key);
//                     }}
//                 >
//                     card
                    
//                 </Card>
//               )
//             })
//         }
//         {/* <Card
//           style={{ width: '100%' }}
//           title="Card title"
//           extra={<a href="#">More</a>}
//           tabList={tabList}
//           activeTabKey={activeTabKey1}
//           onTabChange={key => {
//             onTab1Change(key);
//           }}
//         >
//             card
//           {contentList[activeTabKey1]}
//         </Card>
//         <br />
//         <br />
//         <Card
//           style={{ width: '100%' }}
//           tabList={tabListNoTitle}
//           activeTabKey={activeTabKey2}
//           tabBarExtraContent={<a href="#">More</a>}
//           onTabChange={key => {
//             onTab2Change(key);
//           }}
//         >
//           {contentListNoTitle[activeTabKey2]}
//         </Card> */}
//       </>
//     );
//   };
  
  export default Home;
