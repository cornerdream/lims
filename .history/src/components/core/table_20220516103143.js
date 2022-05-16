// import React ,{Component} from 'react'
// import { Table } from 'antd';
import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography , Tag, Radio, Space} from 'antd';

const originData = [];
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     fixed: 'left',
//     filters: [
//         {
//           text: 'Joe',
//           value: 'Joe',
//         },
//         {
//           text: 'Jim',
//           value: 'Jim',
//         },
//         {
//           text: 'Submenu',
//           value: 'Submenu',
//           children: [
//             {
//               text: 'Green',
//               value: 'Green',
//             },
//             {
//               text: 'Black',
//               value: 'Black',
//             },
//           ],
//         },
//       ],
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       onFilter: (value, record) => record.name.indexOf(value) === 0,
//       sorter: (a, b) => a.name.length - b.name.length,
//       sortDirections: ['descend'],
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     width: 100,
//     render: () => <a>action</a>,
//   },
// ];

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// class MyTable extends Component {
//   state = {
//     selectedRowKeys: [], // Check here to configure the default column
//   };
// // 选择
//   onSelectChange = selectedRowKeys => {
//     console.log('selectedRowKeys changed: ', selectedRowKeys);
//     this.setState({ selectedRowKeys });
//   };
// //   筛选
//   onChange=(pagination, filters, sorter, extra) =>{
//     console.log('params', pagination, filters, sorter, extra);
//   }
//   render() {
//     const { selectedRowKeys } = this.state;
//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange,
//       selections: [
//         Table.SELECTION_ALL,
//         Table.SELECTION_INVERT,
//         Table.SELECTION_NONE,
//         {
//           key: 'odd',
//           text: 'Select Odd Row',
//           onSelect: changableRowKeys => {
//             let newSelectedRowKeys = [];
//             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
//               if (index % 2 !== 0) {
//                 return false;
//               }
//               return true;
//             });
//             this.setState({ selectedRowKeys: newSelectedRowKeys });
//           },
//         },
//         {
//           key: 'even',
//           text: 'Select Even Row',
//           onSelect: changableRowKeys => {
//             let newSelectedRowKeys = [];
//             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
//               if (index % 2 !== 0) {
//                 return true;
//               }
//               return false;
//             });
//             this.setState({ selectedRowKeys: newSelectedRowKeys });
//           },
//         },
//       ],
//     };
//     return <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={this.onChange}/>;
//   }
// }

// export default MyTable;
for (let i = 0; i < 100; i++) {
    originData.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
      tags: [`nice${i}`, 'developer'],
    });
  }
  
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
  
  const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [deleteingKey, setDeleteingKey] = useState('');
    const [selectedRowKeys,setSelectedRowKeys] = useState([])
    const isEditing = (record) => record.key === editingKey;
    const isDeleteing = (record) => record.key === deleteingKey;
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };
    const onChange=(pagination, filters, sorter, extra) =>{
        console.log('params', pagination, filters, sorter, extra);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
            setSelectedRowKeys(newSelectedRowKeys);
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
            setSelectedRowKeys(newSelectedRowKeys);
            },
        },
        ],
    };
    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
      });
      setEditingKey(record.key);
    };
    const del = (record) => {
        console.log(record)
        // setData(data.filter(item => item.key !== record.key))
        setDeleteingKey(true)
    };
    const cancel = () => {
      setEditingKey('');
      setDeleteingKey('')
    };
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
  
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        fixed: 'left',
        filters: [
            {
            text: 'Joe',
            value: 'Joe',
            },
            {
            text: 'Jim',
            value: 'Jim',
            },
            {
            text: 'Submenu',
            value: 'Submenu',
            children: [
                {
                text: 'Green',
                value: 'Green',
                },
                {
                text: 'Black',
                value: 'Black',
                },
            ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        ellipsis: true,
        editable: true,
      },
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
          const editable = isEditing(record);
          const deleteable = isDeleteing(record);
          console.log(editable,deleteable)
          if(editable){
              return (
                <span>
                    <Typography.Link
                        onClick={() => save(record.key)}
                        style={{
                        marginRight: 8,
                        }}
                    >
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
              )
          }else if(deleteable){
            return (
                <span>
                    <Typography.Link
                        onClick={() => save(record.key)}
                        style={{
                        marginRight: 8,
                        }}
                    >
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span> 
            )
          }else{
              return (
                <Space size="middle">
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                    <Typography.Link disabled={deleteingKey !== ''} onClick={() => del(record)}>
                        Delete
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
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
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
            onChange: cancel,
          }}
          onChange={onChange}
        />
      </Form>
    );
  };
  
  export default () => <EditableTable />;