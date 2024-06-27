import { useState, useEffect } from "react"
import {API_URL} from '../../config.js'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGV4ZEBnbWFpbC5jb20iLCJuYW1lIjoiYWxleCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzE5NTEwMDU2LCJleHAiOjE3MjAxMTQ4NTZ9.f8X_N0bUD9sNxR9Pnw5vNgJgp8ubM5AjM6D3hwEnmfA`
                    }
                })

                const data = await response.json()
                console.log(data)
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts()

    }, [])

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home