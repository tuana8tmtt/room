import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add, listbyID, update } from '../../../api/product';
import { Breadcrumb, Layout, Input, Select, notification, Row, Col } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { ProductType } from '../../types/product';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { listcate, listbyIDCate } from '../../../api/category';
import { CateType } from '../../types/category';
import { uploadImg } from '../../../utils/home';

type FormTypes = {
    _id: number,
    name: string,
    price: number,
    category: number,
    desc: string,
    image: string,
}


const EditProduct = () => {
    const { register, handleSubmit, formState, reset,  } = useForm<ProductType>();
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
            message: 'Edit room successfull',
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
    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
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
                        <Title>Edit Room</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col span={18} push={6} >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Name Room</Form.Label>
                                        <Form.Control type="text" {...register('name')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" {...register('price')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" {...register('address')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Floor</Form.Label>
                                        <Form.Control type="text" {...register('floor')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Number Room</Form.Label>
                                        <Form.Control type="text" {...register('numberRoom')} />
                                    </Form.Group>
                                </Col>
                                <Col span={6} pull={18}>
                                    <div className="col-span-3">
                                        <div className="mt-1">
                                            <img
                                                src={preview || room?.image}
                                                alt="Preview Image"
                                                className="h-8 w-full object-cover rounded-md"
                                                style={{ height: "160px" }}
                                            />
                                        </div>
                                    </div>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Ảnh phòng</Form.Label>
                                        <Form.Control type="file" {...register('image')} onChange={e => handlePreview(e)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} push={6}>
                                    <Form.Group >
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="mô tả"
                                            style={{ height: '210px' }}
                                            {...register('desc')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col span={6} pull={18}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Connect Host</Form.Label>
                                        <Form.Control type="text" {...register('connectHost')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Phone Host</Form.Label>
                                        <Form.Control type="text" {...register('phoneHost')} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Email Host</Form.Label>
                                        <Form.Control type="text" {...register('emailHost')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Edit
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default EditProduct



