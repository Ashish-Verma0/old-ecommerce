import React, { useEffect, useState, Suspense, lazy, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import { Store } from './useContext_Hook/Data'

// import Success from './components/shipping/Success'
// import PageNotFound from './components/pageNotFount/PageNotFound'
// import Payment from './components/shipping/Payment'
// import ConfirmOrder from './components/shipping/ConfirmOrder'
// import Cart from './components/cart/Cart'
// import ForgotPassword from './components/forgotPasswordToken/ForgotPassword'
// import ResetPassword from './components/forgotPasswordToken/ResetPassword'
// import Shipping from './components/shipping/Shipping'
// import UpdateUserPassword from './components/user/UpdateUserPassword'
// import UserUpdate from './components/user/UserUpdate'
// import UserAccount from './components/user/UserAccount'
// import UserOptions from './components/layout/header/userOptions'
// import Home from './components/home/Home'
// import Footer from './components/layout/footer/Footer'
// import Header from './components/layout/header/Header'
// import Loading from './components/loading/Loading'
// import Product from './components/products/Products.js'
// import ProductDetail from './components/products/productDetails/ProductDetail'
// import Search from './components/products/Search'
// import SearchProduct from './components/products/SearchProduct'
// import LoginSignup from './components/user/LoginSignup'
// import Signup from './components/user/Signup'
// import UpdatePassword from './components/updatePassword/UpdatePassword'
// import VerifyEmail from './components/forgotPssword/VerifyEmail'
// import PasswordChanged from './components/forgotPssword/PasswordChanged'

const Home = lazy(() => import('./components/home/Home'))
const Footer = lazy(() => import('./components/layout/footer/Footer'))
const Header = lazy(() => import('./components/layout/header/Header'))
const Loading = lazy(() => import('./components/loading/Loading'))
const Product = lazy(() => import('./components/products/Products.js'))
const ProductDetail = lazy(() => import('./components/products/productDetails/ProductDetail'))
const Search = lazy(() => import('./components/products/Search'))
const SearchProduct = lazy(() => import('./components/products/SearchProduct'))
const LoginSignup = lazy(() => import('./components/user/LoginSignup'))
const Signup = lazy(() => import('./components/user/Signup'))
// const VerifyEmail = lazy(() => import('./components/forgotPssword/VerifyEmail'))
// const PasswordChanged = lazy(() => import('./components/forgotPssword/PasswordChanged'))
const UserOptions = lazy(() => import('./components/layout/header/UserOptions'))
const UserAccount = lazy(() => import('./components/user/UserAccount'))
const UserUpdate = lazy(()=> import('./components/user/UserUpdate'))
const Cart = lazy(()=> import('./components/cart/Cart'))
const UpdateUserPassword = lazy(()=> import('./components/user/UpdateUserPassword'))
const ForgotPassword = lazy(()=> import('./components/forgotPasswordToken/ForgotPassword'))
const ResetPassword = lazy(()=> import('./components/forgotPasswordToken/ResetPassword'))
const Shipping = lazy(()=> import('./components/shipping/Shipping'))
const ConfirmOrder = lazy(()=> import('./components/shipping/ConfirmOrder'))
const Payment = lazy(()=> import('./components/shipping/Payment'))
const Success = lazy(()=> import('./components/shipping/Success'))
const PageNotFound = lazy(()=> import('./components/pageNotFount/PageNotFound'))

const App = () => {
  const{stripeApiKey}=useContext(Store)
  const [check, setCheck] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token")
    // console.log(token)
    if (token?.length > 25) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [])


  return (
    <>
      <Suspense fallback={<div><Loading /></div>}>
        
        {check ?
        <>
            <Header />
            <UserOptions/>
            <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/productDetail" element={<ProductDetail />} />
            <Route exact path="/products" element={<Product />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/search/product/keyword" element={<SearchProduct />} />
            <Route exact path="/account" element={<UserAccount/>} />
            <Route exact path="/me/update" element={<UserUpdate/>} />
            <Route exact path="/password/update" element={<UpdateUserPassword/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/shipping" element={<Shipping/>} />
            <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
            <Route exact path="/process/payment" element={<Payment/>} />
            <Route exact path="/success" element={<Success/>} />
            <Route exact path="*" element={<PageNotFound/>} />
          </Routes>
            </Elements>
          {/* <Footer /> */}
          </>
          :
          <Routes>
            <Route exact path="/" element={<LoginSignup />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/password/forgot" element={<ForgotPassword/>} />
            <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
            {/* <Route exact path="/verifyEmail" element={<VerifyEmail />} />
            <Route exact path="/passwordChanged" element={<PasswordChanged />} /> */}
          </Routes>
        }
      </Suspense>
    </>
  )
}

export default App