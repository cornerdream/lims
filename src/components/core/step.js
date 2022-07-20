import { Steps } from 'antd';
import { useState,useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography , Tag, Radio, Space,Button,Modal,Select,Upload, message,DatePicker} from 'antd';
import {getTable,addTable,updateTable,deleteTable} from '../../api/sample'
const { Step } = Steps;
const { Option } = Select;
const MyStep = (props) => {
  console.log(props)
    const [current, setCurrent] = useState(0);
    const [stepContent,setStepContent] = useState({})
    
    const onChange = (value) => {
      console.log('onChange:', value);
      setCurrent(value);
    };
    //获取
    const getSample=async (param)=>{
      console.log('getSample')
      param=param?param:{
        limit:10,
        total:0,
        offset:0,
        filter:{},
        sort:{},
      }
      console.log(param)
      param.filter={_id:props.code}
      const res = await getTable(param)
      console.log(res)
      console.log(res.sampleTable)
      console.log(res.sampleTable[0])
      setStepContent(res.sampleTable[0])
      console.log(stepContent)
    }
    useEffect(() => {
      getSample();
    },[])
    return (
      
      <>
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step
            title="Step 1"
            subTitle="00:00:05"
            status="finish"
            description="This is a description."
          />
          <Step
            title="Step 2"
            subTitle="00:01:02"
            status="process"
            description="This is a description."
          />
          <Step
            title="Step 3"
            subTitle="waiting for longlong time"
            status="wait"
            description="This is a description."
          />
        </Steps>
       
        <div className="steps-content">
          {current==0?<div>step1
            
          </div>:null}
          {current==1?<div>step2</div>:null}
          {current==2?<div>step3</div>:null}
          {current==3?<div>step4</div>:null}
        </div>
          
        
        {/* <Steps
          type="navigation"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step status="finish" title="Step 1" />
          <Step status="process" title="Step 2" />
          <Step status="wait" title="Step 3" />
          <Step status="wait" title="Step 4" />
        </Steps>
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step status="finish" title="finish 1" />
          <Step status="finish" title="finish 2" />
          <Step status="process" title="current process" />
          <Step status="wait" title="wait" disabled />
        </Steps> */}
      </>
    );
  };
  
  export default MyStep;