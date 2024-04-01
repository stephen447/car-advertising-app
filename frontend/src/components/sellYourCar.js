import React, { useState } from "react";
import "./sellYourCar.css"
import image from"../media/images/testImage.jpg"
import { useNavigate } from "react-router-dom";

export default function SellYourCar () {
    const navigate = useNavigate();

    const redirect = () => {
        // Redirect to the desired route
        navigate("/placeadvert");
    };
    return(
        <div className="sellYourCar">
            <img className="sellYourCarImage" src={image}></img>
            <div className="sellYourCarText">
                <h1>Sell your car</h1>
                <button className="sellYourCarButton" onClick={redirect}>Create Advert</button>
            </div>
        </div> 
    )
    
}
