import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add, listbyID, update } from '../../../api/contract';
import { Breadcrumb, Layout, Input, Select, notification, Image } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { ProductType } from '../../types/product';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { listcate, listbyIDCate } from '../../../api/category';
import { CateType } from '../../types/category';
import { uploadImg } from '../../../utils/home';
import { ContractType } from '../../types/contract';
import { Col, Row } from 'antd';
import moment from 'moment';


type FormTypes = {
    _id: number,
    name: string,
    price: number,
    category: number,
    desc: string,
    image: string,
}


const EditContract = () => {
    const { register, handleSubmit, formState, reset } = useForm<ContractType>();
    const [categories, setCategories] = useState<CateType[]>();
    const [preview, setPreview] = useState<string>();
    const [contract, setContract] = useState<ContractType>();


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
            message: 'Edit Contract Successfully ',
        });
    };
    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listbyID(id);
            setContract(data)
            reset(data)
            console.log(data);
        }
        getProducts()
    }, [])

    const onSubmit: SubmitHandler<FormTypes> = async data => {
        try {
            if (typeof data.image === "object" && data.image.length) {
                data.image = await uploadImg(data.image[0]);
            }
            await update(data);
            console.log(data);
            openNotificationWithIcon('success')
            setTimeout(() => navigate("/admin/product"), 3000)
        } catch (error: any) {
            console.log(error)
        }
    }


    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height: '100vh' }}>
                <Breadcrumb style={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Contract</Breadcrumb.Item>
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
                        <Title>Contract</Title>

                        <Row>
                            <Col span={8}>
                                <Title level={4}>Renter: {contract?.renter}</Title>
                                <Title level={4}>Renter ID: {contract?.renterID}</Title>
                                <Title level={4}>Price: {contract?.price}</Title>
                                <Title level={4}>Start Date: {moment(contract?.startdate).format('DD-MM-YYYY')}</Title>
                                <Title level={4}>Month: {contract?.month}</Title>
                            </Col>
                            <Col span={8}>
                                <Title level={4}>Room: {contract?.room}</Title>
                                <Title level={4}>Location: {contract?.location}</Title>
                            </Col>
                            <Col span={8}>
                                <div className="col-span-3 mb-3">
                                    <label className="block text-sm font-large text-gray-700">Room Image</label>
                                    <div className="mt-1">
                                        <Image
                                            width={400}
                                            src={contract?.roomImage}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3 mb-3">
                                    <label className="block text-sm font-large text-gray-700">Contract Image</label>
                                    <div className="mt-1">
                                        <Image
                                            width={400}
                                            src={contract?.contractImage}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        {/* <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Renter</Form.Label>
                                <Form.Control type="text" {...register('renter')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Renter ID</Form.Label>
                                <Form.Control type="text" {...register('renterID')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" {...register('price')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="text" {...register('startdate')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Month</Form.Label>
                                <Form.Control type="text" {...register('month')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Room</Form.Label>
                                <Form.Control type="text" {...register('room')} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" {...register('location')} />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Chọn ảnh sản phẩm</Form.Label>
                                <Form.Control type="file" {...register('image')} onChange={e => handlePreview(e)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sửa
                            </Button>
                        </Form> */}
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default EditContract



