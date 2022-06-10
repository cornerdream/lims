import { Button, Form, Input, Result ,Modal} from "antd"
import React , { Component,useState ,useEffect}from 'react';

import { useNavigate } from "react-router-dom";
import {withNavigation} from '../helper/wrap'

import { signin } from "../../store/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"
// import { isAuth } from "../../helpers/auth"
// import { Redirect } from "react-router-dom"
import {login} from '../../api/user'

const navigate=useNavigate()
const Signin = () => {
  // 获取 dispatch
  const dispatch = useDispatch()
  // 登录表单提交
  const onFinish = (value) => {
    console.log(value)
    // 发送登录请求
    dispatch(signin(value))
    // const res = dispatch(signin(value))
    // console.log(res)
    setVisible({ visible: false });
    //   console.log(this.props)
    navigate('/')
    // login(value).then((res)=>{
    //   console.log(res)

    // })
    
  }
  // 1. 获取登录结果
  const auth = useSelector(state => {
    console.log(state)
    return state.auth
  })
  console.log(auth)
  // 2. 登录失败 显示错误信息
  const showError = () => {

  }
  // 3. 登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    
  }
  const [visible,setVisible] = useState(true)
 
  const hideModal=()=>{
    setVisible({ visible: false });
    navigate('/')
  }
  const signinForm = () => (
    <Modal title="Locale Modal" visible={visible} onCancel={hideModal}>
      <p>Locale Modal</p>
        
      <Form onFinish={onFinish}>
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
  // 4. 处理导航链接 已登录 隐藏 [登录, 注册] 显示 [dashboard]
  return (
    <>
    sign
    {signinForm()}
    </>
  )
}

export default Signin