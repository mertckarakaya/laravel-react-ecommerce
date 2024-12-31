import React, {  useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BASE_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/register`,{
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.data.status === true) {
        message.success("Kayıt işlemi başarılı");
        localStorage.setItem('user', JSON.stringify({
          ...response.data.data.user,
          token: response.data.data.token,
          timestamp: new Date().toLocaleString()
        }));
        if(response.data.data.user.role === "admin") {
          window.location.href = '/admin';
        } else {
          navigate("/");
        }
      } else {
        message.error("Kayıt işlemi başarısız");
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <span>
                Username <span className="required">*</span>
              </span>
              <input type="text" onChange={handleInputChange} name="username"/>
            </label>
          </div>
          <div>
            <label>
              <span>
                Email address <span className="required">*</span>
              </span>
              <input type="email" onChange={handleInputChange} name="email"/>
            </label>
          </div>
          <div>
            <label>
              <span>
                Password <span className="required">*</span>
              </span>
              <input type="password" onChange={handleInputChange} name="password"/>
            </label>
          </div>
          <div className="privacy-policy-text remember">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <a href="#">privacy policy.</a>
            </p>
            <button className="btn btn-sm">Register</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
