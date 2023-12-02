import { Breadcrumb, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const InfoAcc = () => {
  const [preview, setPreview] = useState<string>();
  const handlePreview = (e: any) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
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
            <Row>
              <Col span={12}>
                <div style={{ display: 'flex', justifyItems: 'center' }}>
                  <Form>
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
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ alignItems: 'center', gap: 10 }}>
                  <p style={{ fontSize: '25px' }}>Mail: admin@admin.vn</p>
                  <p style={{ fontSize: '25px' }}>Username: admin </p>
                </div>
              </Col>
            </Row>
            <div style={{marginTop: '100px'}}>
              <button className='btn btn-warning' style={{ float: 'right' }}>
                EDIT
              </button>
              <button className='btn btn-info' style={{ float: 'right', marginRight: '20px' }}>
                Change password
              </button>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default InfoAcc