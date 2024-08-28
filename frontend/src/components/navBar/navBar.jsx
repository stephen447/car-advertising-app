import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import image from "../../media/images/car-icon.png";
import { apiRequest } from "../../request";

/**
 * This functions retrieves the username of the user- if a user is logged in
 * @returns the username of the user
 */
const getUsername = async () => {
  try {
    if (localStorage.getItem("profileInfo")) {
      const profileInfo = JSON.parse(localStorage.getItem("profileInfo"));
      return profileInfo.username;
    }
    // Make request to get profile info using apiRequest
    const response = await apiRequest(
      process.env.REACT_APP_API_BASE_URL + "user/data/",
      process.env.REACT_APP_API_BASE_URL + "user/token/refresh/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.username;
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
        setUsername(user);
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <nav className="navbar__container">
        <div className="navbar__button">
          <Link to="/home">
            <img className="home__image" src={image} alt="Home"></img>
          </Link>
        </div>
        <div className="navbar__button">
          <Link to="/search">Buy</Link>
        </div>
        <div className="navbar__button">
          <Link to="/placeadvert">Sell</Link>
        </div>
        <div className="navbar__button">
          <Link to="/signin">Sign-In</Link>
        </div>
        {username && (
          <div className="navbar__button">
            <Link to="/profile">Profile</Link>
          </div>
        )}
      </nav>
    </>
  );
}
