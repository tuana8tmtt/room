import { Breadcrumb, Col, Dropdown, Layout, Row, Space, TableColumnsType } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { CateType } from '../../types/category';
import { Badge } from 'react-bootstrap';
import { DownOutlined } from '@ant-design/icons';
import { list } from '../../../api/expense';
import { listroom, remove } from '../../../api/product';
import { listrevenue } from '../../../api/revenua';
import { Money } from '../../../utils/home';
import moment from 'moment';



const { Title } = Typography;


const ListExpense = () => {
    const [cates, setCates] = useState<any>();
    const [rooms, setRooms] = useState<any>();
    const [revenuas, setRevenuas] = useState<any>();
    const [tableData, setTableData] = useState<any>({});




    const columns = [
        {
            title: 'Cost name',
            dataIndex: 'costname',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            render: (value, record, index) => (
                <p>{Money(record.cost)}</p>
            ),
        },
        {
            title: 'Payment deadline',
            dataIndex: 'paymentdeadline',
        },
        {
            title: 'Payment date',
            dataIndex: 'paymentdate',
        },
        // {
        //     title: 'Action',
        //     dataIndex: '',
        //     key: 'action',
        //     render: (recore: any) => (
        //         <Space size="middle">
        //             <NavLink className={"btn btn-info"} to={'/admin/expense/edit/'}>Edit</NavLink>
        //         </Space>
        //     ),

        // },
    ];



    const data = cates?.map((cate, index) => {
        return {
            costname: cate.costname,
            cost: cate.cost,
            id: cate._id,
            paymentdeadline: cate.paymentdeadline,
            paymentdate: cate.paymentdate
        }
    })




    const columns1: TableColumnsType<any> = [
        {
            title: 'Cost name',
            dataIndex: 'costname',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            render: (value, record, index) => (
                <p>{Money(record.cost)}</p>
            ),
        },
        {
            title: 'Payment deadline',
            dataIndex: 'paymentdeadline',
        },
        {
            title: 'Payment date',
            dataIndex: 'paymentdate',
        },
        // {
        //     title: 'Action',
        //     dataIndex: '',
        //     key: 'action',
        //     render: (recore: any) => (
        //         <Space size="middle">
        //             <NavLink className={"btn btn-warning"} to={'/admin/expense/bill/' + recore.id}>Bill</NavLink>
        //             <NavLink className={"btn btn-info"} to={'/admin/expense/edit/room/' + recore.id}>Edit</NavLink>
        //         </Space>
        //     )
        // },
    ];

    const data1 = revenuas?.map((cate, index) => {
        return {
            costname: cate.costname,
            cost: cate.cost,
            id: cate._id,
            paymentdeadline: cate.paymentdeadline,
            paymentdate: cate.paymentdate
        }
    })

    const acceptedFormats = ['DD-MM-YYYY', 'DD/MM/YYYY'];
    const isDate = (value) => {
        return acceptedFormats.some(format => moment(value, format, true).isValid());
    };

    const totalEx = data?.reduce((acc, obj) => {
        const numericValue = Number(obj.cost);
        if (!isNaN(numericValue)) {
            return acc + numericValue;
        }
        return acc;
    }, 0);

    const otherValuesForDates = data?.filter(obj => isDate(obj.paymentdate)).map(obj => obj.cost);
    const unpairEx = otherValuesForDates?.reduce((acc, obj) => {
        const numericValue = Number(obj);
        if (!isNaN(numericValue)) {
            return acc + numericValue;
        }
        return acc;
    }, 0);

    const sumByRoomId = {};

    // Tính tổng other theo roomId
    revenuas?.forEach(obj => {
        const { roomId, cost } = obj;
        sumByRoomId[roomId] = (sumByRoomId[roomId] || 0) + cost;
    });

    // Chuyển đối tượng tổng thành mảng các đối tượng
    const resultTotalRe = Object.entries(sumByRoomId).map(([roomId, total]) => ({
        roomId: roomId, // Chuyển đổi roomId từ chuỗi sang số nếu cần thiết
        total
    }));




    const sumByRoomId1 = {};

    // Tính tổng other theo roomId cho các đối tượng có date là ngày
    revenuas?.forEach(obj => {
        const { paymentdate, roomId, cost } = obj;

        // Kiểm tra xem date có phải là ngày không
        const isDate = moment(paymentdate, ['DD-MM-YYYY', 'DD/MM/YYYY'], true).isValid()

        sumByRoomId1[roomId] = (sumByRoomId1[roomId] || 0) + (isDate ? cost : 0);

    });

    // Chuyển đối tượng tổng thành mảng các đối tượng
    const unpairRe = Object.entries(sumByRoomId1).map(([roomId, cost]) => ({
        roomId: roomId, // Chuyển đổi roomId từ chuỗi sang số nếu cần thiết
        cost
    }));

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setCates(data);

        }
        getProducts();
        const getRoom = async () => {
            const { data } = await listroom()
            setRooms(data)
        }
        getRoom()
        const getRevenua = async () => {
            const { data } = await listrevenue()
            setRevenuas(data)
            const groupedData = data.reduce((acc, item) => {
                acc[item.roomId] = [...(acc[item.roomId] || []), item];
                return acc;
            }, {});
            setTableData(groupedData)
            console.log(groupedData);

        }
        getRevenua()
    }, [])

    return (
        <div>
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
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <p style={{ fontSize: '30px' }}>Expense</p>
                            <p style={{ fontSize: '20px' }}>Total: {Money(totalEx)}</p>
                            <p style={{ fontSize: '20px' }}>Unpair: {Money(unpairEx)}</p>
                        </div>
                        <NavLink style={{ float: 'right' }} className={"btn btn-info"} to={'/admin/expense/edit/'}>Edit</NavLink>
                        <Table columns={columns} dataSource={data} />

                        {rooms?.map((item: any) => (
                            <Row>
                                <Col span={4}>
                                    <h2>{item.name}</h2>
                                </Col>
                                <Col span={20}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <p style={{ fontSize: '25px' }}>Revenue</p>
                                            <p style={{ fontSize: '20px' }}>Total: {resultTotalRe.map(re => re.roomId === item._id ? Money(re.total) : null)}</p>
                                            <p style={{ fontSize: '20px' }}>Unpair: {unpairRe.map(re => re.roomId === item._id ? Money(re.cost) : null)}</p>
                                        </div>
                                        <div>
                                            <NavLink className={"btn btn-warning mr-2"} to={'/admin/expense/bill/' + item._id}>Bill</NavLink>
                                            <NavLink className={"btn btn-info"} to={'/admin/expense/edit/room/' + item._id}>Edit</NavLink>
                                        </div>
                                    </div>
                                    {/* {console.log(revenuas.filter((room: any) => room.roomId === item._id))} */}
                                    <Table columns={columns1} dataSource={revenuas?.filter((room: any) => room.roomId === item._id)} pagination={false} />
                                </Col>
                            </Row>
                        ))}

                    </div>
                </Content>
            </Layout>
        </div >
    )
}

export default ListExpense