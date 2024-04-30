import React, { useState } from "react";
import "./signInForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

  /**
   * Sends request to the backend to log in a user
   * @param {*} e - event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get CSRF cookie
      let csrfToken = getCookie("csrftoken");
      // Make request to login user
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "users/login/",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Redirect to the home page
        window.location.replace(process.env.REACT_APP_API_BASE_URL + "profile");
      }
    } catch (error) {
      console.log(error);
      setLoginSuccess(false);
    }
    // Reload the page to update the task bar to contain the username
    //window.location.reload();
  };
  return (
    <div className="signIn">
      <h2>Sign In</h2>
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
