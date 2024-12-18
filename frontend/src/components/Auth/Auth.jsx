import React from 'react';
import Login from "./Login";
import Register from "./Register";
import MetaDecorator from "../utils/MetaDecorator/MetaDecorator.jsx";
import './Auth.css';


const Auth = () => {
  return (
    <React.Fragment>
        <MetaDecorator title='Login - Register Page' description='Login - Register Page'/>
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