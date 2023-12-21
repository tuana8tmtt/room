import { Breadcrumb, Col, Layout, Row, Image, List, message, Table, TableColumnsType, Space, TablePaginationConfig, notification } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Title from 'antd/lib/skeleton/Title'
import React, { useEffect, useState } from 'react'
import VirtualList from 'rc-virtual-list';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { listbyID } from '../../../api/service';
import { add, list, remove, update } from '../../../api/furniture';
import swal from 'sweetalert';
import { Money } from '../../../utils/home';


type Props = {}

interface TableParams {
    pagination?: TablePaginationConfig;

}

const ViewDevice = (props: Props) => {
    const [data, setData] = useState<any>([]);
    const [service, setService] = useState<any>();
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 4,
        },
    });
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const { register, handleSubmit, formState, reset, setValue } = useForm<any>();
    const [furn, setFurn] = useState<any>();
    const [dataedit, setDataedit] = useState<any>();



    const navigate = useNavigate()

    const { id } = useParams()

    const handleRemove = async (id: string) => {
        swal({
            title: "Are you sure you want to delete?",
            text: "If deleted it will be gone forever",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove(id)
                    swal("Delete Successfully", {
                        icon: "success",
                    })
                        .then(() => setFurn(furn?.filter(item => item._id !== id)));
                } else {
                    swal("Cancel Successfully");
                }
            });
    }
    const data1 = data?.map((item, index) => {
        return {
            stt: index + 1,
            numberRoom: item.numberRoom,
            address: item.address,
            quantity: item.quantity,
            service_id: item.service_id,
            id: item.id
        }
    })
    const columns1: TableColumnsType<any> = [
        {
            key: 'id',
            render: (item: any) => (
                <div>
                    <h2>{item.numberRoom}, {item.address}</h2>
                    <p>Quantity: {item.quantity}</p>
                </div>
            )
        },

        {
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle" style={{ float: 'right' }}>
                    <button className={"btn btn-info"} onClick={() => handleShow1(recore)}>Edit</button>
                    <button className={"btn btn-danger"} onClick={() => handleRemove(recore._id)} >Delete</button>
                </Space>
            )
        },
    ];
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        setTableParams({
            pagination,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleClose = () => {
        setShow(false)
        reset({ numberRoom: "", quantity: "", status: "", address: "", guarantee: "" })

    };
    const handleShow = () => {

        setShow(true)
    };
    const handleClose1 = () => {
        setShow1(false)
        reset({ numberRoom: "", quantity: "", status: "", address: "", guarantee: "" })

    };
    const handleShow1 = (item) => {
        reset(item)
        setShow1(true)
    };
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api.success({
            message: 'Add Success',
        });
    };
    const openNotificationWithIcon1 = () => {
        api.success({
            message: 'Edit Success',
        });
    };

    const onSubmit: SubmitHandler<any> = async data => {

        try {
            await add(data);
            setFurn(prevData => [...prevData, data]);
            reset();
            setShow(false)
            openNotificationWithIcon()
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
    }
    const onSubmit1: SubmitHandler<any> = async data => {

        try {
            await update(data);
            reset();
            setShow1(false)
            openNotificationWithIcon1()
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
    }
    useEffect(() => {
        const getService = async () => {
            const { data } = await listbyID(id)
            setService(data)
        }
        getService()

        const getFurn = async () => {
            const { data } = await list()
            setFurn(data)
            console.log(data)
        }
        getFurn()

    }, [id]);
    return (
        <div>
            {contextHolder}
            <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Expense</Breadcrumb.Item>
                </Breadcrumb>
                <Content>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}>
                        <div style={{ minHeight: 460, padding: 24 }}>
                            <Row>
                                <Col flex={1}>
                                    <Image src={service?.image} width={200} />

                                </Col>
                                <Col flex={4}>
                                    <h4>{service?.name}</h4>
                                    <p>Quantity: {furn.reduce((acc, o) => acc + parseInt(o.quantity), 0)} </p>
                                </Col>
                                <Col flex={1}>
                                    <button onClick={() => navigate(-1)} className='btn btn-secondary'>Back</button>
                                    <br />
                                    <button onClick={() => handleShow()} className='btn btn-info'>Add</button>
                                </Col>
                            </Row>
                            <div style={{ height: '100px' }}>
                                <Table columns={columns1} dataSource={furn?.filter(item => item.service_id === id)} pagination={tableParams.pagination} onChange={handleTableChange} />
                            </div>
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
                                            <h3>{service?.name}</h3>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Number Room</Form.Label>
                                                <Form.Control required type="number" {...register('numberRoom')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control required type="text" {...register('address')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control required type="number" {...register('quantity')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control required type="text" {...register('status')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Guarantee</Form.Label>
                                                <Form.Control required type="text" {...register('guarantee')} />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Control hidden type="text" value={id} {...register('service_id')} />
                                            </Form.Group>

                                            <div style={{ float: 'right' }}>
                                                <Button variant="secondary" onClick={() => handleClose()} style={{ marginRight: '10px' }}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type='submit'>
                                                    Save Device
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal.Body>

                            </Modal>
                            <Modal
                                show={show1}
                                onHide={() => handleClose1()}
                                size="lg"
                                centered
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Device</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <Form onSubmit={handleSubmit(onSubmit1)} >
                                            <h3>{service?.name}</h3>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Number Room</Form.Label>
                                                <Form.Control required type="number" {...register('numberRoom')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control required type="text" {...register('address')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control required type="number" {...register('quantity')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control required type="text" {...register('status')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Guarantee</Form.Label>
                                                <Form.Control required type="text" {...register('guarantee')} />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Control hidden type="text" value={id} {...register('service_id')} />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Control hidden type="text" value={id} {...register('_id')} />
                                            </Form.Group>
                                            <div style={{ float: 'right' }}>
                                                <Button variant="secondary" onClick={() => handleClose1()} style={{ marginRight: '10px' }}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type='submit'>
                                                    Save Device
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal.Body>

                            </Modal>
                        </div>
                    </div>
                </Content >
            </Layout >
        </div >
    )
}

export default ViewDevice