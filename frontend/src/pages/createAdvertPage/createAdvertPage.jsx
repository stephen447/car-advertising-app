import "./createAdvertPage.css";
// CreateAdvertForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import "../../components/dragNDrop/dragNDrop";
import DragNDrop from "../../components/dragNDrop/dragNDrop";
import { apiRequest } from "../../request";
import FileUpload from "../../components/fileUpload/fileUpload";

/**
 *
 * @returns
 */
const CreateAdvertPage = () => {
  const navigate = useNavigate();
  // If user is not logged in, redirect to login page
  if (!localStorage.getItem("profileInfo")) {
    navigate("/signin");
  }

  // Form data
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [carData, setCarData] = useState([]);
  const [creationSuccess, setCreationSuccess] = useState(true);
  const [formData, setFormData] = useState({
    description: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    fuel_type: "",
    transmission: "",
    color: "",
    condition: "",
    images: "",
  });
  const fuelTypeOptions = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const transmissionOptions = ["Automatic", "Manual"];
  const colorOptions = [
    "Black",
    "White",
    "Silver",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Brown",
    "Beige",
    "Gold",
    "Burgundy",
    "Navy",
    "Purple",
    "Other",
  ];
  const conditionOptions = ["New", "Used"];
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFormData({ ...formData, images: files });
  };

  /**
   * Function to get the json data for the manufacturers
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("car-list.json"); // Assuming carData.json is in the public folder
        const data = await response.json();
        // Set the response data equal to the the car data hook
        setCarData(data);
        // Get the cars manufacturers in an array
        const options = data.map((car) => car.brand);
        options.sort();
        setManufacturerOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * handleChange function to handle form data selections in the form
   * @param {Event} e - the event whenever an input in the form is changed
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   *
   * @param {*} e
   */
  const handleManufacturerChange = (e) => {
    // Need to set the form data
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Need to update the model options
    // Search through object to find matching brand to equal the models array
    for (let i = 0; i < carData.length; i++) {
      if (carData[i].brand === e.target.value) {
        setModelOptions(carData[i].models);
      }
    }
  };

  /**
   * This function handles the submission of the form to the backend
   * @param {Event} e - the event whenever the form is submitted
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiRequest(
        process.env.REACT_APP_API_BASE_URL + "adverts/advert/",
        process.env.REACT_APP_API_BASE_URL + "user/token/refresh/", // Refresh token URL
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData, // Attach the form data
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Response: ", response);
        // Redirect to the advertisement page
        window.location.href =
          process.env.REACT_APP_BASE_URL + "advertisement/" + response.data.id;
      }
    } catch (error) {
      console.error("Error creating advertisement:", error);
      setCreationSuccess(false);
    }
  };

  /**
   *
   * @param {String} option  - the option for the form as a string e.g. Mercedes-Benz
   * @returns returns and option object to be put into the input of the form
   */
  const makeOption = function (option) {
    return <option value={option}>{option}</option>;
  };

  return (
    <div className="placeAdvertPage">
      <NavBar></NavBar>
      <form className="createAdvertForm" onSubmit={handleSubmit}>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="make">Make:</label>
          <select
            id="make"
            name="make"
            value={formData.make}
            onChange={handleManufacturerChange}
            style={{ color: "rgb(18, 224, 148)" }}
            required
          >
            <option value="">Select a Manufacturer</option>
            {manufacturerOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="model">Model:</label>
          <select
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          >
            <option value="">Select a Model</option>
            {modelOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select a year</option>
            {Array.from({ length: 2025 - 1900 }, (_, index) => (
              <option key={index} value={2024 - index}>
                {2024 - index}
              </option>
            ))}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="mileage">Mileage:</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            min="0"
            max="999999"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            max="999999"
            value={formData.price}
            onChange={handleChange}
            style={{ color: "rgb(18, 224, 148)" }}
            required
          />
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="fuel_type">Fuel Type:</label>
          <select
            type="text"
            id="fuel_type"
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a Fuel type</option>
            {fuelTypeOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="transmission">Transmission:</label>
          <select
            type="text"
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select a Transmission type</option>{" "}
            {transmissionOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="color">Color:</label>
          <select
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          >
            <option value="">Select a Color</option>{" "}
            {colorOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <label htmlFor="condition">Condition:</label>
          <select
            type="text"
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select a condition</option>{" "}
            {conditionOptions.map(makeOption)}
          </select>
        </div>
        <div className="createAdvertForm__inputDiv">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            style={{
              backgroundColor: "rgb(18, 224, 148)",
              color: "rgb(0, 74, 47)",
              borderRadius: "10px",
            }}
            rows={4} // Adjust the number of visible rows as needed
            cols={32} // Adjust the number of visible columns as needed
            required
          />
        </div>
        <>
          <FileUpload
            handleImageChange={handleImageChange}
            selectedFiles={selectedFiles}
          />
        </>
        <DragNDrop />

        <button className="createAdvertForm__button" type="submit">
          Create Advertisement
        </button>
        {!creationSuccess ? (
          <div className="success">
            <p>Failed to create advert.</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default CreateAdvertPage;
