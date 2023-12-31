import { Breadcrumb, Layout, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../types/product';
import swal from 'sweetalert';
import { list, remove } from '../../../api/contract';
import Swal from 'sweetalert2';
import { Money } from '../../../utils/home';
import { ContractType } from '../../types/contract';
import moment from 'moment';


const { Title } = Typography;


const ListContract = () => {
    const [products, setProducts] = useState<ContractType[]>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setProducts(data);
        }
        getProducts();
    }, [])
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
                        .then(() => setProducts(products?.filter(item => item._id !== id)));
                } else {
                    swal("Cancel Successfully");
                }
            });
    }
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        {
            title: 'Renter',
            dataIndex: 'renter',
            key: 'renter',
            sorter: (a, b) => a.renter.length - b.renter.length,
            render: (recore: any) => (recore)

        },
        { title: 'Renter ID', dataIndex: 'renterID', key: 'renterID' },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (recore: any) => (Money(recore))
        },
        { title: 'Room', dataIndex: 'room', key: 'room' },
        {
            title: 'Start Date',
            dataIndex: 'startdate',
            key: 'startdate',
            sorter: (a, b) => moment(a.startdate).unix() - moment(b.startdate).unix(),
            render: (recore: any) => (recore)
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/contract/edit/' + recore.id}>View</NavLink>
                    <button className='btn btn-danger' onClick={() => handleRemove(recore.id)}>Remove</button>
                </Space>
            )
        },
    ];
    const data = products?.map((product, index) => {
        return {
            stt: index + 1,
            renter: product.renter,
            renterID: product.renterID,
            price: product.price,
            room: product.room,
            startdate: product.startdate,
            id: product._id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Contract</Breadcrumb.Item>
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
                            <Button><NavLink to='add'>Add Contract</NavLink></Button>
                        </div>
                        <Title level={2}>List Contracts</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListContract