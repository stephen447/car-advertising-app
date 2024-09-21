import React, { useEffect, useState } from "react";
import mileageIcon from "../../media/images/mileageDark.svg";
import transmission from "../../media/images/transmission.svg";
import age from "../../media/images/ageDark.svg";
import engine from "../../media/images/engine.svg";
import "./basicAdvert.css";
import axios from "axios";
import colorIcon from "../../media/images/color.svg";

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
          {manufacturer} {model}
        </h2>
        <div className="advert-detail__container">
          <img className="basic-advert-detail__image" src={age} alt="Year" />
          <p className="basic-advert-detail__text">{year}</p>
          <img
            className="basic-advert-detail__image"
            src={mileageIcon}
            alt="Mileage"
          />
          <p className="basic-advert-detail__text">{mileage} km</p>
        </div>
        <div className="advert-detail__container">
          <img
            className="basic-advert-detail__image"
            src={colorIcon}
            alt="Color"
          />
          <p className="basic-advert-detail__text">{color}</p>
        </div>
        <p className="basic-advert__p--price">
          €{Math.round(price).toLocaleString()}
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
