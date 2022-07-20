import React ,{Component,useEffect} from 'react'
import { Breadcrumb,Card ,Tree, Input} from 'antd';
import {Link} from 'react-router-dom'
import MyStep from '../core/step';
// import {getTable} from '../../api/sample'
import PropTypes from  "prop-types"
class TimeLine extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state={
            breadItem:['/data-table',props.href.pathname],
            breadcrumbNameMap:{
                '/data-table':'样本列表',
                '/data-timeline':'样本流程',
            },
            activeTabKey1:'1',
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            sampleTable:[]
        }
        // this.getSample = this.getSample.bind(this)
    }
    
    
    
    onBreadItem=(item)=>{
      item=='data-table'?this.props.navigate(`/data-table`,{replace:true}):this.props.navigate(item,{replace:true})
      this.context.store.value.menu(item.slice(1))
    }
    componentDidMount(){
        console.log('sample mount')
        // useEffect(() => {
        //     this.getSample()
        // })
        
        // this.getSample()
        // getTable().then(res=>{
        //     console.log(res)
        //     this.setState({sampleTable:res.sampleTable})
        // })
    }
    static  contextTypes = {
        store:PropTypes.object.isRequired
    };
    render(){
        // this.getSample()
        const {breadItem,breadcrumbNameMap,sampleTable} = this.state
        console.log(breadItem,breadcrumbNameMap,sampleTable)
        console.log(this.props)
        console.log(this.context)
        return (
            <>
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    {breadItem.map(item=>{
                        return <Breadcrumb.Item key={item} onClick={()=>this.onBreadItem(item)}>{breadcrumbNameMap[item]}</Breadcrumb.Item>
                    })}
                </Breadcrumb> 
                {/* {(sampleTable.length>0)&&<MyTable table={sampleTable}></MyTable>} */}
                <MyStep code={this.props.href.state.code}></MyStep>
            </>
        )
    }
}

export default TimeLine