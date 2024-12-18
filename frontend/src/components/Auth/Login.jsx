import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.data.status === true) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        message.success('Giriş Başarılı!');
        if(response.data.data.user.role === 'admin') {
          window.location.href = '/admin';
        }else {
          navigate('/')
        }
      } else {
        message.error('Giriş İşlemi Başarısız!');
        console.log(response.data.error)
      }
    } catch (e) {
      message.error(e.response.data.message);
      console.log(e)
    }
  }
  return (
    <React.Fragment>
      <div className="account-column">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              <span>
                Username or email address <span className="required">*</span>
              </span>
              <input type="text" name="email" onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <span>
                Password <span className="required">*</span>
              </span>
              <input type="password" name="password" onChange={handleInputChange} />
            </label>
          </div>
          <p className="remember">
            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button className="btn btn-sm">Login</button>
          </p>
          <a href="#" className="form-link">
            Lost your password?
          </a>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Login
