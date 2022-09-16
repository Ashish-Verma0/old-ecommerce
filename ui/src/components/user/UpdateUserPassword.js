import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {  putFetch } from '../../api/Api'

const UpdatePassword = () => {
    const navigate=useNavigate()
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const res = await putFetch("http://localhost:8084/api/v1/password/update", data)
            console.log(res)
            return navigate("/account")
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
                                                    Change into your account Password
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        name='oldPassword'
                                                        value={data.oldPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        oldPassword
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        name='newPassword'
                                                        value={data.newPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        newPassword
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        name='confirmPassword'
                                                        value={data.confirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        confirmPassword
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        onClick={handleSubmit}
                                                    >
                                                        update Password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UpdatePassword