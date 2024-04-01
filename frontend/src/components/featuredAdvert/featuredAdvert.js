import React, { useState } from "react";
import "./featuredAdvert.css"
export default function FeaturedAdvert (props) {
    // Feed it props - Manufacturer, Model, Year, Mileage, Price, Main image
    return(
        <div className="individualFeaturedAdvert">
            <h2> {props.manufacturer}</h2>
            <h3> {props.model}</h3>
            <img className = "individualFeaturedAdvert_image" src = {props.src}></img>
            <h4>{props.year}</h4>
            <p>{props.mileage} km</p>
        </div>
    )
    
}
