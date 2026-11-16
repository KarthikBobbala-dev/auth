import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../api";
import "./UserRegister.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(()=>{
        const dashboard = async()=>{
            try {
                const response = await fetch(DASHBOARD_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || `HTTP error! Status: ${response.status}`);
                }
                setUser(data.data);
            } catch (err) {
                setError(err.message);
            }
        }
        dashboard();
    },[])

    return(
        <div className="user-register">
            <div className="register-card">
                <h2 className="register-title">Dashboard</h2>
                {error && (
                    <>
                        <p className="form-message error">{error}</p>
                        <p className="login-text">
                            Please <Link to="/login">login</Link> to continue
                        </p>
                    </>
                )}
                {user && (
                    <p className="register-subtitle">Welcome, {user.email}</p>
                )}
            </div>
        </div>
    )
}
export default Dashboard;
