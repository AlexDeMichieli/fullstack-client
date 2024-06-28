import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {API_URL} from '../config.js'

const LoginForm = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initialState, setInitialState] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: initialState.email,
                    password: initialState.password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const result = await response.json();
            console.log(result);

            if (result.accessToken) {
                setIsLogged(true);
                setLoading(false);
                localStorage.setItem('token', result.accessToken);
                navigate('/'); // Redirect to home page
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            setError(error);
            setLoading(false);
            setIsLogged(false);
            localStorage.removeItem('token');
        }
    };

    const handleChange = (event) => {
        setInitialState({
            ...initialState,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-20 space-y-10">
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
                <Button type="submit" variant="contained" color="primary" className="w-full max-w-xs" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
            {error && <h2 className='mt-10 text-center text-red-500'>{error.message}</h2>}
        </>
    );
};

export default LoginForm;
