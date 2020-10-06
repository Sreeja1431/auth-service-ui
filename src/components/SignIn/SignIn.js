import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

import Validate from "../common/validate";
import Valid from "../common/valid";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginFail, setloginFail] = useState(false);

  let ValidationRules = [
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "Email is required.",
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "That is not a valid email.",
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required.",
    },
  ];

  const [validation, setValidation] = useState(Valid(ValidationRules));

  const data = {
    email: email,
    password: pwd,
    validation: validation,
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const pwdHandler = (e) => {
    setPwd(e.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const validation = Validate(data, ValidationRules);
    setValidation(validation);
    if (validation.isValid) {
      axios.post('http://localhost:8090/auth/login', data)
      .then((response)=>{
        window.sessionStorage.setItem("authToken",response.data.authtoken);
        window.location.href='/landPage'
      })
      .catch((error)=>{
        setloginFail(true)
        console.log('Error Login', error);
      })
      console.log("User has been logged in succesfully");
    } else {
      setloginFail(true);
      console.log("Invalid input values", validation);
    }
  };

  return (
    <div id="sign-in">
      <h1>Sign-In Page</h1>
      <div className="sign-in">
        <form className="demoForm">
          <h2>Sign up</h2>

          <div className="input-div">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={validation.email.isInvalid && "has-error"}
              required
              name="email"
              placeholder="john@doe.com"
              onChange={emailHandler}
            />
            <span className={validation.email.isInvalid && "error-message"}>
              {validation.email.message}
            </span>
          </div>
          <div className="input-div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={validation.password.isInvalid && "has-error"}
              required
              name="password"
              placeholder=""
              onChange={pwdHandler}
            />
            <span className={validation.password.isInvalid && "error-message"}>
              {validation.password.message}
            </span>
          </div>

          <button onClick={formSubmit} className="btn btn-primary">
            Log In
          </button>
        </form>
        {loginFail ? <h2>Authentication Failed</h2> : null}

        <div className="login-div">
          <NavLink to="/createAccount">
            Not an existing user! Create Account
          </NavLink>
          {/* <a href='/createAccount'>Not an existing user! Create Account</a> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
