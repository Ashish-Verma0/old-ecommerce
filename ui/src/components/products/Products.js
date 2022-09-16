import React, { useContext, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import axios from "axios"
import "./Product.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Slider } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Product = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState([])
    const [price, setPrice] = useState([0, 125000])
    const [category, setCategory] = useState("Laptop")
    const [ratings, setRatings] = useState(0)
    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8084/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`)


            setProduct(res.data.products)

            console.log(res)

        } catch (error) {
            console.log(error.response)
        }
    }
    React.useEffect(() => {
        getData()
    }, [page, price, category])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(page)
    };
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    const move = (_id) => {
        return navigate(`/productDetail`, { state: _id })
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const categories = [
        { name: "Laptop" },
        { name: "Footwear" },
        { name: "Bottom" },
        { name: "Tops" },
        { name: "Attire" },
        { name: "Camera" },
        { name: "SmartPhones" }
    ]

    console.log(category)

    return (
        <>
            <div className='productBody'>
                {product.map((elem, index) => {
                    const { name, price, numOfReviews, images, _id, category } = elem;
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
                                        <h5 className="card-title">{category}</h5>

                                        <div className="btn btn-primary">Go somewhere</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={0}
                    max={125000}
                />
                <Typography>categories</Typography>
                <ul className='categories'>
                    {categories.map((category) => {
                        const { name } = category;
                        return (
                            <>
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(name)}
                                >
                                    {name}

                                </li>
                            </>
                        )
                    })}
                </ul>
                <fieldset>
                    <Typography component="legend">Rating Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRaing) => setRatings(newRaing)}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay='auto'
                        min={0}
                        max={5}
                    />
                </fieldset>
            </div>

            <Stack spacing={2}>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
        </>
    )
}

export default Product