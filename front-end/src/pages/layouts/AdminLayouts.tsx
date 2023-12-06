import React from 'react'
import { Layout } from 'antd';
import HeaderAdmin from '../../components/admin/HeaderAdmin';
import NavAdmin from '../../components/admin/NavAdmin';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';


type Props = {}

const { Header, Footer, Sider, Content } = Layout;

const AdminLayouts = (props: Props) => {
    return (
        <>
            <Layout>
                <Header style={{ padding: 15 }}><HeaderAdmin /></Header>
                <Layout >
                    <Sider className="site-layout-background"><NavAdmin /></Sider>
                    <Layout style={{ padding: '0 24px 24px', }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>

            </Layout>

        </>
    )
}

export default AdminLayouts