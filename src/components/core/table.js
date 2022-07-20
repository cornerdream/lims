// import React ,{Component} from 'react'
// import { Table } from 'antd';
import React, { Component} from 'react';
// import {useNavigate} from 'react-router-dom'
import { Table, Input, InputNumber, Popconfirm, Form, Typography , Tag, Space,Button,Modal,Select,Upload, message} from 'antd';
import {  PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import {withNavigation} from '../helper/wrap'
import {getTable,addTable,updateTable,deleteTable} from '../../api/sample'
// import {upload} from '../../api/upload'
import XLSX from 'xlsx'
// import MyUpload from './upload'
const { Option } = Select;
class MyTable extends Component {
  form = React.createRef()
  codeForm = React.createRef()
  qrcodeRef = React.createRef()
  addFormRef = React.createRef()
  uploadFormRef = React.createRef()
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      visible:false,//二维码弹窗显示
      visibleAdd:false,//添加数据弹窗显示
      visibleUpload:false,//上传数据弹窗显示
      fileList:[],//上传列表
      uploadTable:[],//上传数据显示表格数据
      uploadDataSource:[],//上传数据显示在表格数据的行
      uploadColumns:[],//上传数据显示在表格数据的列
      downloadTable:[],//
      dataParam:{//表格数据的请求参数
        limit:10,
        total:0,
        offset:0,
        filter:{},
        sort:{},
      },
      data:[],//表格数据
      columns: [],//表格数据的列
      editingKey:'',//可编辑key
      deleteingKey:'',//可删除key
      codeingKey:'',//可编码key
      qrcode:'',//二维码
      qrcodeShow:false,//二维码显示
    };
    this.CodeForm = this.CodeForm.bind(this)
    this.addCode = this.addCode.bind(this)
    this.linkCode = this.linkCode.bind(this)
    this.addForm = this.addForm.bind(this)
    this.addData = this.addData.bind(this)
    this.uploadForm = this.uploadForm.bind(this)
    this.setUpload = this.setUpload.bind(this)
  }
  isEditing = (record) => record._id === this.state.editingKey;
  isDeleteing = (record) => record._id === this.state.deleteingKey;
  isCodeing = (record) => record._id === this.state.codeingKey;
  //获取
  getSample=async (param)=>{
    console.log('getSample')
    param=param?param:this.state.dataParam
    console.log(param)
    const res = await getTable(param)
    console.log(res)
    this.setState({dataParam:res.sampleParam,downloadTable:res.sampleTotal})
    const data = res.sampleTable.map(item=>{return {...item,key:item._id}})
    console.log(data)
    this.setState({data})
  }
  //添加
  handleAdd = () => {
    console.log('modaladd')
    this.setState({ visibleAdd:true})
  };
  //上传
  handleUpload = ()=>{
    console.log('modalupload')
    this.setState({ visibleUpload:true})
  }
  //下载
  handleDownload = ()=>{
    console.log('modaldownload',this.state.data,this.state.downloadTable)
    var sheet = XLSX.utils.json_to_sheet(this.state.downloadTable)
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,sheet,'样本')
    const workbookBlob = this.workbook2blob(wb)
    this.openDownloadDialog(workbookBlob,'样本.xlsx')
  }
  workbook2blob=(wb)=>{
    var wopts={
      bookType:'xlsx',
      bookSST:false,
      type:'binary'
    }
    var wbout = XLSX.write(wb,wopts)
    let buf = this.s2ab(wbout)
    var blob = new Blob([buf],{type:'application/octet-stream'})
    return blob
  }
  openDownloadDialog=(blob,fileName)=>{
    if(typeof blob==='object'&& blob instanceof Blob){
      blob = URL.createObjectURL(blob)
    }
    var aLink = document.createElement('a')
    aLink.href = blob
    aLink.download = fileName||''
    var event 
    if(window.MouseEvent){
      event = new MouseEvent('click')
    }
    aLink.dispatchEvent(event)
  }
  s2ab=(s)=>{
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for(var i=0;i!==s.length;++i){
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }
  //编辑
  edit = (record) => {
    console.log(record)
    console.log(this)
    this.form.current.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    this.setState({ editingKey:record._id})
  };
  //删除
  del = (record) => {
      console.log(record)
      this.setState({ deleteingKey:record._id})
  };
  //取消编辑
  cancelEdit = () => {
    this.setState({ editingKey:''})
  };
  //取消删除
  cancelDelete = () => {
      this.setState({ deleteingKey:''})  
  };
  //关闭二维码弹窗
  hideModal=()=>{    
    console.log('hideModal')
    this.setState({
      visible:false,
      codeingKey:'',
      qrcodeShow:false,
      qrcode:''
    })
  }
  //关闭添加弹窗
  hideModalAdd=()=>{    
    console.log('hideModalAdd')
    this.setState({
      visibleAdd:false,
    })
  }
  setUpload = (params)=>{
    console.log('setUpload',params)
    let uploadData,uploadColumns;
    if(params.uploadTable){
      uploadData = params.uploadTable.map((item,index)=>{
        return {
          ...item,
          key:index
        }
      })
      console.log(uploadData)
      // this.setState({uploadDataSource:uploadData})
      uploadColumns = uploadData.length>0?Object.keys(uploadData[0]).map((item,index)=>{
  
        return {
          title:item,
          dataIndex:item,
          key:item
        }
      }):[]
      console.log(uploadColumns)
    }
    console.log(uploadData,uploadColumns)
    console.log(params.uploadDataSource,params.uploadColumns,params.visibleUpload,params.fileList,params.uploadTable)
    this.setState({
      uploadDataSource:!params.uploadDataSource?uploadData:params.uploadDataSource,
      uploadColumns:!params.uploadColumns?uploadColumns:params.uploadColumns,
      visibleUpload:params.visibleUpload,
      fileList:params.fileList,
      uploadTable:params.uploadTable,
      // uploadDataSource:params.uploadDataSource,
      // uploadColumns:params.uploadColumns
    },()=>{
      console.log(this.state)
    })
    
  }
  //上传弹窗
  uploadForm = ()=>{
    const {visibleUpload,uploadDataSource,uploadColumns} = this.state
    return (
      <Modal title="上传" visible={visibleUpload} onOk={this.handleOk} onCancel={this.handleCancel}   destroyOnClose={true}>        
        <Form layout="vertical" ref={this.uploadFormRef}>
            <Form.Item name="files">
                <div>
                    <Upload customRequest={()=>false}  onChange={(info)=>this.handleChange(info)} maxCount={1} onRemove={(info)=>this.handleRemove(info)}>
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
  handleOk=async ()=>{
    const res = await addTable(this.state.uploadTable)
    console.log(res)
    this.setState({
        visibleUpload:false,
        fileList:[],
        uploadTable:[],
        uploadDataSource:[],
        uploadColumns:[]
    })
  }

  handleRemove=(file)=>{
    console.log(file)
    this.setState({
      fileList:[],
      uploadTable:[],
      uploadDataSource:[],
      uploadColumns:[]
    })  
  }

  readExcel=(e,files)=>{
    console.log(e,files,files.length)
    if(files.length<0){
      return false
    }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
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
          // const data = e.target.result
          // console.log(data)
          const workbook = XLSX.read(data,{type:'binary'})
          console.log(workbook)
          const wsname = workbook.SheetNames[0]
          console.log(wsname)
    
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          console.log(ws)
          this.setState({
            uploadTable:ws
          },async()=>{
            console.log(this.state.uploadTable)
            const uploadData = this.state.uploadTable.map((item,index)=>{
              return {
                ...item,
                key:index
              }
            })
            console.log(uploadData)
            this.setState({uploadDataSource:uploadData})
            const uploadColumns = Object.keys(uploadData[0]).map((item,index)=>{

              return {
                title:item,
                dataIndex:item,
                key:item
              }
            })
            console.log(uploadColumns)
            this.setState({uploadColumns})
            
          })
        }catch(err){
          console.log(err)
          return false
        }
      
    }
    
    
    fileReader.readAsArrayBuffer(files[0].originFileObj)
    // fileReader.readAsBinaryString(files[0])
    fileReader.onloadend=()=>{
      if(fileReader.readyState === 2){
        e.file.status='success'
      }
    }
    console.log(this.state.uploadTable)
  }
  handleChange=(e)=>{
    console.log(e)
    this.setState({
        fileList:[...e.fileList],
        uploadTable:[]
    })
    console.log(e.file, e.fileList,this.state.fileList,this.state.uploadTable);
    this.readExcel(e,e.fileList)
  }

  handleCancel=()=>{
      this.setState({
          visibleUpload:false,
          fileList:[],
          uploadTable:[]
      })
  }

  showModal=()=>{
      this.setState({
          visibleUpload:true
      })
  }

  addForm = () => {
    const {visibleAdd} = this.state
    return (
      <Modal title="添加新的样本数据" visible={visibleAdd} onCancel={this.hideModalAdd} footer={null} destroyOnClose={true}>
        <Form ref={this.addFormRef} >
          <Form.Item label="name" name="name">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="tags" name="tags">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
          >
            {["demo",'test'].map((item)=><Option value={item} key={item}>{item}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => this.addData()} block>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )  
  }
  addData=async()=>{
    console.log('addData')
    const data = this.addFormRef.current.getFieldsValue()
    console.log(data)
    const res = await addTable(data)
    console.log(res)
    this.getSample()
    this.setState({
      visibleAdd:false,
    })
  }
  CodeForm = (props) => {
    console.log(props)
    const {qrcodeShow,visible,codeingKey,qrcode} = props
    return (
    <Modal title="生成二维码" visible={visible} onCancel={this.hideModal} footer={null} destroyOnClose={true}>
      <Form ref={this.codeForm} >
        {qrcodeShow&&
        <div ref={this.qrcodeRef} id="qrcode">
        <QRCode              
          id="qrCode"         
          value={qrcode}
          size={200} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
          style={{ margin: 'auto' }}
          imageSettings={{ // 二维码中间的logo图片
              src: '',
              height: 100,
              width: 100,
              excavate: true, // 中间图片所在的位置是否镂空
          }}
        />
        </div>
        }         
        <Form.Item>
          <Button type="dashed" disabled={qrcodeShow} onClick={() => this.addCode(`http://localhost:3000/data-timeline/${codeingKey}`)} block icon={<PlusOutlined />}>
            生成二维码
          </Button>
          <Button type="dashed" onClick={() => this.printCode()} block icon={<PlusOutlined />}>
            打印二维码
          </Button>
          <Button type="dashed" onClick={() => this.linkCode({pathname:`/data-timeline`,code:`${codeingKey}`})} block icon={<PlusOutlined />}>
            跳转到样本流程
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )}
  componentDidMount(){
    this.getSample()
  }
  addCode=(url)=>{
    console.log('生成',url)
    console.log(this)
    this.setState({
      qrcodeShow:true,
      qrcode:url
    })

  }
  printCode=()=>{
    console.log('打印')
    console.log(this.qrcodeRef)
    
    console.log(document.getElementById('qrcode'))
      const canvas = this.qrcodeRef.current.children[0]
      console.log(canvas)
      const src64 = canvas.toDataURL();
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    console.log(contentWidth,contentHeight)
    // const imgWidth = 800; // 根据纸张宽度设定
    // const imgHeight = (800 / contentWidth) * contentHeight;
    const imgWidth = 80; // 根据纸张宽度设定
    const imgHeight = (80 / contentWidth) * contentHeight;
    console.log(imgWidth,imgHeight)
    const img = new Image();
    const div = document.createElement('div');
    // const div = document.getElementById('qrcode')
    div.appendChild(img);
    img.setAttribute('src', src64);
    img.setAttribute('width', imgWidth);
    img.setAttribute('height', imgHeight);
    img.setAttribute('id', 'imgs');
    div.setAttribute('id', 'printImg');
    document.body.appendChild(div);
    window.document.body.innerHTML = document.getElementById('printImg').innerHTML;
    // window.document.body.innerHTML = document.getElementById('qrcode').innerHTML;
    img.onload = () => {
      window.print();
      window.location.reload();
    };

  }
  linkCode=({pathname,code})=>{
    console.log('跳转',pathname,code)
    const menu = pathname.slice(1)
    console.log(menu)
    this.props.navigate(pathname,{state:{code},replace:true})//传递参数state
    this.props.changeMenu(menu)
  }
  code = (record) => {
    console.log(record)
    this.setState({
      visible:true,
      codeingKey:record._id,
    })
  };
  cancelCode = () => {
    this.setState({codeingKey:''})
  };
  handleEdit = async (key) => {
    console.log(key)
    const row = await this.form.current.getFieldsValue();
    console.log(row)
    const data = {...key,...row}
    console.log(data)
    const res = await updateTable(data)
    console.log(res)
    this.setState({ 
      editingKey:''
    })
    this.getSample()
  };
  handleDelete = async (key) => {
    console.log(key)
    const res = await deleteTable({sampleId:key})
    console.log(res)
    this.setState({ 
      deleteingKey:''
    })
    this.getSample()
  };

// 选择
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
//   筛选
  onChange=(pagination, filters, sorter, extra) =>{
    console.log('params', pagination, filters, sorter, extra);
    let newFilters = {}
    for (let i in filters) {
      if (filters[i]) {
        newFilters[i] = filters[i]
      }
    }

    let params={
      limit:pagination.pageSize,
      offset:pagination.current-1,
      filter:newFilters,
      sort:Object.keys(sorter).length==0?({}):({[sorter.field]:sorter.order=="descend"?-1:1})
    }
    console.log(params)
    this.getSample(params)
  }

  onShowTotal=(total, range) => {
    console.log('Total: ', total)
    console.log('Total: ', range)
    return `${range[0]}-${range[1]} of ${total} items`
  }
  render() {
    const { selectedRowKeys,visible,visibleAdd,visibleUpload, uploadTable,uploadDataSource,uploadColumns,data,dataParam,editingKey,deleteingKey,codeingKey} = this.state;
    console.log(selectedRowKeys,visible, data,dataParam)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        fixed: 'left',
        filters: [
            {
            text: 'sample',
            value: 'sample',
            },
            {
            text: 'test',
            value: 'test',
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) !== -1,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
        editable: true,
      },
      // {
      //   title: 'age',
      //   dataIndex: 'age',
      //   width: '15%',
      //   editable: true,
      // },
      // {
      //   title: 'address',
      //   dataIndex: 'address',
      //   width: '40%',
      //   ellipsis: true,
      //   editable: true,
      // },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = this.isEditing(record);
          const deleteable = this.isDeleteing(record);
          const codeable = this.isCodeing(record)
          console.log(editable,deleteable,codeable)
          if(editable){
              return (
                <span>
                    <Typography.Link
                        onClick={() => this.handleEdit(record)}
                        style={{
                        marginRight: 8,
                        }}
                    >
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={this.cancelEdit}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
              )
          }else if(deleteable){
            return (
                <span>
                    <Typography.Link
                        onClick={() => this.handleDelete(record._id)}
                        style={{
                        marginRight: 8,
                        }}
                    >
                        delete
                    </Typography.Link>
                    <Popconfirm title="Sure to delete?" onConfirm={this.cancelDelete}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span> 
            )
          }
          // else if(codeable){
          //   return (
          //       <span>
          //           <Typography.Link
          //               onClick={() => handleCode(record._id)}
          //               style={{
          //               marginRight: 8,
          //               }}
          //           >
          //               delete
          //           </Typography.Link>
          //           <Popconfirm title="Sure to delete?" onConfirm={cancelCode}>
          //               <a>Cancel</a>
          //           </Popconfirm>
          //       </span> 
          //   )
          // }
          else{
              return (
                <Space size="middle">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => this.edit(record)}>
                        Edit
                    </Typography.Link>
                    <Typography.Link disabled={deleteingKey !== ''} onClick={() => this.del(record)}>
                        Delete
                    </Typography.Link>
                    <Typography.Link disabled={codeingKey !== ''} onClick={() => this.code(record)}>
                        code
                    </Typography.Link>
                </Space>
              )
          }
          
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
    return (

      <>
        <Button
          onClick={this.handleAdd.bind(this)}
          type="primary"
          style={{
            marginBottom: 16,
            marginRight:8,
          }}
        >
        Add a row
        </Button>  
        <Button
          icon={<UploadOutlined />}
          onClick={this.handleUpload.bind(this)}
          type="primary"
          style={{
            marginBottom: 16,
            marginRight:8,
          }}
        >
        upload
        </Button> 
        <Button
          onClick={this.handleDownload.bind(this)}
          type="primary"
          style={{
            marginBottom: 16,
            marginRight:8,
          }}
        >
        download
        </Button> 
        <Form ref={this.form} component={false}>
          <Table
            rowSelection={rowSelection}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              defaultCurrent:dataParam.offset+1,
              total:dataParam.total,
              showSizeChanger:true,
              // onShowSizeChange:this.onShowSizeChange,
              showQuickJumper:true,
              // onChange: this.paginationChange.bind(this),
              showTotal:this.onShowTotal.bind(this),
            }}
            onChange={this.onChange.bind(this)}
          />
        </Form>
        {visible&&this.CodeForm(this.state)}
        {visibleAdd&&this.addForm()}
        {visibleUpload&&this.uploadForm()}     
        {/* {visibleUpload&&<MyUpload visibleUpload={visibleUpload} uploadTable={uploadTable} uploadDataSource={uploadDataSource} uploadColumns={uploadColumns} getSample={this.getSample} setUpload={this.setUpload}></MyUpload>} */}
      </>
    );
  }
}

export default withNavigation(MyTable);