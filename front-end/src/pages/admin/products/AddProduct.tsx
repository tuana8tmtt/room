import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add } from '../../../api/product';
import { Breadcrumb, Layout, Input, Select, notification, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { CateType } from '../../types/category';
import { listcate } from '../../../api/category';
import { uploadImg } from '../../../utils/home';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ProductType } from '../../types/product';
import { useNavigate } from 'react-router-dom';


type FormTypes = {
    _id: number,
    category: number,
    name: string,
    price: number,
    desc: string,
    image: string,
}

const AddProduct = () => {
    const { register, handleSubmit, formState, reset } = useForm<ProductType>();
    const [categories, setCategories] = useState<CateType[]>();
    const [preview, setPreview] = useState<string>();
    const navigate = useNavigate()
    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        (async () => { //get cate
            const { data } = await listcate();
            setCategories(data);
        })();
    }, []);

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
            message: 'Add room successfull',
        });
    };
    const onSubmit: SubmitHandler<ProductType> = async data => {
        try {
            const url = await uploadImg(data.image[0])
            await add({ ...data, image: url });
            setPreview("");
            openNotificationWithIcon('success')
            reset();
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
    }


    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height: '110vh' }}>
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
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Title>Add Room</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Name Room</Form.Label>
                                    <Form.Control required type="text" {...register('name')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required type="number" {...register('price')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required type="text" {...register('address')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Floor</Form.Label>
                                    <Form.Control required type="text" {...register('floor')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Number Room</Form.Label>
                                    <Form.Control required type="text" {...register('numberRoom')} />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Connect Host</Form.Label>
                                    <Form.Control required type="text" {...register('connectHost')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Phone Host</Form.Label>
                                    <Form.Control required type="text" {...register('phoneHost')} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Email Host</Form.Label>
                                    <Form.Control required type="text" {...register('emailHost')} />
                                </Form.Group>
                            </Row>

                            <Form.Group >
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="mô tả"
                                    style={{ height: '100px' }}
                                    {...register('desc')}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image Room</Form.Label>
                                <Form.Control required type="file" {...register('image')} onChange={e => handlePreview(e)} />
                            </Form.Group>
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
                                <div className="mt-1">
                                    <img
                                        src={preview || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                                        alt="Preview Image"
                                        className="h-8 w-full object-cover rounded-md"
                                        style={{ height: "300px" }}
                                    />
                                </div>
                            </div>
                            <Button variant="primary" type="submit">
                                Add Room
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default AddProduct


