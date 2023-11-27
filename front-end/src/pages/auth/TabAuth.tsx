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
import Signin from './Signin'
import Signup from './Signup'

const TabAuth = () => {
    const [key, setKey] = useState('signin');

    return (
        <div>
            {/* <HeaderHome /> */}
            <div className="maincontainer">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-6 d-none d-md-flex bg-image"></div>
                        <div className="col-md-6 bg-light">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-7 mx-auto">
                                            <Tabs
                                                id="controlled-tab-example"
                                                activeKey={key}
                                                onSelect={(k) => setKey(k)}
                                                className="mb-3"
                                            >
                                                <Tab eventKey="signin" title="Sign In">
                                                    <Signin />
                                                </Tab>
                                                <Tab eventKey="signup" title="Sign Up">
                                                    <Signup />
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <FooterHome /> */}
        </div>
    )
}

export default TabAuth