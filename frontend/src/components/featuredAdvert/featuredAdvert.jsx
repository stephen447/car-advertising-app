import React, { useState } from "react";
import "./featuredAdvert.css";
export default function FeaturedAdvert(props) {
  // Feed it props - Manufacturer, Model, Year, Mileage, Price, Main image
  function handleClick() {
    // Redirect to the advert page
    window.location.href = `/advertisement/${props.id}`;
  }
  return (
    <div className="individualFeaturedAdvert" onClick={handleClick}>
      <h2> {props.manufacturer}</h2>
      <h3> {props.model}</h3>
      <h4>{props.year}</h4>
      <p>{props.mileage} km</p>
    </div>
  );
}
