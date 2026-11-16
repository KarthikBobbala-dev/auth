import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";
import { LOGIN_URL } from "../api";

function Login(){
    const [loginValues, setLoginValues] = useState({
        email:'',
        password:''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name,value} = e.target;
        setLoginValues({
            ...loginValues,
            [name]:value
        })
    }
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
        const response = await fetch(LOGIN_URL, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginValues)
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    } catch (error) {
        setMessage(error.message);
    }
    }
    return (
        <div className="user-register">
            <form className="register-card" onSubmit={handleLogin}>
                <h2 className="register-title">Welcome Back</h2>
                <p className="register-subtitle">Login to continue to your account</p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={loginValues.email}
                    name="email"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={loginValues.password}
                    name="password"
                    onChange={handleChange}
                    />
                </div>

                {message && <p className="form-message error">{message}</p>}

                <button type="submit" className="register-btn">Login</button>

                <p className="login-text">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    )
}
export default Login;
