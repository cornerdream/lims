import { Button, Form, Input ,Modal} from "antd"
import React , { useState ,useEffect}from 'react';

import { useNavigate } from "react-router-dom";

import { signin } from "../../store/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"



const Signin = () => {
  const [visible,setVisible] = useState(true)
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
    const res = dispatch(signin(value))
    console.log(res)
    // redirectToDashboard()

  }
  
  useEffect(() => {
    if (auth.name) {
      form.resetFields()
      redirectToDashboard()
    }
  },[auth])
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
  const signinForm = () => (
    <Modal title="登录" visible={visible} onCancel={hideModal} footer={null}>
      {/* <p>Locale Modal</p> */}
        
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="用户名">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )

  return (
    <>
    {signinForm()}
    </>
  )
}

export default Signin