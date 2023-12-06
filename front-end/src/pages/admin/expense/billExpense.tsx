import { Breadcrumb } from 'antd'
import Layout, { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listbyID } from '../../../api/product'
import { listbyIDrevenue, listrevenue } from '../../../api/revenua'
import { Money } from '../../../utils/home'

const BillExpense = () => {
  const [cates, setCates] = useState<any>();
  const [rooms, setRooms] = useState<any>();
  const [revenuas, setRevenuas] = useState<any>();
  const navigate = useNavigate()
  const { id } = useParams()
  const Print = () => {
    let printContent = document.getElementById('print')?.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
  }
  const dataRevenuas = revenuas?.filter(item => item.roomId === rooms._id)



  useEffect(() => {

    const getRoom = async () => {
      const { data } = await listbyID(id)
      setRooms(data)
    }
    getRoom()
    const getRevenua = async () => {
      const { data } = await listrevenue()
      setRevenuas(data)
    }
    getRevenua()
  }, [])
  return (
    <div>
      <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
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
                          <h5 className="font-size-16 mb-3">Room : {rooms?.name}</h5>
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
                            {dataRevenuas?.map((item, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <div>
                                    <h5 className="text-truncate font-size-14 mb-1">{item.costname}</h5>
                                  </div>
                                </td>
                                <td>{Money(item.cost)}</td>
                                <td>{item.paymentdate}</td>
                              </tr>
                            ))}

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