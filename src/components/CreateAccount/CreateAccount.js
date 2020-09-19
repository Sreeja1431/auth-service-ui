import React, { useState } from "react";
import axios from "axios";

import InputBox from "../InputBox/InputBox";
import ErrorBox from "../ErrorBox/ErrorBox";

import "./CreateAccount.scss";

const CreateAccount = () => {
  const [name, setuserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [retypePwd, setRetypePwd] = useState("");
  const [errorList, setErrorList] = useState([]);

  const [errorStates, setErrorstates] = useState({
    nameErr: false,
    emailErr: false,
    pwdErr: false,
    retypePwdErr: false,
    errorState: false,
  });

  const userNameChangeHandler = (e) => {
    setuserName(e.target.value);
    setErrorstates({ ...errorStates, nameErr: false });
  };

  const pwdChangeHandler = (e) => {
    setPwd(e.target.value);
    setErrorstates({ ...errorStates, pwdErr: false });
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setErrorstates({ ...errorStates, emailErr: false });
  };

  const retypePwdChangeHandler = (e) => {
    setRetypePwd(e.target.value);
    setErrorstates({ ...errorStates, retypePwdErr: false });
  };

  const signUp = () => {
    var resultList = [];
    const data = {
      name: name,
      email: email,
      password: pwd,
    };

    const err = {};

    if (name === "") {
      resultList.push("User Name");
      err.nameErr = true;
    }

    if (email === "") {
      resultList.push("Email");
      err.emailErr = true;
    }

    if (pwd === "") {
      resultList.push("Password");
      err.pwdErr = true;
    }

    if (retypePwd === "") {
      resultList.push("Re-Type Password");
      err.retypePwdErr = true;
    } else if (pwd !== retypePwd) {
      resultList.push("Password and Re-type password fields should match");
      err.pwdErr = true;
      err.retypePwdErr = true;
    }

    setErrorstates(err);

    if (resultList.length !== 0) {
      setErrorList(resultList);
      window.scrollTo(0, 0);
    } else {
      setErrorList([]);
      axios
        .post("http://localhost:8090/auth/signup", data)
        .then((response) => {
            window.location.href='http://localhost:3000/landPage'
          console.log("signup response", response);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <div id="sign-up">
      <div className="sign-up">
        {errorList.length !== 0 ? (
          <ErrorBox
            errorMessage="Please correct the following fields"
            errorList={errorList}
          />
        ) : null}
      </div>
      <h1>Sign-Up Page</h1>
      <div className="sign-up">
        <form autoComplete="off" component="div">
          <InputBox
            lableText="User Name"
            inputType="text"
            maxLen="10"
            isRequired
            errorField={errorStates.nameErr}
            handleChange={userNameChangeHandler}
          />
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
          <InputBox
            lableText="Re-type Password"
            inputType="text"
            maxLen="10"
            type="password"
            isRequired
            errorField={errorStates.retypePwdErr}
            handleChange={retypePwdChangeHandler}
          />
        </form>
        <div className="signUp-div">
          <button className="signUp-button" onClick={signUp}>
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
