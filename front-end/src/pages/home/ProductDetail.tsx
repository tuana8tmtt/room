import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listbyID } from '../../api/product';
import { Money } from '../../utils/home';
import { ProductType } from '../types/product';
import toastr from "toastr";
import { useCart } from 'react-use-cart'
import { addToCart } from '../../utils/auth';



const ProductDetail = () => {
    const [product, setProduct] = useState<ProductType>();
    const { addItem } = useCart()
    const { id } = useParams();
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listbyID(id);

            setProduct(data)
        }
        getProducts()
    }, [])
    // const handleIncrease = () => {
    //     setQuantity(prev => prev + 1);
    // }

    // const handleDecrease = () => {
    //     if (quantity === 1) {
    //         toastr.info("Vui lòng chọn ít nhất 1 sản phẩm");
    //     } else {
    //         setQuantity(quantity - 1);
    //     }
    // }
    const productCart = {
        id,
        productId: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
    }
    // const addCart = () =>{
    //     addToCart({...productCart})
    // }

    return (
        <div>

            <section className="section-content padding-y bg">
                <div className="container">

                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <article className="gallery-wrap">
                                        <div className="card img-big-wrap">
                                            <a href="#"> <img src={product?.image} /></a>
                                        </div>
                                    </article>
                                </aside>
                                <main className="col-md-6">
                                    <article>
                                        <h3 className="title">{product?.name}</h3>
                                        <hr />

                                        <div className="mb-3">
                                            <h6>Mô Tả</h6>
                                            <span>{product?.desc}</span>
                                        </div>
                                        <div className="mb-3">
                                            <var className="price h4">{Money(product?.price || 0)}</var> <br />
                                        </div>
                                        <div className="border-b border-dashed pb-4 mt-6">
                                            {/* {showBtnClear  && <p className="transition-all ease-linear duration-100 mt-6 border-t border-dashed pt-2 text-xl font-semibold">{formatCurrency(totalPrice)}</p>} */}
                                            <div className="flex mt-2 items-center">
                                                {/* <div className="flex items-center h-9">
                                                    <button
                                                        type="button"
                                                        onClick={handleDecrease}
                                                        className="px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                                                    >-</button>
                                                    <input
                                                        type="text"
                                                        className="border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]"
                                                        value={quantity}
                                                        onChange={(e: any) => {
                                                            const qnt = e.target.value;
                                                            if (isNaN(qnt)) {
                                                                toastr.info("Vui lòng nhập số");
                                                            } else {
                                                                setQuantity(+e.target.value)
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleIncrease}
                                                        className="px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
                                                    >+</button>
                                                </div> */}
                                            </div>
                                            <div className="mb-4">
                                                <button className="btn btn-primary mr-1" onClick={()=>addItem(productCart)}>Mua ngay</button>
                                            </div>
                                        </div>                        
                                    </article>
                                </main>
                            </div>
                        </div>
                    </article>
                    {/* <article className="card mt-5">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <h5>Parameters</h5>
                                    <dl className="row">
                                        <dt className="col-sm-3">Display</dt>
                                        <dd className="col-sm-9">13.3-inch LED-backlit display with IPS</dd>

                                        <dt className="col-sm-3">Processor</dt>
                                        <dd className="col-sm-9">2.3GHz dual-core Intel Core i5</dd>

                                        <dt className="col-sm-3">Camera</dt>
                                        <dd className="col-sm-9">720p FaceTime HD camera</dd>

                                        <dt className="col-sm-3">Memory</dt>
                                        <dd className="col-sm-9">8 GB RAM or 16 GB RAM</dd>

                                        <dt className="col-sm-3">Graphics</dt>
                                        <dd className="col-sm-9">Intel Iris Plus Graphics 640</dd>
                                    </dl>
                                </aside>
                                <aside className="col-md-6">
                                    <h5>Features</h5>
                                    <ul className="list-check">
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                        <li>Amazing features and high quality</li>
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                    </ul>
                                </aside>
                            </div>
                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </article> */}
                </div>


            </section>
        </div>
    )
}

export default ProductDetail