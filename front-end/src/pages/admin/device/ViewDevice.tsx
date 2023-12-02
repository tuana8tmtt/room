import { Breadcrumb, Col, Layout, Row, Image, List, message, Table, TableColumnsType, Space, TablePaginationConfig } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Title from 'antd/lib/skeleton/Title'
import React, { useEffect, useState } from 'react'
import VirtualList from 'rc-virtual-list';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';


type Props = {}
const fakeDataUrl = [
    {
        "numberRoom": 12,
        "address": "HN",
        "quantity": 15,
        "id": 1
    },
    {
        "numberRoom": 12,
        "address": "HN",
        "quantity": 15,
        "id": 2
    },
    {
        "numberRoom": 12,
        "address": "HN",
        "quantity": 15,
        "id": 3
    },
    {
        "numberRoom": 12,
        "address": "HN",
        "quantity": 15,
        "id": 4
    },
    {
        "numberRoom": 12,
        "address": "HN",
        "quantity": 15,
        "id": 5
    }
]
interface TableParams {
    pagination?: TablePaginationConfig;

}

const ViewDevice = (props: Props) => {
    const [data, setData] = useState<any>([]);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 4,
        },
    });
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState, reset, setValue } = useForm<any>();
    const [dataEdit, setDataEdit] = useState<any>({});

    setValue("numberRoom", dataEdit.numberRoom)

    const navigate = useNavigate()

    const appendData = () => {
        // fetch(fakeDataUrl2)
        //   .then((res) => res.json())
        //   .then((body) => {
        //     setData(data.concat(body.results));
        //     message.success(`${body.results.length} more items loaded!`);
        //   });
        setData(fakeDataUrl)
    };


    const data1 = data?.map((item, index) => {
        return {
            stt: index + 1,
            numberRoom: item.numberRoom,
            address: item.address,
            quantity: item.quantity,
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
                    <button className={"btn btn-info"} onClick={() => handleShow(recore.id)}>Edit</button>
                    <button className={"btn btn-danger"} >Delete</button>
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

    };
    const handleShow = (id: any) => {
        const data1 = data.filter(item => item.id === id)
        setDataEdit(data1)
        setShow(true)
    };


    const onSubmit: SubmitHandler<any> = async data => {
        try {
            // await add({ ...data, image: url });
            openNotificationWithIcon('success')
            reset();
        } catch (error: any) {
            console.log(error(error.response.data.error.message || error.response.data.message));

        }
    }
    useEffect(() => {
        appendData();

    }, []);
    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height: "100vh" }}>
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
                                    <Image src={`https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg`} width={150} />

                                </Col>
                                <Col flex={4}>
                                    <h4>Name Device</h4>
                                    <p>Quantity: </p>
                                </Col>
                                <Col flex={1}>
                                    <button onClick={() => navigate(-1)} className='btn btn-secondary'>Back</button>
                                </Col>
                            </Row>
                            <div style={{ height: '100px' }}>
                                <Table columns={columns1} dataSource={data1} pagination={tableParams.pagination} onChange={handleTableChange} />
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
                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Device Name</Form.Label>
                                                <Form.Control required type="text" {...register('numberRoom')} />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" className="mb-3" >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control required type="number" {...register('quantity')} />
                                            </Form.Group>
                                            <div style={{ float: 'right' }}>
                                                <Button variant="secondary" onClick={() => handleClose()} style={{ marginRight: '10px' }}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type='submit'>
                                                    Edit Device
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