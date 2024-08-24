import React, { useEffect, useState } from "react";
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
  const [coverPicture, setCoverPicture] = useState([]);
  // useEffect(() => {
  //   const fetchCoverPicture = async () => {
  //     try {
  //       const response = await axios.get(
  //         process.env.REACT_APP_API_BASE_URL + `adverts/advert/${id}`
  //       );
  //       setCoverPicture(response.data.images);
  //     } catch (error) {
  //       console.error("Error fetching cover photo:", error);
  //     }
  //   };

  //   fetchCoverPicture();
  // }, []);
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
          {coverPicture.length > 1 ? (
            // Render content if there are more than 1 images
            <div>
              <img
                src={`data:image/png;base64,${coverPicture[0].image_data}`}
                style={{ maxWidth: "40%", height: "auto" }}
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
