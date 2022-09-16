import React, { useEffect, useState } from 'react'
import axios from "axios"
import Carousel from 'react-material-ui-carousel'
import ReactStars from "react-rating-stars-component"
import "./ProductDetail.css"
import { useLocation } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import {useCart} from "react-use-cart"

const ProductDetail = () => {
    const location = useLocation()
    const[count,setCount]=useState(1)
    const [product, setProduct] = useState([])

    const getApi = async () => {
        try {
            const res = await axios.get(`http://localhost:8084/api/v1/product/${location?.state}`)
            setProduct(res.data.product)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getApi()
    }, [])

    console.log(product)

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    const increment=()=>{
        if(product.stock<=count) return;
        setCount(count+1)
    }
    const decrement=()=>{
        if(count>0){
            setCount(count-1)

        }
    }

    const {addItem} = useCart();

    return (
        <>
            <div className='productDetail'>
                <div>
                    <Carousel>
                        {product?.images && product?.images?.map((item, i) => {
                            <img className='carouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        })}
                    </Carousel>
                </div>


                <div>
                    <div className='detailsBlock-1'>
                        <h1>{product.name}</h1>
                        <p>Product # {product._id}</p>
                    </div>

                    <div className='detailsBlock-2'>
                        <ReactStars  {...options} />
                        <span>{product.numOfReviews} Reviews</span>
                    </div>

                    <div className='detailsBlock-3'>
                        <h1>{product.price}</h1>
                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button onClick={decrement}>-</button>
                                <input readOnly value={count} type="number" />
                                {/* <div>{count}</div> */}
                                <button onClick={increment}>+</button>
                            </div>
                            <button onClick={()=>addItem(product)}>Add to cart</button>
                        </div>

                        <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className='detailsBlock-4'>
                        <p>  Description:{product.description}</p>
                    </div>
                    <button className='submitReview'>Submit Reviews</button>
                </div>

                
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews && product.reviews.map((review) => {
                        <ReviewCard reviews={review} />
                    })}
                </div>
            ) : (
                <p>No reviews yet</p>
            )}
        </>
    )
}

export default ProductDetail