import React, { useEffect, useState } from "react";
import NavBar from "../navBar/navBar";
import "./completeAdvert.css"; // CSS file
import ImageSlider from "../imageSlider/imageSlider";
import axios from "axios";
import mileage from "../../media/images/mileage.svg";
import transmission from "../../media/images/transmission.svg";
import age from "../../media/images/age.svg";
import engine from "../../media/images/engine.svg";
import emailIcon from "../../media/images/email.svg";
import personIcon from "../../media/images/person.svg";

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
    <div className="advert">
      <NavBar />
      <div className="advert__title">
        <button className="backButton" onClick={() => window.history.back()}>
          Back
        </button>
        <h1 className="advert__header">
          {advertisement.make} {advertisement.model} ({advertisement.year})
        </h1>
        <h1 className="advert__price">
          €{Math.round(advertisement.price).toLocaleString()}
        </h1>
      </div>
      <div className="advert__picture">
        {advertisement.images.length > 0 ? (
          <ImageSlider images={advertisement.images} />
        ) : (
          <div>{/* Alternative content here */}</div>
        )}
      </div>
      <h1 className="advert__details-title">Details</h1>
      <div className="advert__details">
        <div className="advert__details-item">
          <img className="advert__details-image" src={engine} alt="Engine" />
          <p className="advert__details-text">{advertisement.fuel_type}</p>
        </div>
        <div className="advert__details-item">
          <img className="advert__details-image" src={mileage} alt="Mileage" />
          <p className="advert__details-text">{advertisement.mileage} km</p>
        </div>
        <div className="advert__details-item">
          <img
            className="advert__details-image"
            src={transmission}
            alt="Transmission"
          />
          <p className="advert__details-text">{advertisement.transmission}</p>
        </div>
        <div className="advert__details-item">
          <img className="advert__details-image" src={age} alt="Year" />
          <p className="advert__details-text">{advertisement.year}</p>
        </div>
      </div>
      <h1 className="advert__details-title">Description</h1>
      <div className="advert__description">{advertisement.description}</div>
      <h1 className="advert__details-title">Seller</h1>
      <div className="advert__details">
        <div className="advert__details-item">
          <img className="advert__details-image" src={emailIcon} alt="Email" />
          <p className="advert__details-text">
            <a href={`mailto:${seller.email}`} className="advert__details-link">
              {seller.email}
            </a>
          </p>
        </div>
        <div className="advert__details-item">
          <img
            className="advert__details-image"
            src={personIcon}
            alt="Seller"
          />
          <p className="advert__details-text">{seller.username}</p>
        </div>
      </div>
    </div>
  );
};

export default CompleteAdvert;
