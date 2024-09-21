import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./createAccountPage.css";

// Component Imports
import NavBar from "../../components/navBar/navBar";
import CreateAccountFormElement from "../../components/createAccountFormElement/createAccountFormElement";
import Footer from "../../components/footer/footer";

export default function CreateAccountPage() {
  // State variables of the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [DOB, setDOB] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  /**
   * This function handles the submission of the register form
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make request to register user
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + "user/register/",
        {
          email: email,
          password: password,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
    <div className="create-account">
      <NavBar />
      <h1 className="create-account__title">Register Page</h1>
      <div className="create-account__content">
        <form className="create-account__form" onSubmit={handleSubmit}>
          <div className="create-account__form-group">
            <CreateAccountFormElement
              label="Email"
              id="email"
              className="create-account__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="create-account__form-group">
            <CreateAccountFormElement
              label="Username"
              id="username"
              className="create-account__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="create-account__form-group">
            <CreateAccountFormElement
              label="Password"
              id="password"
              className="create-account__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="create-account__button-holder">
            <Button
              className="create-account__register-button"
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
            <div className="create-account__error-message">
              Registration failed: {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
