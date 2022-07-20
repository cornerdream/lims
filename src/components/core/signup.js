import { Button, Form, Input ,Modal,Row , Col ,Image,message,Result} from "antd"

// import Image from "react-native-remote-svg"
import React , { useState ,useEffect}from 'react';

import { useNavigate ,Link} from "react-router-dom";

import { signup } from "../../store/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"

import {getCode} from "../../api/user"



const Signup = () => {
  const [visible,setVisible] = useState(true)
  const [code,setCode] = useState('')
  const [img,setImg] = useState('')
  const navigate=useNavigate()
  // 1. 获取登录结果
  const auth = useSelector(state => state.auth)
  console.log(auth)
  const [form] = Form.useForm()
  // 获取 dispatch
  const dispatch = useDispatch()
  // 登录表单提交
  const onFinish = (value) => {
    console.log(value)
    // 发送登录请求
    // dispatch(signin(value))
    if(value.captcha==code.toLowerCase()){
        const res = dispatch(signup(value))
        console.log(res)
        // if(auth.success){
        //     redirectToDashboard()
        // }
        
    }else{
        message.error('验证码不一致')
    }
    

  }
//   // 1. 注册成功 清空表单
  useEffect(() => {
    if (auth.name) {
      form.resetFields()
      redirectToDashboard()
    }
  }, [auth])
  
  // 2. 注册成功 显示成功的提示信息
  const showSuccess = () => {
    if (auth.name && auth.success) {
      return (
        <Result
          status="success"
          title="注册成功"
          extra={[
            <Button type="primary">
              <Link to="/signin">登录</Link>
            </Button>
          ]}
        />
      )
    }
  }
  // 3. 注册失败 显示失败的提示信息
  const showError = () => {
    if (auth.message && !auth.success) {
      return (
        <Result
          status="warning"
          title="注册失败"
          subTitle={auth.message}
        />
      )
    }
  }

  // 3. 登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
  
      console.log('函数组件大写')
      setVisible(false);
      navigate('/',{replace:true})
    
  }
  
 
  const hideModal=()=>{    
    console.log('hideModal')
    setVisible(false);
    navigate('/',{replace:true})

  }

  
  const handleImg = async() => {
    let res = await getCode()
    console.log(res)
    console.log(typeof res)
    setCode(res.text)
    setImg(res.data)
  }
  
  useEffect(()=>{
      if(!code){
        handleImg()
      }
      
  })
//   const {svgWrapperRef} = CodeIcon(code)
  const signupForm = () => (
    <Modal title="注册" visible={visible} onCancel={hideModal} footer={null}>
      {/* <p>Locale Modal</p> */}
        
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="用户名">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item label="验证码" extra="We must make sure that your are a human.">
            <Row gutter={8}>
            <Col span={12}>
                <Form.Item
                name="captcha"
                noStyle
                rules={[
                    {
                    required: true,
                    message: 'Please input the captcha you got!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
            </Col>
            {/* <Col span={8}>
                <Button onClick={handleCode}>Get captcha</Button>
            </Col> */}
            <Col span={12}>
                <div dangerouslySetInnerHTML={{__html:img}} onClick={handleImg} style={{height:30}}></div>
                {/* <img src={`data:image/svg+xml;base64,${window.btoa(code)}`} alt="" /> */}
                {/* <img src={`data:image/svg+xml;utf8,${encodeURIComponent(code)}`} alt=""/> */}
            </Col>
            </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
  
  return (
    <>
    {/* {showSuccess()} */}
    {/* {showError()} */}
    {signupForm()}
    </>
  )
}

export default Signup