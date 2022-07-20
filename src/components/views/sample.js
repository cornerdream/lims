import React ,{Component,useEffect} from 'react'
import { Card ,Tree, Input} from 'antd';
import {Link} from 'react-router-dom'
import MyTable from '../core/table';
import {getTable} from '../../api/sample'
import {withNavigation} from '../helper/wrap'
import PropTypes from  "prop-types"
class Sample extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state={
            activeTabKey1:'1',
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            sampleTable:[]
        }
        this.getSample = this.getSample.bind(this)
    }
    
    getSample=async ()=>{
        console.log('getSample')
        // const {sampleTable} = this.state
        // useEffect(() => {
            const res = await getTable()
            console.log(res)
            this.setState({sampleTable:res.sampleTable})
            // getTable().then(res=>{
            //     console.log(res)
            //     this.setState({sampleTable:res.sampleTable})
            // })
        // },[sampleTable])
        
    }
    componentDidMount(){
        console.log('sample mount')
        console.log(this.props)
        console.log(this.context)
        // useEffect(() => {
        //     this.getSample()
        // })
        
        // this.getSample()
        // getTable().then(res=>{
        //     console.log(res)
        //     this.setState({sampleTable:res.sampleTable})
        // })
    }
    componentDidUpdate(){
        // this.getSample()
    }
    static  contextTypes = {
        store:PropTypes.object.isRequired
    };
    render(){
        // this.getSample()
        const {sampleTable} = this.state
        console.log(sampleTable)
        console.log(this.props)
        console.log(this.context.store.value)
        return (
            <>
                {/* {(sampleTable.length>0)&&<MyTable table={sampleTable} changeMenu={this.context.store.value.menu} getTable={this.getSample}></MyTable>} */}
                {<MyTable changeMenu={this.context.store.value.menu}></MyTable>}
            </>
        )
    }
}
export default Sample
// export default withNavigation(Sample)