'use client'
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'


export default function Login() {

    const initialState = {
        email: '',
        password: ''
    };

    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:3000/api/auth/login', state);
            setState(initialState);
            console.log('Login successful', data)
        } catch (error) {
            if (error.response) {
                console.error('Login failed', error.response.data);
            } else {
                console.error('Something went wrong', error)
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 rounded bg-white shadow" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
                <h2 className="mb-4 text-center">Login</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fs-14 fs-md-6 fw-semibold">Email</label>
                    <input onChange={handleChange} value={state.email} name='email' type="email" className="form-control fs-14 fs-md-6" id="email" placeholder="Enter your email" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label fs-14 fs-md-6 fw-semibold">Password</label>
                    <input onChange={handleChange} value={state.password} name='password' type="password" className="form-control fs-14 fs-md-6" id="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3 fw-semibold">Login</button>

                <div className='d-flex justify-content-between' style={{ fontSize: 13 }}>
                    <p>Don't have an Account?</p>
                    <Link href='/signup' className='text-decoration-underline text-black'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}