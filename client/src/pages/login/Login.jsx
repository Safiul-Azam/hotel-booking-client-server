import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css'

const Login = () => {
    const [credentials, setCredentials] = useState({
        userName: undefined,
        password: undefined,
    })
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const navigate = useNavigate()
    const handleLogin = async e => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' })
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login',credentials)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            navigate('/')
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
        }
    }
    console.log(user);
    return (
        <div className="login">
            <div className="lContainer">
                <input
                    type="text"
                    placeholder="User Name"
                    id="userName"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleLogin} className="lButton">
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login;