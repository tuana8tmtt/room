import { Breadcrumb, Layout, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { CateType } from '../../types/category';
import { listcate, remove } from '../../../api/category';


const { Title } = Typography;


const ListCate = () => {
    const [cates, setCates] = useState<CateType[]>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listcate();
            setCates(data);
        }
        getProducts();
    }, [])
    const handleRemove = async (id: string) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Nếu xóa nó sẽ biến mất mãi mãi",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                remove(id)
              swal("Bạn đã xóa thành công", {
                icon: "success",
              })
              .then(() => setCates(cates?.filter(item => item._id !== id)));
            } else {
              swal("Lựa chọn hủy là đúng đắn đó Bro");
            }
          });
    }
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/category/edit/'+recore.id}>Sửa</NavLink>
                    <button className='btn btn-danger' onClick={() => handleRemove(recore.id)}>Xóa</button>
                </Space>
            )
        },
    ];
    const data = cates?.map((cate, index) => {
        return {
            stt: index + 1,
            name: cate.name,
            id: cate._id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Category</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Button><NavLink to='add'>Thêm Danh Mục</NavLink></Button>
                        <Title level={2}>Danh sách Danh Mục</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListCate