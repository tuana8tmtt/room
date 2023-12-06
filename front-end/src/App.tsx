import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import AdminLayouts from './pages/layouts/AdminLayouts'
import Dashboard from './pages/admin/Dashboard'
import ListProduct from './pages/admin/products/ListProduct'
import AddProduct from './pages/admin/products/AddProduct'
import EditProduct from './pages/admin/products/EditProduct'
import ListCate from './pages/admin/category/ListCategory'
import AddCate from './pages/admin/category/AddCategory'
import EditCate from './pages/admin/category/EditCategory'
import Signup from './pages/auth/Signup'
import WebsiteLayouts from './pages/layouts/WebsiteLayout'
import 'antd/dist/antd.css'
import Home from './pages/home/Home'
import Demo from './pages/admin/Demo'
import Signin from './pages/auth/Signin'
import PrivateRouter, { PrivateHome } from './components/admin/PrivateRouter'
import NotFoundPage from './components/home/NotFoundPage'
import Product from './pages/home/Product'
import ProductDetail from './pages/home/ProductDetail'
import ProductByCate from './pages/home/ProductByCate'
import Cart from './pages/home/Cart'
import { CartProvider } from 'react-use-cart'
import CheckOut from './pages/home/CheckOut'
import ThankYouPage from './pages/home/ThankYouPage'
import ListOrder from './pages/admin/order/ListOrder'
import EditOrder from './pages/admin/order/EditOrder'
import ListContract from './pages/admin/contract/ListContract'
import AddContract from './pages/admin/contract/AddContract'
import EditContract from './pages/admin/contract/EditContract'
import ViewProduct from './pages/admin/products/ViewProduct'
import TabAuth from './pages/auth/TabAuth'
import ListExpense from './pages/admin/expense/listExpense'
import EditExpense from './pages/admin/expense/editExpense'
import EditExpenseRoom from './pages/admin/expense/editExpenseRoom'
import BillExpense from './pages/admin/expense/billExpense'
import InfoAcc from './pages/admin/user/InfoAcc'
import Apartment from './pages/admin/user/apartment'
import ListDevice from './pages/admin/device/ListDevice'
import ViewDevice from './pages/admin/device/ViewDevice'



function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="">
      <Routes>
        <Route path='/' element={<PrivateHome><WebsiteLayouts /></PrivateHome>}>
          <Route index element={<Navigate to="admin" />} />
        </Route>
        <Route path='admin' element={<PrivateRouter><AdminLayouts /></PrivateRouter>}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='demo' element={<Demo />} />
          <Route path='room'>
            <Route index element={<ListProduct />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='edit/:id' element={<EditProduct />} />
            <Route path='view/:id' element={<ViewProduct />} />
          </Route>
          <Route path='contract'>
            <Route index element={<ListContract />} />
            <Route path='add' element={<AddContract />} />
            <Route path='edit/:id' element={<EditContract />} />
          </Route>
          <Route path='expense'>
            <Route index element={<ListExpense />} />
            <Route path='edit/' element={<EditExpense />} />
            <Route path='edit/room/:id' element={<EditExpenseRoom />} />
            <Route path='bill/:id' element={<BillExpense />} />
          </Route>
          <Route path='order'>
            <Route index element={<ListOrder />} />
            <Route path='add' element={<AddCate />} />
            <Route path='detail/:id' element={<EditOrder />} />
          </Route>
          <Route path='user'>
            <Route index element={<InfoAcc />} />
          </Route>
          <Route path='apartment'>
            <Route index element={<Apartment />} />
          </Route>
          <Route path='device'>
            <Route index element={<ListDevice />} />
            <Route path='view/:id' element={<ViewDevice />} />
          </Route>
        </Route>
        <Route path='home' element={<TabAuth />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
