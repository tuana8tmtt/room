import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { Money } from '../../utils/home';


const Cart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        updateItemQuantity,
        removeItem,
        emptyCart,
        cartTotal
    } = useCart();
    console.log(items);

    if (isEmpty) return <h1 style={{ textAlign: 'center' }}>Không có sản phẩm trong giỏ hàng</h1>

    return (
        <div>
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Giỏ hàng</h2>
                </div>
            </section>

            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">

                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col" style={{ width: "120" }}>Số lượng</th>
                                            <th scope="col" style={{ width: "120" }}>Giá sản phẩm</th>
                                            <th scope="col" className="text-right" style={{ width: "120" }}> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <figure className="itemside">
                                                            <div className="aside"><img src={item.image} className="img-sm" /></div>
                                                            <figcaption className="info">
                                                                <p style={{fontWeight:'bold'}}>{item.name}</p>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className='btn btn-info'
                                                            onClick={()=> updateItemQuantity(item.id, item.quantity-1)}
                                                        >-</button>
                                                        <span style={{ padding: "10px", fontWeight: 'bold' }}>{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            className='btn btn-info'
                                                            onClick={()=> updateItemQuantity(item.id, item.quantity+1)}
                                                        >+</button>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{Money(item.price*item.quantity)}</var>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <button className="btn btn-danger" onClick={()=> removeItem(item.id)}> Xóa sản phẩm</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                <div className="card-body border-top">
                                    <Link to="/checkout" className="btn btn-primary float-md-right"> Thanh toán <i className="fa fa-chevron-right"></i> </Link>
                                    <Link to="/product" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Quay lại trang sản phẩm </Link>
                                </div>
                            </div>

                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck"></i> Vận chuyển từ 2-5 ngày</p>
                            </div>

                        </main>
                        <aside className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Tổng tiền:</dt>
                                        <dd className="text-right  h5"><strong>{Money(cartTotal)}</strong></dd>
                                    </dl>

                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Cart