import React, { useEffect, useState } from "react";
import axios from 'axios'

import Validate from "../common/validate";
import Valid from "../common/valid";

import "./CreateAccount.scss";

const FormValidate = () => {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [password_confirmation, setPwdConfn] = useState("");
  const [name, setName] = useState("")

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
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "Name is required.",
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required.",
    },
    {
      field: "password_confirmation",
      method: "isEmpty",
      validWhen: false,
      message: "Password confirmation is required.",
    },
    {
      field: "password_confirmation",
      method: "equals",
      args: [password],
      validWhen: true,
      message: "Password and password confirmation do not match.",
    },
  ];

  const [validation, setValidation] = useState(Valid(ValidationRules));

  const data = {
    email: email,
    name: name,
    password: password,
    password_confirmation: password_confirmation,
    validation: validation,
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value)
  }


  const pwdHandler = (event) => {
    setPwd(event.target.value);
  };

  const confirmPwdHandler = (event) => {
    setPwdConfn(event.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const validation = Validate(data, ValidationRules);
    setValidation(validation);
    if (validation.isValid) {
      axios
        .post("http://localhost:8090/auth/signup", data)
        .then((response) => {
            window.location.href='/landPage'
          console.log("signup response", response);
        })
        .catch((err) => {
          console.log("err", err);
        });
      console.log("User has been registered succesfully");
    } else {
      console.log("Invalid input values", validation);
    }
  };

  return (
    <div>
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
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className={validation.name.isInvalid && "has-error"}
            required
            name="name"
            placeholder=""
            onChange={nameHandler}
          />
          <span className={validation.name.isInvalid && "error-message"}>
            {validation.name.message}
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

        <div className="input-div">
          <label htmlFor="password_confirmation">Re-Type Password</label>
          <input
            type="password"
            className={
              validation.password_confirmation.isInvalid && "has-error"
            }
            required
            name="password_confirmation"
            placeholder=""
            onChange={confirmPwdHandler}
          />
          <span
            className={
              validation.password_confirmation.isInvalid && "error-message"
            }
          >
            {validation.password_confirmation.message}
          </span>
        </div>

        <button onClick={formSubmit} className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default FormValidate;
