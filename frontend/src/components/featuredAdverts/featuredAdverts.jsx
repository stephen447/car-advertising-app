import React, { useState, useEffect } from "react";
import FeaturedAdvert from "../featuredAdvert/featuredAdvert";
import "./featuredAdverts.css";
import image from "../../media/images/testImage.jpg";
import axios from "axios";

export default function FeaturedAdverts() {
  // Need to send a request to the back end to generate the featured ads - returns json - manufacturer, model, year, model, mileage, main picture, link to the actual advert
  // then create a map of 10 featured ads.
  /**
   * Send a request to the backend to get the featured adverts
   */
  const [FeaturedAdverts, setFeaturedAdverts] = useState([]);
  useEffect(() => {
    const getFeaturedAdverts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/adverts/featuredadverts/"
        );
        setFeaturedAdverts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedAdverts();
  }, []);
  return (
    <div className="featureAdvertsHolder">
      <h1 className="featureAdvertsHolder__title"> Featured Ads</h1>

      <div className="featureAdvertsHolder__adverts">
        {FeaturedAdverts.map(
          (ad, index) => (
            console.log("ad", ad),
            (
              <FeaturedAdvert
                key={index}
                manufacturer={ad.make}
                model={ad.model}
                year={ad.year}
                mileage={ad.mileage}
                src={image} // Assuming image_url is the key for image URL
              />
            )
          )
        )}
      </div>
    </div>
  );
}
