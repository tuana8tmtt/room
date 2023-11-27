import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add } from '../../../api/contract';
import { Breadcrumb, Layout, Input, Select, notification, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { CateType } from '../../types/category';
import { listcate } from '../../../api/category';
import { uploadImg } from '../../../utils/home';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ContractType } from '../../types/contract';
import { useNavigate } from 'react-router-dom';


type FormTypes = {
    _id: number,
    category: number,
    name: string,
    price: number,
    desc: string,
    image: string,
}

const AddContract = () => {
    const { register, handleSubmit, formState, reset } = useForm<ContractType>();
    const [categories, setCategories] = useState<CateType[]>();
    const [preview, setPreview] = useState<string>();
    const navigate = useNavigate()

    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    // useEffect(() => {
    //     (async () => { //get cate
    //         const { data } = await listcate();
    //         setCategories(data);
    //     })();
    // }, []);

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
            message: 'Add contract susscessful',
        });
    };
    const onSubmit: SubmitHandler<ContractType> = async data => {
        console.log(data);

        try {
            const url1 = await uploadImg(data.contractImage[0])
            const url2 = await uploadImg(data.roomImage[0])
            await add({ ...data, contractImage: url1, roomImage: url2  });
            setPreview("");
            openNotificationWithIcon('success')
            reset();
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));
            alert("error");

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
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Title>Add Contract</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Renter</Form.Label>
                                    <Form.Control required type="text" {...register('renter')} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Renter ID</Form.Label>
                                    <Form.Control required type="text" {...register('renterID')} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required type="number" {...register('price')} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control required type="date" {...register('startdate')} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Month</Form.Label>
                                    <Form.Control required type="text" {...register('month')} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Room</Form.Label>
                                    <Form.Control required type="text" {...register('room')} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="4" className="mb-3" >
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control required type="text" {...register('location')} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="formFile" className="mb-3">
                                    <Form.Label>Room Image</Form.Label>
                                    <Form.Control required type="file" {...register('roomImage')} onChange={e => handlePreview(e)} />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="formFile" className="mb-3">
                                    <Form.Label>Contract Image</Form.Label>
                                    <Form.Control required type="file" {...register('contractImage')} onChange={e => handlePreview(e)} />
                                </Form.Group>
                            </Row>
                            {/* <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
                                <div className="mt-1">
                                    <img
                                        src={preview || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                                        alt="Preview Image"
                                        className="h-8 w-full object-cover rounded-md"
                                        style={{height: "300px"}}
                                    />
                                </div>
                            </div> */}
                            <Button variant="primary" type="submit">
                                Add Contract
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default AddContract


