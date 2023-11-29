import { Breadcrumb } from 'antd'
import Layout, { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BillExpense = () => {
  const navigate = useNavigate()

  const Print = () => {
    let printContent = document.getElementById('print')?.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
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
            <div>
              <button onClick={() => navigate(-1)} style={{ float: 'right' }} className='btn btn-info'>Back</button>
              <h2 style={{ textAlign: 'center' }}>Bill</h2>
            </div>
            <div className="row" id='print'>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="text-muted">
                          <h5 className="font-size-16 mb-3">Payer :</h5>
                          <h5 className="font-size-16 mb-3">Room :</h5>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-muted text-sm-end">
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap table-centered mb-0">
                          <thead>
                            <tr>
                              <th style={{ width: '70px' }}>STT</th>
                              <th>Cost name</th>
                              <th>Cost</th>
                              <th>Payment date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">01</th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14 mb-1">Black Strap A012</h5>
                                  <p className="text-muted mb-0">Watch, Black</p>
                                </div>
                              </td>
                              <td>$ 245.50</td>
                              <td>1</td>
                            </tr>
                            <tr>
                              <th scope="row">02</th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                                  <p className="text-muted mb-0">Watch, Gold</p>
                                </div>
                              </td>
                              <td>$ 245.50</td>
                              <td>2</td>
                            </tr>

                          </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '35px' }}>
                          <h5>Pair successfully</h5>
                          <div>
                            <h5>Colector</h5>
                            <h5>Tên chủ nhà</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-print-none mt-4">
                        <div className="float-end">
                          <span onClick={Print} className="btn btn-success me-1"><i className="fa fa-print"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default BillExpense