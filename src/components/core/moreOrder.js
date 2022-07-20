import React,{Component} from 'react'
import { Breadcrumb } from 'antd';

import {withNavigation} from '../helper/wrap'

import { UploadOutlined ,PlusOutlined} from '@ant-design/icons';
import { Button, message, Upload , Modal ,Form , Input, Icon} from 'antd';

import {upload} from '../../api/upload'
import MyUpload from './upload'

const uploadButton = (
    <div>
        <PlusOutlined/>
        <div style={{marginTop:8}}>upload</div>
    </div>
)

class MoreOrder extends Component{
    formRef = React.createRef()
    constructor(props){
        super(props)
        console.log(props)
        console.log(this)
        console.log(this.props.location)
        this.state={
            breadItem:['Home',props.href.state.more],
            isModelVisible:false,
            fileList:[],
        }
    }
    onBreadItem=(item)=>{
        item=='Home'?this.props.navigate(`/`,{replace:true}):this.props.navigate(item,{replace:true})
    }

    componentDidMount(){
        console.log('moreorder mount')
    }

    handleOk=()=>{
        // const formData = new FormData(document.getElementById('form'))
        const formData = new FormData()
        console.log(formData)

        this.state.fileList.forEach(item=>{
            formData.append('files',item.originFileObj)
        })

        console.log(formData)
        console.log(formData.getAll('files'))
        
        upload(formData).then(res=>{
            console.log(res)
            if(res.code===200){
                console.log('chenggong')
                message.success(res.message)
            }else{
                console.log('shibai')
                message.error(res.message)
            }
        })
        this.setState({
            isModelVisible:false,
            fileList:[]
        })
    }

    handleRomove=(file)=>{
        this.setState(state=>{
            const index = state.fileList.indexOf(file)
            const newFileList = state.fileList.slice()
            newFileList.splice(index,1)
            return {
                fileList:newFileList
            }
        })
    }

    handleBeforeUpload=(file)=>{
        console.log(file)
        let {name} = file;
        console.log(name)
        var fileExtension = name.substring(name.lastIndexOf('.')+1)
        console.log(fileExtension)
        console.log(this.formRef)
        this.formRef.current.setFieldsValue({'filename':name,'filetype':fileExtension})
        this.setState({
            fileList:file
        })
    }

    handleChange=(e)=>{
        let fileList = e.fileList
        console.log(fileList)
        this.setState({
            fileList
        })
        e.file.status='success'
    }

    handleCancel=()=>{
        this.setState({
            isModelVisible:false
        })
    }

    showModal=()=>{
        this.setState({
            isModelVisible:true
        })
    }
    render(){
        const {breadItem,isModelVisible} =this.state
        return (
            <>
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    {breadItem.map(item=>{
                        return <Breadcrumb.Item key={item} onClick={()=>this.onBreadItem(item)}>{item}</Breadcrumb.Item>
                    })}
                </Breadcrumb>
                
                <Modal title="上传" visible={isModelVisible} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose={true}>
                    
                    {/* <form action="/api/upload" method="post" encType="multipart/form-data" id="form">
                        <input type="file" name="files" />
                    </form> */}
                    <Form layout="vertical" onSubmit={this.handleSubmit} ref={this.formRef}>
                        <Form.Item name="files">
                            <div>
                                {/* <Upload beforeUpload={this.handleBeforeUpload} onChange={(info)=>this.handleChange(info)} onRemove={this.handleRomove}>
                                    {uploadButton}
                                </Upload> */}
                                <Upload customRequest={()=>false} onChange={(info)=>this.handleChange(info)}>
                                    {uploadButton}
                                </Upload>
                            </div>
                        </Form.Item>
                    </Form>

                </Modal>
                {/* {isModelVisible&&<MyUpload></MyUpload>} */}
                <Button icon={<UploadOutlined />} onClick={()=>this.showModal()}>Click to Upload</Button>
            </>
        )
    }
}
export default MoreOrder