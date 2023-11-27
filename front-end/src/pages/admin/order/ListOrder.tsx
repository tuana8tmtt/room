import { Breadcrumb, Layout, Space, Tag } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { listorder, remove } from '../../../api/order';
import { OrderType } from '../../types/order';


const { Title } = Typography;


const ListOrder = () => {
    const [orders, setOrders] = useState<OrderType[]>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listorder();
            setOrders(data);
        }
        getProducts();
    }, [])
    const handleRemove = async (id: string) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Nếu xóa nó sẽ biến mất mãi mãi",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                remove(id)
              swal("Bạn đã xóa thành công", {
                icon: "success",
              })
              .then(() => setOrders(orders?.filter(item => item._id !== id)));
            } else {
              swal("Lựa chọn hủy là đúng đắn đó Bro");
            }
          });
    }
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/order/detail/'+recore.id}>Xem chi tiết</NavLink>
                    <button className='btn btn-danger' onClick={() => handleRemove(recore.id)}>Remove</button>
                </Space>
            )
        },
    ];
    const data = orders?.map((order, index) => {
        return {
            stt: index + 1,
            name: order.userOrder.name,
            email: order.userOrder.email,
            phone: order.userOrder.phone,
            address: order.userOrder.address,
            status: order.status == '0'? <Tag color={"geekblue"}>Chờ xác nhận</Tag>: order.status == '1'? <Tag color={"green"}>Đã xác nhận</Tag>: <Tag color={"volcano"}>Đã hủy</Tag>,
            id: order._id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Order</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Title level={2}>Danh sách Đơn Hàng</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListOrder