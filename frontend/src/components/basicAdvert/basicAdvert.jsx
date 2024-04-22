import React from "react";
import "./basicAdvert.css"; // CSS file

const BasicAdvert = ({
  manufacturer,
  model,
  year,
  price,
  mileage,
  color,
  id,
}) => {
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
      </div>
    </a>
  );
};

export default BasicAdvert;
