import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postFetch } from '../../api/Api'
import { Store } from '../../useContext_Hook/Data'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const { getEmail } = useContext(Store)
    const [data, setData] = useState({
        email: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const handleSubmit = async () => {
        try {
            getEmail(data.email)
            const res = await postFetch("http://localhost:8084/api/v1/email/send", data)
            console.log(res)
            if (res.status === 200) {
                navigate("/passwordChanged")
            }
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

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i
                                                    className="fas fa-cubes fa-2x me-3"
                                                    style={{ color: "#ff6219" }}
                                                />
                                                <span className="h1 fw-bold mb-0">Otp send with email</span>
                                            </div>

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

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Login
                                                </button>
                                            </div>


                                        </form>
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

export default VerifyEmail