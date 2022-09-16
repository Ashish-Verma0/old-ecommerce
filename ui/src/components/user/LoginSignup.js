import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { postFetch } from '../../api/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Store } from '../../useContext_Hook/Data';


const LoginSignup = () => {
    
    const navigate=useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const res = await postFetch("http://localhost:8084/api/v1/login", data)
            console.log(res.data.user)
            
            localStorage.setItem("token", res?.data?.token)
            if (res.status === 200) {
                toast("Login successfully ")
                window.location.reload()
                navigate('/')
            }
            if (res.status === 400) {
                toast("please enter user details")
            }
            if (res.status === 402) {
                toast("invalid user password")
            }
            if (res.status === 404) {
                toast("invalid user Email")
            }

        } catch (error) {
            console.log(error.response)
        }
    }

    const handleGoogle = async () => {
        try {
            const res = await axios.get("http://localhost:8084/auth/google/callback")
            console.log(res)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i
                                                        className="fas fa-cubes fa-2x me-3"
                                                        style={{ color: "#ff6219" }}
                                                    />
                                                    <span className="h1 fw-bold mb-0">Logo</span>
                                                </div>
                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Sign into your account
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        name='email'
                                                        value={data.email}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        Email address
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        name='password'
                                                        value={data.password}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        onClick={handleSubmit}
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <label className="form-label" htmlFor="form2Example27">
                                                    OR
                                                </label>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        onClick={handleGoogle}
                                                    >

                                                        Login with Google
                                                    </button>

                                                </div>
                                                <NavLink to="/password/forgot" className="small text-muted" >
                                                    Forgot password?
                                                </NavLink>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Don't have an account?{" "}
                                                    <NavLink to="/signup" style={{ color: "#393f81" }}>
                                                        Register here
                                                    </NavLink>
                                                </p>
                                                <a href="#!" className="small text-muted">
                                                    Terms of use.
                                                </a>
                                                <a href="#!" className="small text-muted">
                                                    Privacy policy
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default LoginSignup