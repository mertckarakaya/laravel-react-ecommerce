import React from 'react';
import Login from "./Login";
import Register from "./Register";
import './Auth.css';

const Auth = () => {
  return (
    <React.Fragment>
        <section className="account-page">
        <div className="container">
            <div className="account-wrapper">
                <Login />
                <Register />
            </div>
        </div>
    </section>
    </React.Fragment>
  )
}

export default Auth