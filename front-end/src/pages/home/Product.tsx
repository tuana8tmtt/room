import { Card, List, Image } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { listcate } from '../../api/category';
import { list } from '../../api/product';
import { Money } from '../../utils/home';
import { CateType } from '../types/category';
import { ProductType } from '../types/product';
import { useCart } from 'react-use-cart'


type Props = {}

const Product = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>();
    const { addItem } = useCart()

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setProducts(data);
        }
        getProducts();
    }, [])
    const listData = products?.map((item, index) => {
        return {
            key: index + 1,
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image
        }
    })
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
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Danh sách sản phẩm</h2>
                </div>
            </section>

            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">

                            <div className="card">
                                <article className="filter-group">
                                    <header className="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title">Danh mục sản phẩm</h6>
                                        </a>
                                    </header>
                                    <div className="filter-content collapse show" id="collapse_1">
                                        <div className="card-body">
                                            <form className="pb-3">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                                                    </div>
                                                </div>
                                            </form>

                                            <ul className="list-menu">
                                                {cates?.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={`/category/${item._id}`}>{item.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                                <article className="filter-group">
                                    <header className="card-header">
                                        <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                                            <i className="icon-control fa fa-chevron-down"></i>
                                            <h6 className="title">Lọc sản phẩm theo giá</h6>
                                        </a>
                                    </header>
                                    <div className="filter-content collapse show" id="collapse_3">
                                        <div className="card-body">
                                            <input type="range" className="custom-range" min="0" max="100" name="" />
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>Min</label>
                                                    <input className="form-control" placeholder="$0" type="number" />
                                                </div>
                                                <div className="form-group text-right col-md-6">
                                                    <label>Max</label>
                                                    <input className="form-control" placeholder="$1,0000" type="number" />
                                                </div>
                                            </div>
                                            <button className="btn btn-block btn-primary">Apply</button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </aside>
                        <main className="col-md-9">
                            <header className="border-bottom mb-4 pb-3">
                                <div className="form-inline">
                                    <span className="mr-md-auto">Danh sách sản phẩm</span>
                                    <select className="mr-2 form-control">
                                        <option>Mới nhất</option>
                                        <option>Nhiều lượt thích</option>
                                        <option>Giá cao đến thấp</option>
                                    </select>
                                    <div className="btn-group">
                                        <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view">
                                            <i className="fa fa-bars"></i></a>
                                        <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view">
                                            <i className="fa fa-th"></i></a>
                                    </div>
                                </div>
                            </header>
                            <div className="row">
                                <List
                                    grid={{ gutter: 16, column: 4 }}
                                    size={'default'}
                                    pagination={{
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        pageSize: 8,
                                    }}
                                    dataSource={listData}

                                    renderItem={item => (
                                        <List.Item style={{ textAlign: "center" }}>
                                            <Card title={<Image width={180} style={{ textAlign: "center" }} src={item.image} />}>
                                                <Link to={`/product/${item.id}`}><h5>{item.name}</h5></Link>
                                                <h6>{Money(item.price)}</h6>
                                                <button className="btn btn-primary mr-1" onClick={()=>addItem(item)}>Mua ngay</button>

                                            </Card>

                                        </List.Item>
                                    )}
                                />,

                            </div>

                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product