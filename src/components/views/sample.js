import React ,{Component} from 'react'
import { Card ,Tree, Input} from 'antd';
import {Link} from 'react-router-dom'
import MyTable from '../core/table';

class Sample extends Component {
    state={
        activeTabKey1:'1',
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }
    
    render(){
        
        return (
            <>
                <MyTable></MyTable>
            </>
        )
    }
}

export default Sample