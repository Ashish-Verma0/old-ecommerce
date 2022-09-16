import React, { useContext, useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial/SpeedDial'
import "../header/Header.css"
import { Store } from '../../../useContext_Hook/Data'
import { SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'
import {Backdrop} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "react-use-cart";
// import SpeedDial from '@mui/material/SpeedDial';

const UserOptions = () => {
  const{totalUniqueItems}=useCart()
  const naviagte=useNavigate()
    const{user}=useContext(Store)
    const [open,setOpen]=useState(false)

    const options=[
      {icon:<ListAltIcon/>, name:"Orders", func:orders},
      {icon:<PersonIcon/>, name:"Profile", func:accounts},
      {icon:<ShoppingCartIcon/>, name:`Cart ${totalUniqueItems}`, func:cart},
      {icon:<ExitToAppIcon/>, name:"Logout", func:logoutUser}
    ]

    if(user.role==="admin"){
      options.unshift(    {icon:<DashboardIcon/>, name:"Dashboard", func:dashboard},)
    }

    function dashboard(){
      naviagte("/dashboard")
    }
    function orders(){
      naviagte("/orders")
    }
    function accounts(){
      naviagte("/account")
    }
    function cart(){
      naviagte("/cart")
    }
    async function logoutUser(){
     try {
      let text="Are you Sure To Logout"
      if(window.confirm(text)==true){
        localStorage.removeItem("token")
       return  naviagte("/")
      }else{
        console.log("cancel")
      }
     } catch (error) {
      console.log(error.response)
     }
    }
  return (
    <div>
      <Backdrop open={open} style={{ zIndex:"10"}}/>
        <SpeedDial
        ariaLabel='SpeedDial tooltip Example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction="down"
        style={{zIndex:"11"}}
        className='speedDial'
        icon={
            <img 
            src={user?.avatar?.url}
            alt={user.name}
            className='speedDialIcon'
            />
        }
        >
          {
            options.map((item)=>(
<SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>

            ))
          }
        </SpeedDial>
    </div>
  )
}

export default UserOptions