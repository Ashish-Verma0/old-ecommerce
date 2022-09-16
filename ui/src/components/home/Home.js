import React, { useContext } from 'react'
import { Store } from '../../useContext_Hook/Data'
import "../home/Home.css"
import Product from '../products/Products.js'
const Home = () => {
    const{user}=useContext(Store)
    return (
        <div>
            {/* headers */}
            <div className='main'>
                <h4 className='head'>{user.name}</h4>
                <h1 className='head'>Find Amazing product below</h1>
                <div className='head'>
                    <a href='#container'> <button type="button" class="btn btn-success w-25">Scroll</button></a>
                </div>
            </div>
            {/* heading */}
            <h1 className='productHeading'> product features</h1>
            {/* product */}
            <div className='container' id='container'>
                <Product />
            </div>
        </div>
    )
}

export default Home