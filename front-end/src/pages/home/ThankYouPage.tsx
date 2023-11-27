import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const ThankYouPage = (props: Props) => {
    return (
        <div>
        <div className="jumbotron text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead"><strong>Cảm ơn bạn</strong> đã tin tưởng và đặt hàng của chúng tôi</p>
            <hr/>
                
                <p className="lead">
                    <Link className="btn btn-primary btn-sm" to="/" role="button">Quay lại trang chủ</Link>
                </p>
        </div>
    </div >
  )
}

export default ThankYouPage