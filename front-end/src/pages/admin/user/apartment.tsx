import { Breadcrumb, Button, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { uploadImg } from '../../../utils/home'

const Apartment = () => {
    const [preview, setPreview] = useState<string>();
    const { register, handleSubmit, formState, reset } = useForm<any>();
    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit: SubmitHandler<any> = async data => {
        try {
            const url = await uploadImg(data.image[0])
            // await add({ ...data, image: url });
            setPreview("");
            openNotificationWithIcon('success')
            reset();
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
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
                        <Row>
                            <Col span={12}>
                                <div style={{ display: 'flex', justifyItems: 'center' }}>
                                    <Form>
                                        <div className="col-span-3">
                                            <div className="mt-1">
                                                <p style={{ fontSize: '20px', textAlign: 'center' }}>Room's image</p>
                                                <img
                                                    src={preview || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                                                    alt="Preview Image"
                                                    className="h-8 w-full object-cover rounded-md"
                                                    style={{ height: "400px" }}
                                                />
                                            </div>
                                        </div>
                                        <Form.Group controlId="formFile" className="mt-5">
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control type="file" onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ alignItems: 'center', gap: 10 }}>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group as={Col} md="4" className="mb-3" >
                                            <Form.Label>Room number</Form.Label>
                                            <Form.Control required type="number" {...register('roomNumber')} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" className="mb-3" >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control required type="text" {...register('address')} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" className="mb-3" >
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control required type="text" {...register('status')} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" className="mb-3" >
                                            <Form.Label>Cost</Form.Label>
                                            <Form.Control required type="text" {...register('cost')} />
                                        </Form.Group>
                                       
                                        <Form.Group >
                                            <Form.Label>Desc</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="desc"
                                                style={{ height: '100px' }}
                                                {...register('desc')}
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Room
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                        <div style={{ marginTop: '100px' }}>
                            <button className='btn btn-info' style={{ float: 'right', marginRight: '20px' }}>
                                Change password
                            </button>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default Apartment

function openNotificationWithIcon(arg0: string) {
    throw new Error('Function not implemented.')
}
