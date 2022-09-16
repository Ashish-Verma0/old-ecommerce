import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const SearchProduct = () => {
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1);
    const [product, setProduct] = useState([])

    const getApi = async () => {
        try {
            const res = await axios.get(`http://localhost:8084/api/v1/products?keyword=${location.state}&page=${page}`)
            setProduct(res.data.products)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getApi()
    }, [page])

    const move = (_id) => {
        return navigate(`/productDetail`, { state: _id })
    }
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(page)
    };
    return (
        <div>
            <div className='productBody'>
                {product.map((elem, index) => {
                    const { name, price, numOfReviews, images, _id } = elem;
                    return (
                        <div onClick={() => move(_id)}>
                            <div key={index}>
                                <div className="card" style={{ width: "300px" }}>
                                    <img src={images[0].url} className="card-img-top" alt={images[0].url} />
                                    <div className="card-body">
                                        <h5 className="card-title">{name}</h5>
                                        <p className="card-text">
                                            <ReactStars {...options} />
                                            <span>(`{numOfReviews} Reviews`)</span>
                                        </p>
                                        <h5 className="card-title">{price}</h5>

                                        <div className="btn btn-primary">Go somewhere</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Stack spacing={2}>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
        </div>
    )
}

export default SearchProduct