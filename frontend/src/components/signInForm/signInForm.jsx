import React, { useState } from "react";
import "./signInForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../request";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}user/login/`;
      const refreshURL = `${process.env.REACT_APP_API_BASE_URL}user/refresh/`;
      const requestOptions = {
        method: "POST",
        data: {
          username: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await apiRequest(url, refreshURL, requestOptions);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginSuccess(false);
    }
  };

  const handleDemoSignIn = async () => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}user/login/`;
      const refreshURL = `${process.env.REACT_APP_API_BASE_URL}user/refresh/`;
      const requestOptions = {
        method: "POST",
        data: {
          username: "demoUser",
          password: "1234",
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await apiRequest(url, refreshURL, requestOptions);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginSuccess(false);
    }
  };

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <button className="sign-in__button" onClick={handleDemoSignIn}>
        Sign In as Demo
      </button>
      <div>
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <label className="sign-in__label">Email:</label>
          <input
            className="sign-in__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label className="sign-in__label">Password:</label>
          <input
            className="sign-in__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="sign-in__button" type="submit">
            Sign In
          </button>
          {!loginSuccess ? (
            <div className="sign-in__error">
              <p>Login Unsuccessful. Incorrect Password or Username.</p>
            </div>
          ) : (
            <></>
          )}
          <br />
        </form>
      </div>
      <div className="register">
        <h2> Don't have an account, sign up today!</h2>
        <Link to="/register">
          <button className="register__button">Register</button>
        </Link>
      </div>
    </div>
  );
}
