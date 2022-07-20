import React,{Component} from 'react';
import { Table, Form, Modal,Upload, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {addTable} from '../../api/sample'
import XLSX from 'xlsx'
class MyUpload extends Component{
    uploadFormRef = React.createRef()
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    handleOk=async ()=>{
        console.log(this.props)
        const res = await addTable(this.props.uploadTable)
        console.log(res)
        this.props.getSample()
        this.props.setUpload({
            visibleUpload:false,
            fileList:[],
            uploadTable:[],
            uploadDataSource:[],
            uploadColumns:[]
        })
    }
    handleCancel=()=>{
        this.props.setUpload({
            visibleUpload:false,
            fileList:[],
            uploadTable:[],
            uploadDataSource:[],
            uploadColumns:[]
        })
    }
    handleChange=(e)=>{
        console.log(this)
        console.log(e)
        this.props.setUpload({
            visibleUpload:true,
            fileList:[...e.fileList],
        })
        this.readExcel(e,e.file)
    }
    readExcel=(e,file)=>{
        console.log(e,file,file.length)
        if(!file){
          return false
        }else if(!/\.(xls|xlsx)$/.test(file.name.toLowerCase())){
          message.error('上传格式不正确，请上传xls或者xlsx')
          return false
        }
        const fileReader = new FileReader()
        console.log(fileReader)        
        fileReader.onload=(e)=>{
            console.log(e)
            try{
              let data =''
              const bytes = new Uint8Array(e.target.result)
              const length = bytes.length
              for(var i=0;i<length;i++){
                data+=String.fromCharCode(bytes[i])
              }
              const workbook = XLSX.read(data,{type:'binary'})
              console.log(workbook)
              const wsname = workbook.SheetNames[0]
              console.log(wsname)    
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
              console.log(ws)
              this.props.setUpload({
                visibleUpload:true,
                uploadTable:ws
              })
            }catch(err){
              console.log(err)
              return false
            }
          
        }
        
        fileReader.readAsArrayBuffer(file.originFileObj)

        fileReader.onloadend=()=>{
            if(fileReader.readyState === 2){
              e.file.status='success'
            }
          }
    }
    handleRemove=(file)=>{
        console.log(file) 
        this.props.setUpload({
            visibleUpload:true,
            fileList:[],
            uploadTable:[],
            uploadDataSource:[],
            uploadColumns:[]
        })
      }
    render(){
        console.log(this.props)
        const {visibleUpload,uploadDataSource,uploadColumns} = this.props;
        return (
            <Modal title="上传" visible={visibleUpload} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose={true}>
                            
                <Form layout="vertical" ref={this.uploadFormRef}>
                    <Form.Item name="files">
                        <div>
                            <Upload customRequest={()=>false}  onChange={(info)=>this.handleChange(info)} maxCount={1} onRemove={()=>false}>
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop:8}}>upload</div>
                            </div>
                            </Upload>
                        </div>
                    </Form.Item>
                </Form>
                <Table dataSource={uploadDataSource} columns={uploadColumns} />;              
            </Modal>
        )
    }
}

export default MyUpload;