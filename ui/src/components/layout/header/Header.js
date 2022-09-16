import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import "../header/Header.css"
const Header = () => {
    return (

        <ReactNavbar
            logo="https://www.lunapic.com/editor/premade/transparent.gif"
            burgerColor="crimson"
            navColor1="#fff5f5"
            burgerColorHover="#900"
            logoWidth="50%"
            logoHoverColor="crimson"
            link1Size="1.2rem"
            link1Color="#121212"
            link1Padding="1vmax"
            link1ColorHover="crimson"
            nav2justifyContent="flex-end"
            link1Margin="1vmax"
            link2Margin="0"
            link3Margin="0"
            link4Margin="1vmax"
            nav3justifyContent="flex-start"
            link1Family="sans-serif"
            link1Text="Home"
            link2Text="Products"
            link3Text="About Us"
            link4Text="Contact Us"
            link1Url="/"
            link2Url="/products"
            link3Url="/about us"
            link4Url="/contact us"
            nav4justifyContent="flex-start"
            searchIconMargin="0.5vmax"
            cartIconMargin="1vmax"
            profileIconMargin="0.5vmax"
            searchIconColor="#121212"
            cartIconColor="#121212"
            profileIconUrl="/login"
            profileIconColor="#121212"
            searchIconColorHover="crimson"
            cartIconColorHover="crimson"
            profileIconColorHover="crimson"
            style={{ height: "4.5vmax" }}
        />

    )
}

export default Header