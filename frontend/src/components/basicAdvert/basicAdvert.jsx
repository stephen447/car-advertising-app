import React, { useEffect, useState } from "react";
import "./basicAdvert.css"; // CSS file
import axios from "axios";

const BasicAdvert = ({
  manufacturer,
  model,
  year,
  price,
  mileage,
  color,
  id,
}) => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const getCoverPhoto = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "adverts/coverPicture/" + id
      );
      if (response.status !== 200) {
        console.error("Error getting cover photo:", response);
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
    <a href={`/advertisement/${id}`} className="carAdvertLink">
      {" "}
      {/* Link to advert*/}
      <div className="carAdvertisement">
        {" "}
        {/* Basic details */}
        <h2>
          {manufacturer} {model} ({year})
        </h2>
        <p>
          <strong>Mileage:</strong> {mileage}
        </p>
        <p>
          <strong>Color:</strong> {color}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <div>
          {coverPhoto ? (
            // Render content if there are more than 1 images
            <div>
              <img
                src={`data:image/png;base64,${coverPhoto.image_data}`}
                style={{
                  maxWidth: "40%",
                  height: "auto",
                  borderRadius: "10px",
                }}
                alt={`Image ${0}`}
              />
            </div>
          ) : (
            // Render alternative content if there is only 1 or no image
            <div>{/* Your alternative content here */}</div>
          )}
        </div>
      </div>
    </a>
  );
};

export default BasicAdvert;
