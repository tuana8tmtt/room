import { Breadcrumb, Col, Layout, notification, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, InputGroup } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { success } from 'toastr'
import { editUser, getUserById, newPasswordUser } from '../../../api/auth'
import { uploadImg } from '../../../utils/home'

const InfoAcc = () => {
  const [preview, setPreview] = useState<string>();
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, getValues, formState, watch, reset } = useForm<FormTypes>();
  const [user, setUser] = useState<any>();


  const { id } = useParams()

  const handlePreview = (e: any) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  const handleClose = () => {
    setShow(false)
    reset({ numberRoom: "", quantity: "", status: "", address: "", guarantee: "" })

  };
  const handleShow = (item) => {
    reset(item)
    setShow(true)
  };
  const success = (type: string) => {
    notification[type]({
      message: 'Change Successful',
    });
  };
  const errors = (type: string) => {
    notification[type]({
      message: 'Wrong old password',
    });
  };
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<any> = async (data: any) => {

    try {
      if (watch("password_repeat") !== watch("password") && getValues("password_repeat")) {
        return false
      } else {
        await newPasswordUser({ _id: data._id, oldPass: data.oldPass, password: data.password });
        success('success')
        localStorage.removeItem("user")
        navigate("/home");
        reset();
      }
    } catch (error: any) {
      errors('error')
      console.log(error);

    }
  }

  const handleClose1 = () => {
    setShow1(false)
    reset({ numberRoom: "", quantity: "", status: "", address: "", guarantee: "" })

  };
  const handleShow1 = (item) => {
    reset(item)
    setShow1(true)
  };
  const edit = (type: string) => {
    notification[type]({
      message: 'Change Successful',
    });
  };
  const getUser = async () => {
    const { data } = await getUserById(id)
    console.log(data);
    setUser(data)
  }
  const onSubmit1: SubmitHandler<any> = async data => {

    try {
      if (typeof data.image === "object" && data.image.length) {
        data.image = await uploadImg(data.image[0]);
      }
      if (typeof data.imageID === "object" && data.imageID.length) {
        data.imageID = await uploadImg(data.imageID[0]);
      }
      await editUser(data);
      reset();
      setShow1(false)
      getUser()
      edit('success')
      openNotificationWithIcon1()
      id
    } catch (error: any) {
      console.log(error(error.response.data.error.message || error.response.data.message));

    }
  }
  useEffect(() => {
    getUser()

  }, [])
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
                          src={user?.image || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                          alt="Preview Image"
                          className="h-8 w-full object-cover rounded-md"
                          style={{ height: "200px" }}
                        />
                      </div>
                    </div>
                    {/* <Form.Group controlId="formFile" className="mt-5">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                    </Form.Group> */}
                  </Form>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ alignItems: 'center', gap: 10 }}>
                  <p style={{ fontSize: '25px' }}>Full name: {user?.fullname} </p>
                  <p style={{ fontSize: '25px' }}>Date of Birth: {!user?.dateofbirth ? null : moment(user?.dateofbirth).format('DD-MM-yyyy')} </p>
                  <p style={{ fontSize: '25px' }}>Mail: {user?.email}</p>
                  <p style={{ fontSize: '25px' }}>Username: {user?.name} </p>
                  <p style={{ fontSize: '25px' }}>Phone: {user?.phone} </p>
                </div>
              </Col>
            </Row>
            <div style={{ marginTop: '100px' }}>
              <button className='btn btn-warning' onClick={() => handleShow1(user)} style={{ float: 'right' }}>
                EDIT
              </button>
              <button className='btn btn-info' onClick={() => handleShow(user)} style={{ float: 'right', marginRight: '20px' }}>
                Change password
              </button>
            </div>
            <Modal
              show={show1}
              onHide={() => handleClose1()}
              size="lg"
              centered
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form onSubmit={handleSubmit(onSubmit1)} >
                    <Form.Group as={Col} md="4" className="mb-3" >
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" {...register('fullname')} />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3" >
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" {...register('phone')} />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3" >
                      <Form.Label>Date of birth</Form.Label>
                      <Form.Control type="date" {...register('dateofbirth')} />
                    </Form.Group>
                    <div className="col-span-3">
                      <div className="mt-1">
                        <img
                          src={user?.image || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                          alt="Preview Image"
                          className="h-8 w-full object-cover rounded-md"
                          style={{ height: "150px" }}
                        />
                      </div>
                    </div>
                    <Form.Group controlId="formFile" className="mt-5">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" {...register('image')} onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                    </Form.Group>
                    <div className="col-span-3">
                      <div className="mt-1">
                        <img
                          src={user?.imageID || "https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"}
                          alt="Preview Image"
                          className="h-8 w-full object-cover rounded-md"
                          style={{ height: "150px" }}
                        />
                      </div>
                    </div>
                    <Form.Group controlId="formFile" className="mt-5">
                      <Form.Label>Upload ID Image <span style={{ color: 'red' }}>*Must have</span> </Form.Label>
                      {!user?.imageID ? (
                        <Form.Control type="file" {...register('imageID')} required onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                      ) : (
                        <Form.Control type="file" {...register('imageID')} onChange={e => handlePreview(e)} style={{ width: '300px' }} />
                      )}
                    </Form.Group>
                    <div style={{ float: 'right' }}>
                      <Button variant="secondary" onClick={() => handleClose1()} style={{ marginRight: '10px' }}>
                        Close
                      </Button>
                      <Button variant="primary" type='submit'>
                        Save Device
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal.Body>

            </Modal>

            <Modal
              show={show}
              onHide={() => handleClose()}
              size="lg"
              centered
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                      <Form.Label>Old Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          aria-describedby="inputGroupPrepend"
                          required
                          {...register('oldPass')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Không được để trống
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                      <Form.Label>Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          aria-describedby="inputGroupPrepend"
                          required
                          {...register('password')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Không được để trống
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                      <Form.Label>Password re-enter</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="password"
                          placeholder="Password Repeat"
                          aria-describedby="inputGroupPrepend"
                          required
                          {...register('password_repeat')}
                        />
                        <br />
                        {watch("password_repeat") !== watch("password") &&
                          getValues("password_repeat") ? (
                          <p>password not match</p>
                        ) : null}
                        <Form.Control.Feedback type="invalid">
                          Không được để trống
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mt-5">
                      <Form.Control type="hidden" {...register('_id')} value={id} />
                    </Form.Group>
                    <div style={{ float: 'right' }}>
                      <Button variant="secondary" onClick={() => handleClose()} style={{ marginRight: '10px' }}>
                        Close
                      </Button>
                      <Button variant="primary" type='submit'>
                        Save Device
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal.Body>

            </Modal>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default InfoAcc

function openNotificationWithIcon1() {
  throw new Error('Function not implemented.')
}
