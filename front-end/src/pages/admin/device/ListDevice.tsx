import { Avatar, Breadcrumb, Card, Col, Layout, notification, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { add, list } from '../../../api/service';
import { Money, uploadImg } from '../../../utils/home';

type Props = {}
const { Meta } = Card;


const ListDevice = (props: Props) => {
    const [preview, setPreview] = useState<string>();
    const [show, setShow] = useState(false);
    const [service, setService] = useState<any>();
    const formRef = useRef();


    const handleClose = () => {
        setShow(false)
        setPreview("")
        reset({ name: "", price: "" })

    };
    const handleShow = () => setShow(true);

    const { register, handleSubmit, formState, reset } = useForm<any>();

    const handlePreview = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api.success({
            message: 'Add Success',
        });
    };

    const onSubmit: SubmitHandler<any> = async data => {
        try {
            const url = await uploadImg(data.image[0])
            await add({ ...data, image: url });
            setService(prevData => [...prevData, { ...data, image: url }]);
            setPreview("");
            openNotificationWithIcon()
            reset();
            handleClose()
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
    }
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setService(data);
        }
        getProducts();
    }, [])
    return (
        <div>
            {contextHolder}
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
                                        <Form onSubmit={handleSubmit(onSubmit)} >
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Device Name</Form.Label>
                                                <Form.Control required type="text" {...register('name')} />
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
                                                <Form.Control type="file" {...register('image')} onChange={e => handlePreview(e)} style={{ width: '300px' }} />
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
                            {service?.map((item, index) => (
                                <Col span={8}>
                                    <Card
                                        style={{ width: 400, marginBottom: '30px' }}
                                        cover={
                                            <img
                                                alt="example"
                                                src={item.image}
                                                style={{width: "auto", height:"auto", maxWidth: "400px", maxHeight: "200px", margin: 'auto', marginTop: '20px'}}
                                                
                                            />
                                        }
                                        actions={[
                                            <NavLink to={`view/`+ item._id}><button className='btn btn-info'>View</button></NavLink>

                                        ]}
                                    >
                                        <Meta
                                            title={item.name}
                                            description={`Price: ${Money(item?.price)} `}
                                        />
                                    </Card>
                                </Col>
                            ))}

                        </Row>


                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListDevice