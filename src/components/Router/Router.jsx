import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Register from '../Register'
import Login from '../Login'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Router