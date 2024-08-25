import React, { useEffect, useState } from "react";
import NavBar from "../navBar/navBar";
import "./completeAdvert.css"; // CSS file
import ImageSlider from "../imageSlider/imageSlider";
import axios from "axios";

const CompleteAdvert = (advertisement) => {
  advertisement = advertisement.advertisement;
  // Get the seller info from seller id in advert
  const [seller, setSeller] = useState({});
  useEffect(() => {
    const fetchSeller = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL +
          "user/getuser/" +
          advertisement.seller +
          "/"
      );
      console.log(response.data);
      setSeller(response.data);
    };
    fetchSeller();
  }, [advertisement.seller_id]);
  return (
    <div className="advert-container">
      <NavBar />
      <div className="advert-title">
        {" "}
        {/* Advert title*/}
        <button
          className="backButton complete-advert__button--back"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h1 className="complete-advert__header">
          {advertisement.make} {advertisement.model} ({advertisement.year})
        </h1>
        <h1 className="advert-price">€{advertisement.price}</h1>
      </div>
      <div className="advert-picture">
        {advertisement.images.length > 0 ? (
          // Render content if there are more than 1 images
          <ImageSlider images={advertisement.images} />
        ) : (
          // Render alternative content if there is only 1 or no image
          <div>{/* Your alternative content here */}</div>
        )}
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
      {/* Seller contact information */}
      <h2 className="advert-details-title">Seller</h2>
      <div className="advert-description">
        <p>Seller: {seller.username}</p>
        <p>Email: {seller.email}</p>
      </div>
    </div>
  );
};

export default CompleteAdvert;
