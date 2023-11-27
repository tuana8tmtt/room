import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { list } from '../../api/category';
import { CateType } from '../../pages/types/category';

type Props = {}

const NavHome = (props: Props) => {
    const [cates, setCates] = useState<CateType[]>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setCates(data);
        }
        getProducts();
    }, [])

  return (
    <div>
        <section className="section-main bg padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-3">
                            <nav className="card">
                                <ul className="menu-category">
                                    {cates?.map((item,index)=>(
                                        <li key={index}>
                                            <Link to={`/${item._id}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>
                        <div className="col-md-9">
                            <article className="banner-wrap">
                                <img src="https://i.pinimg.com/originals/ca/e7/2c/cae72ce86998abcadd5051acd91a696b.jpg" className="w-100 rounded" />
                            </article>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default NavHome