import React from 'react'
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticate } from '../../utils/auth';
import { useCart } from 'react-use-cart'


type Props = {
    onLogout: () => void

}

const HeaderHome = ({onLogout}: Props) => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("react-use-cart")
        navigate("/signin");
        onLogout();
        
    }
    
    const auth = isAuthenticate()
    return (
        <div>
            <header className="section-header">
                <section className="header-main border-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-4">
                                Admin
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <form action="#" className="search">
                                    <div className="input-group w-100">
                                        <input type="text" className="form-control" placeholder="Search" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                                   
                                    <div className="widget-header icontext">
                                        {auth?.user.role === 1 && (
                                            <Link to="/admin" className="icon icon-sm rounded-circle border"><i className="fa fa-user"></i></Link>
                                        )}
                                        <div className="text">
                                            <span className="text-muted">Xin chào</span>
                                            {auth && (
                                                <div>
                                                    <span style={{fontWeight:'bold'}}>{auth.user.name}</span>
                                                    <span style={{cursor:'pointer'}} onClick={() => handleLogout()}>  Đăng xuất</span>
                                                </div>
                                            )}
                                            {!auth && (
                                                <div>
                                                    <NavLink to="/signin">Sign in</NavLink> |
                                                    <NavLink to="/signup"> Register</NavLink>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </header>
        </div>
    )
}

export default HeaderHome