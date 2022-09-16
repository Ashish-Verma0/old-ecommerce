import React from 'react'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({ reviews }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: reviews.rating,
        isHalf: true
    }
    return (
        <div className='reviewCard'>
            <img src={"profilePng"} alt="user" />
            <p>{reviews.name}</p>
            <ReactStars {...options} />
            <sapn>{reviews.comment}</sapn>
        </div>
    )
}

export default ReviewCard