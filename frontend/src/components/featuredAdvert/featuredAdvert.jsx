import React, { useState, useEffect } from "react";
import "./featuredAdvert.css";
import axios from "axios";
export default function FeaturedAdvert(props) {
  // Feed it props - Manufacturer, Model, Year, Mileage, Price, Main image
  function handleClick() {
    // Redirect to the advert page
    window.location.href = `/advertisement/${props.id}`;
  }
  // Get the cover photo of the advert
  const [coverPhoto, setCoverPhoto] = useState(null);
  const getCoverPhoto = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "adverts/coverPicture/" + props.id
      );
      if (response.status !== 200) {
        console.error("Error getting cover photo:", response);
        return;
      }
      if (response.data == "No cover photo found") {
        return;
      }
      setCoverPhoto(response.data);
    } catch (error) {
      console.error("Error getting cover photo:", error);
    }
  };
  useEffect(() => {
    getCoverPhoto();
  }, []);
  return (
    <div className="individualFeaturedAdvert" onClick={handleClick}>
      <h2> {props.manufacturer}</h2>
      <h3> {props.model}</h3>
      <h4>{props.year}</h4>
      <p>{props.mileage} km</p>
      {coverPhoto && (
        <img
          src={`data:image/png;base64,${coverPhoto?.image_data}`}
          alt="Car"
          style={{ maxWidth: "80%", height: "auto", borderRadius: "10px" }}
        />
      )}
    </div>
  );
}
