import React from "react";
import "./sellYourCar.css";
import image from "../../media/images/car-icon.png";
import { useNavigate } from "react-router-dom";

export default function SellYourCar() {
  const navigate = useNavigate();

  const redirect = () => {
    // Redirect to the desired route
    navigate("/placeadvert");
  };

  return (
    <div className="sell-your-car">
      <img className="sell-your-car__image" src={image} alt="Car Icon" />
      <div className="sell-your-car__text">
        <h1 className="sell-your-car__heading">Sell your car</h1>
        <button className="sell-your-car__button" onClick={redirect}>
          Create Advert
        </button>
      </div>
    </div>
  );
}
