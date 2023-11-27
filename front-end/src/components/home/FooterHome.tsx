import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { listcate } from '../../api/category';
import { CateType } from '../../pages/types/category';

type Props = {}

const FooterHome = (props: Props) => {
    const [cates, setCates] = useState<CateType[]>();

    useEffect(() => {
        const getCates = async () => {
            const { data } = await listcate();
            setCates(data);
        }
        getCates();
    }, [])
    return (
        <div>
            <footer className="section-footer border-top bg">
                <div className="container">
                    <section className="footer-top  padding-y">
                        <div className="row">
                            <aside className="col-md col-6">
                                <h6 className="title">Danh mục</h6>
                                <ul className="list-unstyled">
                                    {cates?.map((item,index)=>(
                                        <li key={index}>
                                            <Link to={`/category/${item._id}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                            <aside className="col-md col-6">
                                <h6 className="title">Account</h6>
                                <ul className="list-unstyled">
                                    <li> <Link to='/signin'>Login</Link></li>
                                    <li> <Link to='/signup'>Register</Link></li>
                                    <li> <a href="#"> Account Setting </a></li>
                                    <li> <a href="#"> My Orders </a></li>
                                </ul>
                            </aside>
                            <aside className="col-md">
                                <h6 className="title">Social</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#"> <i className="fab fa-facebook"></i> Facebook </a></li>
                                    <li><a href="#"> <i className="fab fa-twitter"></i> Twitter </a></li>
                                    <li><a href="#"> <i className="fab fa-instagram"></i> Instagram </a></li>
                                    <li><a href="#"> <i className="fab fa-youtube"></i> Youtube </a></li>
                                </ul>
                            </aside>
                        </div>
                    </section>
                    <section className="footer-bottom row">
                        <div className="col-md-2">
                            <p className="text-muted">   2021 Phone Shop </p>
                        </div>
                        <div className="col-md-8 text-md-center">
                            <span className="px-2">admin@admin.com</span>
                            <span className="px-2">+84387582311</span>
                            <span className="px-2">Cao Đẳng FPT, Trịnh Văn Bô, Nam Từ Liêm</span>
                        </div>
                        <div className="col-md-2 text-md-right text-muted">
                            <i className="fab fa-lg fa-cc-visa"></i>
                            <i className="fab fa-lg fa-cc-paypal"></i>
                            <i className="fab fa-lg fa-cc-mastercard"></i>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    )
}

export default FooterHome