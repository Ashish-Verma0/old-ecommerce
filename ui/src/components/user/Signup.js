import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postFetch } from '../../api/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = data
    const [avatar, setAvatar] = useState("/profile.png")
    // const [avatarPreview, setAvatarPreview] = useState("/profile.png")

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setData({ ...data, [e.target.name]: [e.target.value] })

        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const myForm = new FormData()

            myForm.set("name", name)
            myForm.set("email", email)
            myForm.set("password", password)
            myForm.set("avatar", avatar)
            console.log(avatar)
            const res = await postFetch("http://localhost:8084/api/v1/register", myForm)
            console.log(res)
            if (res.status === 200) {
                toast("user Successfuuly created")
                navigate("/")
                window.location.reload()
            } else if (res.status === 400) {
                toast("Email has already exists")
            } else if (res.status === 500) {
                toast("please fill user details")
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>
                                            <form className="mx-1 mx-md-4" >
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            name='name'
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            Your Name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            name='email'
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="form3Example3c">
                                                            Your Email
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            name='password'
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4c">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="file"
                                                            id="form3Example4cd"
                                                            className="form-control"
                                                            accept='image/*'
                                                            name='avatar'
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4cd">
                                                            Upload avatar
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="form2Example3c"
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in{" "}
                                                        <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src={avatar}
                                                className="img-fluid"
                                                alt="Sample image"
                                                required
                                            />
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

export default Signup