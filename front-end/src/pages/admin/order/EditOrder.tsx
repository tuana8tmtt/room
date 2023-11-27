import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { Breadcrumb, Layout, Input, Select, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OrderType } from '../../types/order';
import { listbyIdorder, update } from '../../../api/order';




const EditOrder = () => {
    const { register, handleSubmit, formState, reset } = useForm<OrderType[]>([]);
    // const [form] = Form.useForm();
    const [orders, setOrders] = useState<OrderType[]>([]);

    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const getOrder = async () => {
            const { data } = await listbyIdorder(id);    
            console.log(data);
                    
            reset(data)
            setOrders(data.listOrder)
            console.log(data.listOrder);
            
        }
        getOrder();
    }, [])
    console.log(orders);

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
            message: 'Cập nhật trạng thái thành công',
        });
    };

    const onSubmit: SubmitHandler<OrderType> = async data => {
        try {
            await update(data);
            openNotificationWithIcon('success')
            setTimeout(() => navigate("/admin/order"), 2000)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 500, padding: 24 }}>
                        <Title>Chi tiết đơn hàng</Title>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((item, index) => {
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                })}
                                {/* <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr> */}
                            </tbody>
                        </Table>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tên Khách Hàng</Form.Label>
                                <Form.Control type="text" {...register('userOrder.name')} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" {...register('userOrder.email')} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" {...register('userOrder.phone')} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" {...register('userOrder.address')} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Trạng thái</Form.Label>
                                <Form.Select aria-label="Default select example" {...register('status')} >
                                        <option value="0" {...orders?.status == '0'? "selected" : ""}>Chờ xác nhận</option>
                                        <option value="1" {...orders?.status == '1'? "selected" : ""}>Đã xác nhận</option>
                                        <option value="2" {...orders?.status == '2'? "selected" : ""}>Đã hủy</option>
                                </Form.Select>                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sửa
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default EditOrder

