import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  putFetch } from '../../api/Api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserUpdate = () => {
    const navigate=useNavigate()
    const[data,setData]=useState({
        name:"",
        email:""
    })
    const { name, email } = data
    const [avatar, setAvatar] = useState("/profile.png")

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
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
            myForm.set("avatar", avatar)
            console.log(avatar)
            const res = await putFetch("http://localhost:8084/api/v1/me/update", myForm)
            console.log(res)
            if (res.status === 200) {
                toast("user Successfuuly created")
                navigate("/account")
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
                                               
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
                                                       Update Profile
                                                    </button>
                                                </div>
                                            </form>
          <ToastContainer />
    </div>
  )
}

export default UserUpdate