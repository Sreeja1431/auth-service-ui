import React, { useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import InputBox from "../InputBox/InputBox";
import ErrorBox from "../ErrorBox/ErrorBox"

import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [loginFail, setloginFail] = useState(false);

  const [errorStates, setErrorstates] = useState({
    emailErr: false,
    pwdErr: false,
    errorState: false,
  });

  const handleLogin = () => {
    const resultList = [];

    const data = {
      'email': email,
      'password': pwd,
    }
    const err = {};
    if (email === "") {
      resultList.push("Email");
      err.emailErr = true;
    }
    if (pwd === "") {
      resultList.push("Password");
      err.pwdErr = true;
    }

    setErrorstates(err);

    if (resultList.length !== 0) {
      setErrorList(resultList);
      window.scrollTo(0,0);
    } else {
      setErrorList([]);
      axios.post('http://localhost:8090/auth/login', data)
      .then((response)=>{
        console.log('Login Response', response.data.authtoken);
        localStorage.setItem("authToken",response.data.authtoken);
        window.location.href='http://localhost:3000/landPage'
        
        // console.log('Login Response', response);
      })
      .catch((error)=>{
        setloginFail(true)
        console.log('Error Login', error);
      })
    }
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setErrorstates({ ...errorStates, emailErr: false });
  };

  const pwdChangeHandler = (e) => {
    setPwd(e.target.value);
    setErrorstates({ ...errorStates, pwdErr: false });
  };

 
  
  return (
    <div id="sign-in">
      <div className="sign-up">
        {errorList.length !== 0 ? (
          <ErrorBox
            errorMessage="Please correct the following fields"
            errorList={errorList}
          />
        ) : null}
      </div>
      <h1>Sign-In Page</h1>
      <div className="sign-in">
        <form autoComplete="off" component="div">
          <InputBox
            lableText="Email"
            inputType="text"
            maxLen="255"
            isRequired
            errorField={errorStates.emailErr}
            handleChange={emailChangeHandler}
          />
          <InputBox
            lableText="Password"
            inputType="text"
            maxLen="10"
            type="password"
            isRequired
            errorField={errorStates.pwdErr}
            handleChange={pwdChangeHandler}
          />
        </form>
        <div className="login-div">
          <button className="login-button" onClick={handleLogin}>
            <span>Login</span>
          </button>
        </div>
        {loginFail?<h2>Authentication Failed</h2>:null}
     
        
        <div className="login-div">
          <NavLink to="/createAccount">Not an existing user! Create Account</NavLink>
          {/* <a href='/createAccount'>Not an existing user! Create Account</a> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
