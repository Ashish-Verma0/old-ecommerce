import React, { useContext, useState } from 'react'
import { postFetch } from '../../api/Api'
import { Store } from '../../useContext_Hook/Data'

const PasswordChanged = () => {
    const { email } = useContext(Store)
    const [data, setData] = useState({
        code: "",
        password: "",
        confirmPassword: "",
        email
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            // Object.assign(data, { emailData })
            console.log(data)
            const res = await postFetch("http://localhost:8084/api/v1/password/change", data)
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

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i
                                                    className="fas fa-cubes fa-2x me-3"
                                                    style={{ color: "#ff6219" }}
                                                />
                                                <span className="h1 fw-bold mb-0">Otp send with your {email} </span>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="number"
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                    name='code'
                                                    value={data.code}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form2Example17">
                                                    Enter Your Otp Code
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                    name='password'
                                                    value={data.password}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form2Example17">
                                                    Enter Your New Password
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                    name='confirmPassword'
                                                    value={data.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form2Example17">
                                                    Enter Your Confirm Password
                                                </label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Create New Password
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

export default PasswordChanged