import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../useContext_Hook/Data'
import "../user/UserAccount.css"

const UserAccount = () => {
    const{user}=useContext(Store)
  return (
    <>
    {/* <MetaData title={`${user.name}'s Profile`}/> */}
    <div className='profileContainer'>
        <div>
            <h1> My Profile </h1>
            <img src={user?.avatar?.url} alt={user?.name}/>
            <Link to="/me/update">Edit Profile</Link>
        </div>

        <div>

<div>
    <h4>Full Name</h4>
    <p>{user?.name}</p>
</div>
<div>
    <h4>Email</h4>
    <p>{user?.email}</p>
</div>
<div>
    <h4>Joined on</h4>
    <p>{String(user?.createdAt).substring(0,10)}</p>
</div>

<div>
    <Link to="/orders">My Orders</Link>
    <Link to="/password/update">Change Password</Link>
</div>

        </div>
    </div>
    </>
  )
}

export default UserAccount