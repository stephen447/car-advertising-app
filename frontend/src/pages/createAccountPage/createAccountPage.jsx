import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import "./createAccountPage.css";

// Component Imports
import NavBar from "../../components/navBar/navBar";
import CreateAccountFormElement from "../../components/createAccountFormElement/createAccountFormElement";

/**
 * Function which gets the csrf token from the cookies
 * @param {string} name - name of the cookie
 * @returns {string} - the csrf token
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function CreateAccountPage() {
  // State variables of the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  /**
   * This function handles the submission of the register form
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get CSRF cookie
      let csrfToken = getCookie("csrftoken");
      // Make request to login user
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + "users/register/",
        {
          email: email,
          password: password,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      const propertyValues = Object.values(error.response.data.error);
      setError(propertyValues); // Assuming the error message is in the response
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1 className="registerPageTitle">Register Page</h1>
      <div>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <CreateAccountFormElement
              label="Email"
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <CreateAccountFormElement
              label="Username"
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <CreateAccountFormElement
              label="Password"
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="registerButtonHolder">
            <Button
              className="registerButton"
              style={{
                color: "rgb(0, 74, 47)",
                backgroundColor: "rgb(18, 224, 148)",
              }}
              type="submit"
            >
              Register
            </Button>
          </div>

          {error && (
            <div className="error-message">Registration failed: {error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
