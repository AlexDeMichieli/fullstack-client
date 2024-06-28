import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {API_URL} from '../config.js'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [initialState, setInitialState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setInitialState({
            ...initialState,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: initialState.name,
                email: initialState.email,
                password: initialState.password
            })
        });

        const result = await response.json();
        if (result){
            navigate('/login')
        }

    };

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-20 space-y-10">
            <TextField
                name='name'
                type="text"
                label="First Name"
                value={initialState.name}
                onChange={handleChange}
                required
                className="w-full max-w-xs"
            />
            <TextField
                name='email'
                type="email"
                label="Email"
                value={initialState.email}
                onChange={handleChange}
                required
                className="w-full max-w-xs"
            />
            <TextField
                name='password'
                type="password"
                label="Password"
                value={initialState.password}
                onChange={handleChange}
                required
                className="w-full max-w-xs"
            />
            <Button type="submit" variant="contained" color="primary" className="w-full max-w-xs">
                Register
            </Button>
        </form>
        { token && <h1>User Registered!</h1>}
        </>
    )
}

export default Register;