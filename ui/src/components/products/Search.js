import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "../products/Search.css"
const Search = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler = async (e) => {
        if (keyword.trim()) {
            return navigate(`/search/product/keyword`, { state: `${keyword}` })
        } else {
            alert("product not found")
        }
    }

    return (
        <>
            <div class="container">

                <div class="row height d-flex justify-content-center align-items-center">

                    <div class="col-md-8">

                        <div class="search">
                            <i class="fa fa-search"></i>
                            <input type="text" class="form-control" placeholder="Have a question? Ask Now" onChange={(e) => setKeyword(e.target.value)} />
                            <button class="btn btn-primary" onClick={searchSubmitHandler}>Search</button>
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}

export default Search