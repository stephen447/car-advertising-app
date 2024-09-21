// ResultsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import BasicAdvert from "../../components/basicAdvert/basicAdvert";
import BackButton from "../../components/backButton/backButton";

import "./resultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  /**
   * Use effect with sends a request to backedn to get the results based on the search parameters
   */
  useEffect(() => {
    // Fetch results based on search parameters
    const fetchResults = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "adverts/search",
          { params: searchParams }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResults();
  }, [location.search]);

  return (
    <div>
      <NavBar />
      <div className="resultsPage__container--header">
        <BackButton />
        <h1 className="header">Search Results</h1>
      </div>

      {results.length === 0 ? (
        <div className="noResultsContainer">
          <h2>No search results found.</h2>
          <BackButton />
        </div>
      ) : (
        // Display search results

        results.map((result) => (
          <BasicAdvert
            manufacturer={result.make}
            model={result.model}
            year={result.year}
            price={result.price}
            color={result.color}
            mileage={result.mileage}
            id={result.id}
          />
        ))
      )}
    </div>
  );
};

export default ResultsPage;
