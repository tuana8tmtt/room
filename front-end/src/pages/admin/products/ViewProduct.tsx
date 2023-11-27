import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add, listbyID, remove, update } from '../../../api/product';
import { Breadcrumb, Layout, Input, Select, notification, Row, Col, Image } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { ProductType } from '../../types/product';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { listcate, listbyIDCate } from '../../../api/category';
import { CateType } from '../../types/category';
import { uploadImg } from '../../../utils/home';
import swal from 'sweetalert';


type FormTypes = {
    _id: number,
    name: string,
    price: number,
    category: number,
    desc: string,
    image: string,
}


const VỉewProduct = () => {
    const { register, handleSubmit, formState, reset } = useForm<ProductType>();
    const [categories, setCategories] = useState<CateType[]>();
    const [preview, setPreview] = useState<string>();
    const [room, setRoom] = useState<ProductType>()


    // const [form] = Form.useForm();
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate()

    useEffect(() => {
        // get categories
        const getCates = async () => {
            const { data } = await listcate();
            setCategories(data);
        };

        const start = async () => {
            await getCates();
            const { data } = await listbyIDCate(id);
            reset({
                ...data,
                category: data.category._id
            });
        };
        start();
    }, []);

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
            message: 'Sửa sản phẩm thành công',
        });
    };
    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listbyID(id);
            // form.setFieldsValue({
            //     name: data.name,
            //     price: data.price
            // })
            reset(data)
            setRoom(data)
            console.log(data);

        }
        getProducts()
    }, [])

    const onSubmit: SubmitHandler<ProductType> = async data => {
        try {
            if (typeof data.image === "object" && data.image.length) {
                data.image = await uploadImg(data.image[0]);
            }
            await update(data);
            console.log(data);
            openNotificationWithIcon('success')
            setTimeout(() => navigate("/admin/room"), 3000)
        } catch (error: any) {
            console.log(error)
        }
    }
    const handleRemove = async () => {
        swal({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Nếu xóa nó sẽ biến mất mãi mãi",
            icon: "warning",
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove(room?._id)
                    swal("Bạn đã xóa thành công", {
                        icon: "success",
                    })
                        .then(() => navigate('room'));
                } else {
                    swal("Lựa chọn hủy là đúng đắn đó Bro");
                }
            });
    }
    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height: '100vh' }}>
                <Breadcrumb style={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Room</Breadcrumb.Item>
                    </div>
                    <Button onClick={() => navigate(-1)}>Back</Button>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 500, padding: 24 }}>
                        <Title>View Room</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col flex={1}>
                                    <Image src={room?.image} width={300} />
                                    <div>
                                        <p style={{ fontSize: '20px' }}>Connect Host: {room?.connectHost}</p>
                                        <p style={{ fontSize: '20px' }}>Phone Host: {room?.phoneHost}</p>
                                        <p style={{ fontSize: '20px' }}>Email Host: {room?.emailHost}</p>
                                    </div>
                                </Col>
                                <Col flex={4}>
                                    <h2>{room?.name}</h2>
                                    <p style={{ fontSize: '20px' }}>Address: {room?.address}</p>
                                    <p style={{ fontSize: '20px' }}>Rentail Price: {room?.price}</p>
                                    <p style={{ fontSize: '20px' }}>Floor: {room?.floor}</p>
                                    <p style={{ fontSize: '20px' }}>Number Room: {room?.numberRoom}</p>
                                    <div className='flex'>
                                        <p style={{ fontSize: '20px' }}>{room?.desc}</p>
                                        <NavLink className={"btn btn-info"} to={'/admin/room/edit/' + room?._id}>Edit</NavLink>
                                        <button className='btn btn-danger' onClick={() => handleRemove(room?._id)}>Remove</button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default VỉewProduct



