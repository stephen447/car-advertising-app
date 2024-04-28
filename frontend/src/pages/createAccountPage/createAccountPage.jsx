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
      console.log(password);
      // Get CSRF cookie
      let csrfToken = getCookie("csrftoken");
      // Make request to login user
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + "users/register/",
        {
          email: email,
          password: password,
          date_of_birth: DOB,
          first_name: firstName,
          last_name: surname,
          phone_number: phoneNumber,
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
          <div className="name-group">
            <CreateAccountFormElement
              label="First Name"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <div className="form-group">
              <CreateAccountFormElement
                label="Surname"
                id="surname"
                className="input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <CreateAccountFormElement
              label="Phone Number"
              id="phoneNumber"
              className="input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <CreateAccountFormElement
              label="Date of Birth"
              id="DOB"
              className="input"
              type="date"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
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
