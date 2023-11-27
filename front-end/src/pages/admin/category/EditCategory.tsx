import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add, listbyIDcategory, update } from '../../../api/category';
import { Breadcrumb, Layout, Input, Select, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CateType } from '../../types/category';



const EditCate = () => {
    const { register, handleSubmit, formState, reset } = useForm<CateType>();
    // const [form] = Form.useForm();
    const [cates, setCates] = useState<CateType>();

    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const getCate = async () => {
            const { data } = await listbyIDcategory(id);
            reset(data)
            setCates(data.category)
        }
        getCate();
    }, [])

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
          message: 'Sửa sản phẩm thành công',
        });
      };
      
    const onSubmit: SubmitHandler<CateType> = async data => {
        console.log(data);
        try {
            await update(data);
            openNotificationWithIcon('success')
            setTimeout(()=> navigate("/admin/category"),4000)
            // navigate("/admin/product")
            // openNotificationWithIcon('success')
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 500, padding: 24 }}>
                        <Title>Sửa Danh Mục</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tên Danh mục</Form.Label>
                                <Form.Control type="text" {...register('name')} />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Sửa
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default EditCate

