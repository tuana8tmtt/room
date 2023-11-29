import { Breadcrumb, Col, Dropdown, Layout, Row, Space, TableColumnsType } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { CateType } from '../../types/category';
import { listcate, remove } from '../../../api/category';
import { Badge } from 'react-bootstrap';
import { DownOutlined } from '@ant-design/icons';


const { Title } = Typography;


const ListExpense = () => {
    const [cates, setCates] = useState<CateType[]>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listcate();
            setCates(data);
        }
        getProducts();
    }, [])
    
    const columns = [
        { title: 'Cost name', dataIndex: 'stt', key: 'stt' },
        { title: 'Cost', dataIndex: 'name', key: 'name' },
        { title: 'Payment deadline', dataIndex: 'name', key: 'name' },
        { title: 'Payment date', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/expense/edit/' + recore.id}>Edit</NavLink>
                </Space>
            )
        },
    ];

    const data = cates?.map((cate, index) => {
        return {
            stt: index + 1,
            name: cate.name,
            id: cate._id
        }
    })

    const columns1: TableColumnsType<any> = [
        { title: 'Cost name', dataIndex: 'date', key: 'date' },
        { title: 'Cost', dataIndex: 'name', key: 'name' },
        { title: 'Payment deadline', dataIndex: 'name', key: 'name' },
        { title: 'Payment date', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-warning"} to={'/admin/expense/bill/' + recore.id}>Bill</NavLink>
                    <NavLink className={"btn btn-info"} to={'/admin/expense/edit/room/' + recore.id}>Edit</NavLink>
                </Space>
            )
        },
    ];

    const data1 = [];
    for (let i = 0; i < 2; ++i) {
        data1.push({
            key: i.toString(),
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }
   


    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height: "100vh" }}>
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
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <p style={{ fontSize: '30px' }}>Expense</p>
                            <p style={{ fontSize: '20px' }}>Total: </p>
                            <p style={{ fontSize: '20px' }}>Unpair: </p>
                        </div>

                        <Table columns={columns} dataSource={data}  />
                        <Row>
                            <Col span={4}>
                                <h2>Room 1</h2>
                            </Col>
                            <Col span={20}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <p style={{ fontSize: '25px' }}>Revenue</p>
                                    <p style={{ fontSize: '15px' }}>Total: </p>
                                    <p style={{ fontSize: '15px' }}>Debt: </p>
                                </div>
                                <Table columns={columns1} dataSource={data1} pagination={false} />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListExpense