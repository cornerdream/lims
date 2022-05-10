import React, { Component, useState } from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'

  


const cardTitle=[
    {
        id:'order',
        title:'订单',
        list:[
            {
                key:'1',
                tab:'数量'
            },
            {
                key:'2',
                tab:'异常'
            }
        ]
    },
    {
        id:'sample',
        title:'样本',
        list:[
            {
                key:'1',
                tab:'数量'
            },
            {
                key:'2',
                tab:'异常'
            }
        ]
    },
    {
        id:'report',
        title:'报告',
        list:[
            {
                key:'1',
                tab:'数量'
            },
            {
                key:'2',
                tab:'异常'
            }
        ]
    },
    {
        id:'project',
        title:'项目',
        list:[
            {
                key:'1',
                tab:'数量'
            },
            {
                key:'2',
                tab:'异常'
            }
        ]
    },
    {
        id:'resources',
        title:'资源',
        list:[
            {
                key:'1',
                tab:'数量'
            },
            {
                key:'2',
                tab:'异常'
            }
        ]
    }
]

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            activeTabKey1:'1'
        }
    }
    onTab1Change = key => {
        console.log(key)
        this.setState({key});
    };

    render(){
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
                            activeTabKey={this['activeTabKey'+(i+1)]}
                            onTabChange={key=>{this.onTab1Change(key)}}
                            >

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
