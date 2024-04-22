import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import "./profilePage.css";

/**
 * This function retrieves the cookie with a certain name
 * @param {string} name - The name of the cookie
 * @returns {Cookie} - The cookie
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(null); // Profile info object
  const [isEditing, setIsEditing] = useState(false); // Variable for denoting if the user is editing their profile
  const navigate = useNavigate(); // Use useNavigate instead

  /**
   * This fucntion logs the user out and returns the user to the home page
   * @param {event} e  - when handle logout button is clicked
   */
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Get CSRF cookie
      let csrfToken = getCookie("csrftoken");
      // Make request to logout user
      await axios.get("http://localhost:8000/users/logout/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
    // Need to update the navbar and redirect to homepage
    navigate("/"); // Use navigate instead of history.push
  };

  /**
   * This function retrieves the profile info of the user
   */
  useEffect(() => {
    const fetchProfileInfo = async () => {
      let response;
      try {
        // Get CSRF cookie
        const csrfToken = getCookie("csrftoken");
        // Make request to get profile info
        response = await axios.get("http://localhost:8000/users/profile/", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        });
        setProfileInfo(response.data); // Set the info from response
      } catch (error) {
        console.log(error);
      }
    };
    // Call fetchProfileInfo
    fetchProfileInfo();
  }, []);

  /**
   * Function for setting the isEditing variable to true
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Function for setting the isEditing variable to false
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  /**
   * This handles the saving of the updated values for different paramters
   */
  const handleSaveEdit = async () => {
    // Make a request to update the user's information on the server

    try {
      const csrfToken = getCookie("csrftoken");
      const response = await axios.patch(
        "http://localhost:8000/users/register/",
        profileInfo, // Update this with the edited information
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      // Update the local profile information
      setProfileInfo(response.data);
      // Exit edit mode after successful save
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    // Display a confirmation dialog
    //const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    const confirmDelete = true;
    if (confirmDelete) {
      // If the user confirms, proceed with the deletion
      // You can make a request to the server to delete the user's profile here
      // handle logout
      //handleLogout(e);
      try {
        const csrfToken = getCookie("csrftoken");
        await axios.delete("http://localhost:8000/users/register/", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        });
        // Optionally, you can redirect the user to the homepage or perform any other action after deletion
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  let style = {
    color: "rgb(0, 74, 47)",
    backgroundColor: "rgb(18, 224, 148)",
    margin: "10px",
  };
  return (
    <div>
      <NavBar />
      <h1 className="profilePageTitle">Profile Page</h1>
      {profileInfo && (
        <div className="editContainer">
          {isEditing ? (
            <div className="userEditContainer">
              {profileInfo.username && (
                <div className="textFieldContainer">
                  <label>Username:</label>
                  <input
                    className="input"
                    label="Username"
                    value={profileInfo.username}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        username: e.target.value,
                      })
                    }
                    style={{ color: "rgb(0, 74, 47)", margin: "10px" }}
                  />
                </div>
              )}
              {profileInfo.first_name && (
                <div className="textFieldContainer">
                  <label>First Name:</label>
                  <input
                    className="input"
                    label="First Name"
                    value={profileInfo.first_name}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {profileInfo.last_name && (
                <div className="textFieldContainer">
                  <label>Last Name:</label>
                  <input
                    className="input"
                    label="Last Name"
                    value={profileInfo.last_name}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {profileInfo.email && (
                <div className="textFieldContainer">
                  <label>Email:</label>
                  <input
                    className="input"
                    label="Email"
                    value={profileInfo.email}
                    onChange={(e) =>
                      setProfileInfo({ ...profileInfo, email: e.target.value })
                    }
                  />
                </div>
              )}
              {profileInfo.date_of_birth && (
                <div className="textFieldContainer">
                  <label>Date of Birth:</label>
                  <input
                    className="input"
                    label="Date Of Birth"
                    type="date"
                    value={profileInfo.date_of_birth}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {/* Add more editable fields for first name, last name, email, etc. */}
              <Button onClick={handleSaveEdit} style={style}>
                Save
              </Button>
              <Button onClick={handleCancelEdit} style={style}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="userInfoContainer">
                {profileInfo.username && (
                  <div className="userInfo">
                    <h2 className="userAttribute">Username:</h2>
                    <h2 className="userAttributeValue">
                      {profileInfo.username}
                    </h2>
                  </div>
                )}
                {profileInfo.first_name && (
                  <div className="userInfo">
                    <h2 className="userAttribute">First Name:</h2>
                    <h2 className="userAttributeValue">
                      {profileInfo.first_name}
                    </h2>
                  </div>
                )}
                {profileInfo.last_name && (
                  <div className="userInfo">
                    <h2 className="userAttribute">Surname:</h2>
                    <h2 className="userAttributeValue">
                      {" "}
                      {profileInfo.last_name}
                    </h2>
                  </div>
                )}
                {profileInfo.email && (
                  <div className="userInfo">
                    <h2 className="userAttribute">Email:</h2>
                    <h2 className="userAttributeValue"> {profileInfo.email}</h2>
                  </div>
                )}
                {profileInfo.date_of_birth && (
                  <div className="userInfo">
                    <h2 className="userAttribute">Date of Birth:</h2>
                    <h2 className="userAttributeValue">
                      {" "}
                      {profileInfo.date_of_birth}
                    </h2>
                  </div>
                )}
              </div>
              <Button
                className="profileButtton"
                onClick={handleEdit}
                style={style}
              >
                Edit
              </Button>
              <Button
                className="profileButtton"
                onClick={handleLogout}
                style={style}
              >
                Logout
              </Button>
              <Button
                className="profileButtton"
                onClick={handleDelete}
                style={style}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
