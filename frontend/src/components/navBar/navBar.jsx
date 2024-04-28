import React, { useState, useEffect } from "react";
import "./navBar.css";
import axios from "axios";
//<div className="navbar__container">
//    <a href="/dealers">Dealers</a>
//</div>

/**
 * This function retrieves a cookie
 * @param {string} name  - the name of the cookie which will be got
 * @returns returns the value of the cookie
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

/**
 * This functions retrieves the username of the user- if a user is logged in
 * @returns the username of the user
 */
const getUsername = async () => {
  try {
    // Get CSRF cookie
    let csrfToken = getCookie("csrftoken");
    // Make request to get username
    const response = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "users/getUsername/",
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting username:", error);
    return null;
  }
};

export default function NavBar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get the username of a user if a user is logged in
    const fetchUsername = async () => {
      const user = await getUsername();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <a href="/home">Car Change</a>
        </div>
        <div className="navbar__container">
          <a href="/search">Buy</a>
        </div>

        <div className="navbar__container">
          <a href="/placeadvert">Sell</a>
        </div>
        <div className="navbar__container">
          <a href="/signin">Sign-In</a>
        </div>
        <div className="navbar__container">
          <a href="/profile">{username}</a>
        </div>
      </nav>
    </>
  );
}
