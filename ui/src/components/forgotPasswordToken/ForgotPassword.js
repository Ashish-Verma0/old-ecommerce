import React, { useState } from 'react'
import { postFetch } from '../../api/Api';

const ForgotPassword = () => {
    const[data,setData]=useState({
        email:""   
    })

    const handleChange=(e)=>{
 const{name,value}=e.target;
 setData({...data,[name]:value})
    }

    const handleSubmit=async()=>{
try {
    const res=await postFetch("http://localhost:8084/api/v1/password/forgot",data)
    console.log(res.data.resetToken)
    localStorage.setItem("resetToken",res.data.resetToken)
} catch (error) {
    console.log(error.response)
}
    }
  return (
    <div>
        <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div
          className="card bg-dark text-white"
          style={{ borderRadius: "1rem" }}
        >
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter registered email
              </p>
              <div className="form-outline form-white mb-4">
                <input
                  type="email"
                  id="typeEmailX"
                  className="form-control form-control-lg"
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="typeEmailX">
                  Email
                </label>
              </div>
            
          
              <button
                className="btn btn-outline-light btn-lg px-5"
                onClick={handleSubmit}
              >
                Verify
              </button>
              
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

export default ForgotPassword