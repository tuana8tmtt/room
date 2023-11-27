import { notification } from 'antd';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { add } from '../../api/order';
import { Money } from '../../utils/home';
import { OrderType } from '../types/order';

type Props = {}

const CheckOut = (props: Props) => {
    const { register, handleSubmit, formState, reset } = useForm<OrderType>();
    const navigator = useNavigate()
    const openNotificationWithIcon = (type: string) => {
        notification[type]({
          message: 'Đặt hàng thành công',
        });
      };
    const onSubmit: SubmitHandler<OrderType> = async (product) => {
        console.log(product);
        console.log(items);
        add({
            userOrder: product.userOrder,
            listOrder: items,
            cartTotal: cartTotal,
            status: "0"
        })            
        openNotificationWithIcon('success')
        localStorage.removeItem("react-use-cart")
        reset()
        setTimeout(() => navigator("/product"), 3000)

    }

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
    return (
        <div>
            <div className="maincontainer">
                <div className="container">
                    <div className="py-5 text-center">

                        <h2>Thanh toán</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Giỏ hàng</span>
                                <span className="badge badge-secondary badge-pill">{totalUniqueItems}</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {items.map((item, index) => {
                                    return (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{item.name}</h6>
                                            </div>
                                            <span className="text-muted">{Money(item.price * item.quantity)}</span>
                                        </li>
                                    )
                                })}
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Tổng tiền</span>
                                    <strong>{Money(cartTotal)}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Thông tin</h4>
                            <form className="needs-validation" onSubmit={handleSubmit(onSubmit)} >
                                <div className="mb-3">
                                    <label >Họ và tên</label>
                                    <div className="input-group">
                                        <input {...register('userOrder.name')} type="text" className="form-control" id="username" placeholder="Nguyễn Văn A"  />
                                        <div className="invalid-feedback">
                                            không được để trống
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label >Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" {...register('userOrder.email')} className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Vui lòng nhập email
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label >Địa chỉ</label>
                                    <input type="text" {...register('userOrder.address')} className="form-control" id="address" placeholder="123 Phố trịnh văn bô ....." />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label >Số điện thoại <span className="text-muted">(Optional)</span></label>
                                    <input type="text" {...register('userOrder.phone')} className="form-control" id="email" placeholder="03875823..." />
                                    <div className="invalid-feedback">
                                        Vui lòng nhập email
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Đặt hàng</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CheckOut