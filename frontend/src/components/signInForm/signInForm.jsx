import React, { useState } from "react";
import "./signInForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../request";

/**
 * Retrieves the cookie with the given name
 * @param {*} name - name of the cookie
 * @returns the cookie
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function SignInForm() {
  // State to manage input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead

  /**
   * Sends request to the backend to log in a user
   * @param {*} e - event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API URL
      const url = `${process.env.REACT_APP_API_BASE_URL}user/login/`;
      // Refresh URL for getting a new token
      const refreshURL = `${process.env.REACT_APP_API_BASE_URL}user/refresh/`;
      // The request options
      const requestOptions = {
        method: "POST",
        data: {
          username: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent with the request
      };

      // Use the apiRequest function to log the user in
      const response = await apiRequest(url, refreshURL, requestOptions);
      if (response.status === 200) {
        // Redirect to the home page
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors, display error messages, or perform any additional actions
      setLoginSuccess(false);
    }
  };

  const handleDemoSignIn = async () => {
    //e.preventDefault();
    try {
      // API URL
      const url = `${process.env.REACT_APP_API_BASE_URL}user/login/`;
      // Refresh URL for getting a new token
      const refreshURL = `${process.env.REACT_APP_API_BASE_URL}user/refresh/`;
      // The request options
      const requestOptions = {
        method: "POST",
        data: {
          username: "demoUser",
          password: "1234",
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent with the request
      };

      // Use the apiRequest function to log the user in
      const response = await apiRequest(url, refreshURL, requestOptions);
      if (response.status === 200) {
        // Redirect to the home page
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle errors, display error messages, or perform any additional actions
      setLoginSuccess(false);
    }
  };

  return (
    <div className="signIn">
      <h2>Sign In</h2>
      <button className="signInButton" onClick={handleDemoSignIn}>
        Sign In as Demo
      </button>
      <div>
        <form className="signInForm" onSubmit={handleSubmit}>
          <label className="label">Email:</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="signInButton" type="submit">
            Sign In
          </button>
          {!loginSuccess ? (
            <div className="success">
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
          <button className="signInButton">Register</button>
        </Link>
      </div>
    </div>
  );
}
