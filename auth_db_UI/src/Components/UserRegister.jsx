import { useState } from "react";
import { API_URL } from "../api";
import "./UserRegister.css";
import { Link } from "react-router-dom";

function UserRegister(){
    const [formValues,setFormValues] = useState({
        name:'',
        email:'',
        password:''
    });
    const [message,setMessage] = useState('');
    const [isError,setIsError] = useState(false);
    const createUser = async () =>{
        try {
            const response = await fetch(API_URL,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(formValues)
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || `HTTP error! Status: ${response.status}`);
            }
            setMessage(result.message);
            setIsError(false);
            return true;
        } catch(error){
            setMessage(error.message);
            setIsError(true);
            return false;
        }
       }
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({
            ...formValues,
            [name]:value
        })
      
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        const success = await createUser();
        if (success) {
            setFormValues({
                name:'',
                email:'',
                password:''
            })
        }
    }
    return (
        <div className="user-register">
            <form className="register-card" onSubmit={handleRegister}>
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Fill in your details to get started</p>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    id="name"
                    placeholder="Enter Your Name"
                    value={formValues.name}
                    onChange={handleChange}
                    name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={formValues.email}
                    onChange={handleChange}
                    name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={formValues.password}
                    onChange={handleChange}
                    name="password"
                    />
                </div>

                {message && (
                    <p className={`form-message ${isError ? 'error' : 'success'}`}>{message}</p>
                )}

                <button type="submit" className="register-btn">Register</button>

                <p className="login-text">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    )
}
export default UserRegister;