import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { add } from '../../../api/category';
import { Breadcrumb, Layout, Form, Input, Button, Select, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';

type FormTypes = {
    name: string,
}

const AddCate = () => {
    const { register, handleSubmit, formState, reset } = useForm<FormTypes>();
    const [form] = Form.useForm();

    const openNotificationWithIcon = (type: string) => {
        notification[type]({
          message: 'Thêm sản phẩm thành công',
        });
      };
    const onSubmit: SubmitHandler<FormTypes> = async data => {
        try {
            await add({ ...data });
            openNotificationWithIcon('success')
            reset();
        } catch (error: any) {
            console.log(error);
            
        }
    }
    

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Add Category</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Title>Thêm Danh Mục</Title>
                        <Form layout="horizontal" form={form} name="control-hooks" onFinish={onSubmit} >
                            <Form.Item name="name" label="Tên Danh mục" rules={[{ required: true, message: 'Không được bỏ trống' }]} hasFeedback>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default AddCate


