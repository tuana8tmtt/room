import { Avatar, Breadcrumb, Card, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { uploadImg } from '../../../utils/home';

type Props = {}
const { Meta } = Card;


const ListDevice = (props: Props) => {
    const [preview, setPreview] = useState<string>();
    const [show, setShow] = useState(false);
    const formRef = useRef();


    const handleClose = () => {
        setShow(false)
        setPreview("")
        reset({ deviceName: "", price: "" })

    };
    const handleShow = () => setShow(true);

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
                        <div style={{ float: 'right' }}>
                            <button className='btn btn-primary' onClick={handleShow}>Add</button>
                            <Modal
                                show={show}
                                onHide={() => handleClose()}
                                size="lg"
                                centered
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Device</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Device Name</Form.Label>
                                                <Form.Control required type="text" {...register('deviceName')} />
                                            </Form.Group>
                                            <div className="col-span-3">
                                                <div className="mt-1">
                                                    <img
                                                        src={preview || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                                                        alt="Preview Image"
                                                        className="h-8 w-full object-cover rounded-md"
                                                        style={{ height: "400px" }}
                                                    />
                                                </div>
                                            </div>
                                            <Form.Group controlId="formFile" className="mt-5">
                                                <Form.Label>Upload Image Device</Form.Label>
                                                <Form.Control type="file" onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control required type="number" {...register('price')} />
                                            </Form.Group>
                                            <div style={{ float: 'right' }}>
                                                <Button variant="secondary" onClick={() => handleClose()} style={{ marginRight: '10px' }}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type='submit'>
                                                    Add Device
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal.Body>

                            </Modal>
                        </div>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card
                                    style={{ width: 400 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        />
                                    }
                                    actions={[
                                        <NavLink to={`view/:id`}><button className='btn btn-info'>View</button></NavLink>

                                    ]}
                                >
                                    <Meta
                                        title={`Title`}
                                        description={`Quantity: `}
                                    />
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListDevice