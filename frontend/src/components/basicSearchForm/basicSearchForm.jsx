import "./basicSearchForm.css"; // CSS file
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BasicSearchForm() {
  // State variables
  const [ManufacturerOptions, setManufacturerOptions] = useState([]);
  const [ModelOptions, setModelOptions] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(2024);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [disableModelOptions, setDisableModeloptions] = useState(true);
  const navigate = useNavigate();

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
          setDisableModeloptions(newModelOptions.length === 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getModels();
  }, [manufacturer]);

  const makeOption = function (option) {
    return (
      <option className="basic-search-form__option" value={option}>
        {option}
      </option>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minPrice > maxPrice || minYear > maxYear) {
      console.log("Invalid Form");
      return;
    }

    const queryParams = new URLSearchParams({
      manufacturer,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    });

    navigate(`/results?${queryParams.toString()}`);
  };

  const handleManufacturerChange = (e) => {
    e.preventDefault();
    setManufacturer(e.target.value);
    setModel("");
  };

  const handleModelChange = (e) => {
    e.preventDefault();
    setModel(e.target.value);
  };

  return (
    <div className="basic-search-form">
      <h1>Search for cars for sale</h1>
      <form onSubmit={handleSubmit}>
        <div className="basic-search-form__select-group">
          <select
            className="basic-search-form__form-select"
            onChange={handleManufacturerChange}
          >
            <option value="">Select a Manufacturer</option>
            {ManufacturerOptions.map(makeOption)}
          </select>
          <select
            className="basic-search-form__form-select"
            disabled={disableModelOptions}
            onChange={handleModelChange}
          >
            <option value="">Select a Model</option>
            {ModelOptions.map(makeOption)}
          </select>
        </div>

        <div className="basic-search-form__select-group">
          <input
            type="number"
            className="basic-search-form__form-select"
            min="1900"
            max="2023"
            onChange={(e) => setMinYear(e.target.value)}
            defaultValue={1900}
          />
          <input
            type="number"
            className="basic-search-form__form-select"
            min="1900"
            max="2023"
            onChange={(e) => setMaxYear(e.target.value)}
            defaultValue={2023}
          />
        </div>

        <div className="basic-search-form__select-group">
          <input
            type="number"
            className="basic-search-form__form-select"
            min="0"
            max="999999"
            onChange={(e) => setMinPrice(e.target.value)}
            defaultValue={0}
          />
          <input
            type="number"
            className="basic-search-form__form-select"
            min="0"
            max="999999"
            onChange={(e) => setMaxPrice(e.target.value)}
            defaultValue={999999}
          />
        </div>

        <div className="basic-search-form__select-group">
          <button className="basic-search-form__submit-button" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
