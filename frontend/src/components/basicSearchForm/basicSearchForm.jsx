import "./basicSearchForm.css"; // CSS file
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BasicSearchForm() {
  // State variables
  // Options for the manufacturers and models in the form
  const [ManufacturerOptions, setManufacturerOptions] = useState([]);
  const [ModelOptions, setModelOptions] = useState([]);
  // Form parameters
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  // Disbale model state variable for the form - only availible when the manufacturer is selected
  const [disableModelOptions, setDisableModeloptions] = useState(true);
  const navigate = useNavigate(); // Use useNavigate to redirect to a new page

  /**
   * This function will retrieve the manufacturers available from the backend
   */
  useEffect(() => {
    const getManufacturers = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "adverts/manufacturers/"
        );
        setManufacturerOptions(response.data);
        setManufacturer("");
      } catch (error) {
        console.log(error);
      }
    };
    getManufacturers();
  }, []);

  /**
   * This function will retrieve the models available for a given manufacturer from the backend. It update on page load and whenever manufacturer is changed
   */
  useEffect(() => {
    const getModels = async () => {
      try {
        if (manufacturer !== undefined) {
          const response = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
              `adverts/models?manufacturer=${manufacturer}`
          );
          const newModelOptions = response.data;
          setModelOptions(newModelOptions);
          console.log("made ittt");
          console.log(newModelOptions);
          setDisableModeloptions(newModelOptions.length === 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getModels();
  }, [manufacturer]);

  /**
   * Creates a select option for the form
   * @param {String} option - the value for the option to be created
   * @returns the selct option
   */
  const makeOption = function (option) {
    return (
      <option className="formOption" value={option}>
        {option}
      </option>
    );
  };

  /**
   * This function will handle to API call to the backend to get the adverts for the given search form
   * @param {Event} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (minPrice > maxPrice || minYear > maxYear) {
      console.log("Invalid Form");
      return;
    }

    // Create the query parameters
    const queryParams = new URLSearchParams({
      manufacturer,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    });

    //Navigate
    navigate(`/results?${queryParams.toString()}`); // Use navigate instead of history.push
  };

  /**
   * This function will update the manufacturer value when the user selects a manufacturer
   * @param {Event} e
   */
  const handleManufacturerChange = (e) => {
    e.preventDefault();
    setManufacturer(e.target.value);
    setModel("");
  };

  /**
   * This function will update the model value when a user selects a model
   * @param {Event} e
   */
  const handleModelChange = (e) => {
    console.log("Model changed");
    e.preventDefault();
    setModel(e.target.value);
  };

  return (
    <div className="basicSearchForm">
      <h1>Search for cars for sale</h1> {/* Header */}
      <form onSubmit={handleSubmit} className="basicSearchForm">
        {/* Form */}

        <div className="basicSearchForm__selectGroup">
          {" "}
          {/* Select Group for the manufacturer and model select options*/}
          <select
            className="basicSearchForm__formSelect"
            onChange={handleManufacturerChange}
          >
            <option value="">Select a Manufacturer</option>
            {ManufacturerOptions.map(makeOption)}
          </select>
          <select
            className="basicSearchForm__formSelect"
            disabled={disableModelOptions}
            onChange={handleModelChange}
          >
            <option value="">Select a Model</option>
            {ModelOptions.map(makeOption)}
          </select>
        </div>

        <div className="basicSearchForm__selectGroup">
          {/* Select Group for the minimum and maximum year select options*/}
          <input
            type="number"
            className="basicSearchForm__formSelect"
            min="1900"
            max="2023"
            onChange={(e) => setMinYear(e.target.value)}
            defaultValue={1900}
          />
          <input
            type="number"
            className="basicSearchForm__formSelect"
            min="1900"
            max="2023"
            onChange={(e) => setMaxYear(e.target.value)}
            defaultValue={2023}
          />
        </div>

        <div className="basicSearchForm__selectGroup">
          {/* Select Group for the minimum and maximum price select options*/}
          <input
            type="number"
            className="basicSearchForm__formSelect"
            min="0"
            max="999999"
            onChange={(e) => setMinPrice(e.target.value)}
            defaultValue={0}
          />
          <input
            type="number"
            className="basicSearchForm__formSelect"
            min="0"
            max="999999"
            onChange={(e) => setMaxPrice(e.target.value)}
            defaultValue={999999}
          />
        </div>

        <div className="basicSearchForm__selectGroup">
          {/* Submit button*/}
          <button className="basicSearchForm__submitButton" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
