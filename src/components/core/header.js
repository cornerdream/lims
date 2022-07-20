import React ,{Component}from 'react';
import {BellOutlined} from '@ant-design/icons';
import { Layout,Row,Col,Badge,Button, message} from 'antd';

import store from '../../store';
import {withNavigation} from '../helper/wrap'
import { signout } from "../../store/actions/auth.actions"

const { Header} = Layout;
// const MyHeader=()=>{
//     const {signin} = store.getState()
//     console.log(signin)
//     const navigate = useNavigate();
//     var weeks=["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//     let getDate=()=>{
//         const now = new Date()
//         const date=now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+' '+weeks[now.getDay()]
//         return date
//     }
//     let date = getDate()
    // const [username] = useState('')
//     const [time,setTime] = useState(date)
//     useEffect(()=>{
//         const timer=setInterval(()=>{
//             let date = getDate()
//             setTime(date)
//         },1000)
//         return () => clearInterval(timer);
//     })
    

//     let onSignin=()=>{
//         console.log(navigate)
//         navigate(`/signin`, { replace: true })
//     }
//     return (
//         <Header
//         className="site-layout-background"
//         style={{
//             padding: '0 10px',
//         }}
//         >
//             <Row>
//                 <Col flex={3}></Col>
//                 <Col flex={1}>
//                 <Badge size="small" count={5}>
//                     <BellOutlined />
//                 </Badge>  
//                 </Col>
//                 <Col flex={1}>
//                 { username?<p>欢迎您，{username}</p>:<Button type='text' onClick={onSignin}>signin</Button>}
//                 </Col>
//                 {username&&<Col flex={1}></Col>}
//                 {time}
//             </Row>
//         </Header>
//     )
    
// }
// const state = store.getState()
// console.log(state)

class MyHeader extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            collapsed: false,
            username:localStorage.getItem('name')||'',
            time:new Date(),
            day:new Date().getDay(),
            timer:null,
            weeks:["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        }
        
      
    }
    
    getDate=()=>{
        const now = new Date();
        this.setState({
            time:now,
            day:now.getDay()
        })
    }
    onSignup=()=>{
        // store.subscribe(() => {
        //     const state = store.getState()
        //     console.log(state)
        //     this.setState({
        //         username:state.auth.name
        //     })
        //     this.props.getChild(this.state.username)

            
        // })
        this.props.navigate(`/signup`, { replace: true })
    }
    onSignin=()=>{
        store.subscribe(() => {
            const state = store.getState()
            console.log(state)
            this.setState({
                username:state.auth.name
            })
            this.props.getChild(this.state.username)
        })
        this.props.navigate(`/signin`, { replace: true })
    }
    onSignout=()=>{
        store.dispatch(signout({token:'',name:''}))
        this.setState({
            username:''
        })
        this.props.getChild('')   
        this.props.navigate(`/`, { replace: true })
    }
    componentDidMount(){
        store.subscribe(() => {
            const state = store.getState()
            console.log(state)
            if(state.auth.name){
                console.log('username')
                this.setState({
                    username:state.auth.name
                })
                
            }else{
                console.log('message')
                message.info(state.auth.message)
            }
            
        }) 
        this.timer = setInterval(()=>this.getDate(),1000)   
    }
    componentWillUnmount() { 
        if (this.timer != null) { 
            clearInterval(this.timer);
        }
    }
    render(){
        let {time,username,weeks,day} = this.state
        // console.log(time,username,weeks,day)
        return (

            <Header
            className="site-layout-background"
            style={{
                padding: '0 10px',
            }}
            >
                <Row>
                    <Col flex={3}></Col>
                    <Col flex={1}>
                    <Badge size="small" count={5}>
                        <BellOutlined />
                    </Badge>  
                    </Col>
                    <Col flex={1}>
                    { username?<p>欢迎您，{username}<Button type='text' onClick={this.onSignout}>signout</Button></p>:<Button type='text' onClick={this.onSignin}>signin</Button>}
                    </Col>
                    {username?null:<Col flex={1}><Button type='text' onClick={this.onSignup}>signup</Button></Col>}
                    {/* {time} */}
                    {time.toLocaleString()+' '+weeks[day]}
                </Row>
            </Header>
    
        )
    }

}
export default withNavigation(MyHeader)