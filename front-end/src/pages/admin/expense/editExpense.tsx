import React, { useContext, useEffect, useRef, useState } from 'react';
import { Breadcrumb, DatePicker, InputRef, Layout, notification } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Content } from 'antd/lib/layout/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { add, list, remove, update } from '../../../api/expense';
import 'react-toastify/dist/ReactToastify.css';
// import { DatePicker } from 'antd';


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key
  costname: string;
  cost: number;
  paymentdeadline: string;
  paymentdate: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditExpense = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [dataTable, setDataTable] = useState<DataType>();

  const [api, contextHolder] = notification.useNotification();


  const { id } = useParams();
  const navigate = useNavigate()

  const [count, setCount] = useState(2);

  const handleDelete = (_id: number) => {
    const newData = dataSource.filter((item: any) => item._id !== _id);
    setDataSource(newData);
    remove(_id)
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Cost name',
      dataIndex: 'costname',
      width: '30%',
      editable: true,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      editable: true,
    },
    {
      title: 'Payment deadline',
      dataIndex: 'paymentdeadline',
      editable: true,
      // render: (text, record) => {
      //   // Assuming 'paymentdeadline' is a date field in your data
      //   return (
      //     <DatePicker
      //       value={text ? moment(text) : null}
      //       onChange={(date, dateString) => handleDateChange(date, dateString, record.key, 'paymentdeadline')}
      //     />
      //   );
      // },
    },
    {
      title: 'Payment date',
      dataIndex: 'paymentdate',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: '',
      render: (record) => (
        <>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <button className='btn btn-danger'>Delete</button>
          </Popconfirm>
        </>
      )

    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      costname: `Enter here`,
      cost: 1000000,
      paymentdeadline: `Enter here`,
      paymentdate: `Enter here`,
    };
    setDataSource([...dataSource, newData]);
    setDataTable(newData)
    setCount(count + 1);
  };

  const handleSave = async (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    newData.map(item => {
      update(item)
    })
    setDataSource(newData);
  };
  const openNotificationWithIcon = () => {
    api.success({
      message: 'Save Success',
    });
  };
  const onSubmit = async (row: any) => {

    try {
      console.log(dataSource);
      await dataSource.map(iteam => {
        add(iteam);
      })
      openNotificationWithIcon()
    } catch (error: any) {
      console.log(error(error.response.data.error.message || error.response.data.message));
      alert("error");

    }
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await list();
      setDataSource(data);
    }
    getProducts();
  }, [])
  return (
    <div>
      {contextHolder}
      <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Expense</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
          <div style={{ minHeight: 460, maxHeight: 900, padding: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '30px' }}>Expense</p>
            </div>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
            <Button onClick={handleAdd} type="primary" style={{ float: 'right' }}>
              Add a row
            </Button>
          </div>
          <div>
            <button className='btn btn-info' onClick={onSubmit} style={{ float: 'right' }}>
              Save
            </button>
            <button className='btn btn-warning' onClick={() => navigate(-1)} style={{ float: 'right', marginRight: '20px' }}>
              Cancel
            </button>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default EditExpense