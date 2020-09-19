import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "./SignIn.scss";

const LandPage = () => {

  const [name, setuserName] = useState("");
  const [authtoken, setAuthtoken] = useState("");

  // useEffect(()=>{

  //   let auth=localStorage.getItem('authToken');
  //   console.log("auth",auth)
  //   setAuthtoken(auth);

  // },[])

  useEffect(() => {

    if (localStorage.getItem('authToken')) {

      axios
        .post("http://localhost:8090/auth/home", { authtoken: localStorage.getItem('authToken') })
        .then((response) => {
          setuserName(response.data.name);
          console.log("response", response);
        })
        .catch((error) => {
          console.log("logout error", error);
          window.location.href = "http://localhost:3000/signIn";
        });
    } else {
      window.location.href = "http://localhost:3000/signIn";
    }

  }, [])


  const logoutHandler = () => {
    axios
      .post("http://localhost:8090/auth/logout", { authtoken: localStorage.getItem('authToken') })
      .then((response) => {
        console.log("38", response.data)
        localStorage.setItem("authToken", response.data.authtoken);
        window.location.href = "http://localhost:3000/signIn";
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };
  return (
    <div id="sign-in">
      <div className="sign-in">
        <h2>How you doing!!!</h2>
        <h3>{name}</h3>
        <button className="login-button" onClick={logoutHandler}><span>Log out</span></button>
      </div>
    </div>
  );
};

export default LandPage;
