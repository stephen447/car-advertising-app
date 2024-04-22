import React, { useState } from "react";
import "./imageSlider.css";

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
    console.log(currentSlide);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    console.log(currentSlide);
  };

  return (
    <div className="advert-slider">
      <div className="slides">
        <img
          src={`data:image/png;base64,${images[currentSlide].image_data}`}
          style={{ maxWidth: "40%", height: "auto" }}
          alt={`Image ${0}`}
        />
      </div>
      <button className="prev-slide-button" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next-slide-button" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
