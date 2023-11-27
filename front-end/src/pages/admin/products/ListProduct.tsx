import { Breadcrumb, Layout, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../types/product';
import swal from 'sweetalert';
import { list, remove } from '../../../api/product';
import Swal from 'sweetalert2';
import { Money } from '../../../utils/home';


const { Title } = Typography;


const ListProduct = () => {
    const [products, setProducts] = useState<ProductType[]>();

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
        { title: 'Image', dataIndex: 'image', key: 'image' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Desc', dataIndex: 'desc', key: 'category' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/room/view/' + recore.id}>View</NavLink>
                    <button className='btn btn-danger' onClick={() => handleRemove(recore.id)}>Remove</button>
                </Space>
            )
        },
    ];
    const data = products?.map((product, index) => {
        return {
            stt: index + 1,
            image: <img src={product.image} alt="" width="100px" />,
            name: product.name,
            price: Money(product.price),
            desc: product.desc,
            id: product._id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', height:"100vh" }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Room</Breadcrumb.Item>
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
                            <Button><NavLink to='add'>Add Room</NavLink></Button>
                        </div>
                        <Title level={2}>List Room</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListProduct