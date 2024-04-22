import React from "react";
import "./completeAdvert.css"; // CSS file
import ImageSlider from "../imageSlider/imageSlider";

const CompleteAdvert = (advertisement) => {
  advertisement = advertisement.advertisement;
  return (
    <div className="advert-container">
      <div className="advert-title">
        {" "}
        {/* Advert title*/}
        <h1>
          {advertisement.make} {advertisement.model} ({advertisement.year})
        </h1>
        <h1 className="advert-price">€{advertisement.price}</h1>
      </div>
      <div className="advert-picture">
        {" "}
        {/* Advert pictures */}
        <ImageSlider images={advertisement.images} />
      </div>
      <h2 className="advert-details-title">Details</h2> {/* Advert details */}
      <div className="advert-details">
        <p className="advert-detail">Engine: {advertisement.fuel_type}</p>
        <p className="advert-detail">Mileage: {advertisement.mileage} km</p>
        <p className="advert-detail">
          Transmission: {advertisement.transmission}
        </p>
        <p className="advert-detail">Year: {advertisement.year}</p>
      </div>
      <h2 className="advert-details-title">Description</h2>{" "}
      {/* Advert description */}
      <div className="advert-description">{advertisement.description}</div>
    </div>
  );
};

export default CompleteAdvert;
