import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../api/auth'
import FooterHome from '../../components/home/FooterHome'
import HeaderHome from '../../components/home/HeaderHome'
import { notification } from 'antd'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



type FormTypes = {
    name: string,
    email: string,
    password: string,
}
type FormTypes2 = {
    username: string
    name: string,
    email: string,
    password: string,
    phone: number,
    password_repeat: string,
}

const Signin = ({ onLogin }: LoginPageProps) => {
    const { register, handleSubmit, getValues, formState, watch, reset } = useForm<FormTypes2>();
    const [key, setKey] = useState('signin');
    const navigate = useNavigate();
    const success = (type: string) => {
        notification[type]({
            message: 'Login Successful',
        });
    };
    const errors = (type: string) => {
        notification[type]({
            message: 'Login error',
        });
    };
    if (key === 'signin') {

    }
    const onSubmit: SubmitHandler<FormTypes> = async data => {
        try {
            const { data: users } = await signin(data);
            localStorage.setItem('user', JSON.stringify(users))
            success('success')
            navigate("/admin");
        } catch (error) {
            errors('error')
            console.log(error);
        }
    }
    const onSubmit2: SubmitHandler<FormTypes2> = async data => {
        try {
            if (watch("password_repeat") !== watch("password") && getValues("password_repeat")) {
                return false
            } else {
                await signup(data);
                console.log(data);
                success('success')
                navigate('/signin')
                reset();
            }
        } catch (error: any) {
            errors('error')
            console.log(error);
        }
    }
    console.log(key);

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
                {/* <Form.Control type='hidden' value={0} {...register('role')} /> */}
                <br />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Signin