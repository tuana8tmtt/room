import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthenticate } from '../../utils/auth';
type PrivateRouterProps = {
    children: JSX.Element
}

const PrivateRouter = (props: PrivateRouterProps) => {
    const auth = isAuthenticate();
    if(auth.user.role !== 0){
        return <Navigate to="/" />
    }
  return props.children
}
export default PrivateRouter

export const PrivateHome = (props: PrivateRouterProps) => {
    const auth = isAuthenticate();
    if(!auth){
        return <Navigate to="/home" />
    }
  return props.children
}
