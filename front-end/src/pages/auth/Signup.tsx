import { notification } from 'antd'
import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import FooterHome from '../../components/home/FooterHome'
import HeaderHome from '../../components/home/HeaderHome'

type FormTypes = {
  name: string,
  email: string,
  password: string,
  phone: number,
  password_repeat: string,
}

const Signup = () => {
  const { register, handleSubmit, getValues, formState, watch, reset } = useForm<FormTypes>();
  let pwd = watch("password")
  const success = (type: string) => {
    notification[type]({
      message: 'Register thành công',
    });
  };
  const errors = (type: string) => {
    notification[type]({
      message: 'Tài khoản đã tồn tại',
    });
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormTypes> = async data => {
    try {
      if (watch("password_repeat") !== watch("password") && getValues("password_repeat")) {
        return false
      } else {
        await signup(data);
        console.log(data);
        success('success')
        navigate('/home')
        reset();
      }
    } catch (error: any) {
      errors('error')
      console.log(error);
    }
  }


  return (
    <div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Col} md="10" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              {...register('name')}
            />
            <Form.Control.Feedback type="invalid">
              Không được để trống
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="10" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              {...register('email')}
            />
            <Form.Control.Feedback type="invalid">
              Không được để trống
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="10" controlId="validationCustomUsername">
          <Form.Label>Phone Number</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              aria-describedby="inputGroupPrepend"
              required
              {...register('phone')}
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
        <br />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  )
}

export default Signup