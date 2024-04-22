import React from "react";
import "./searchPage.css";

// Component Imports
import NavBar from "../../components/navBar/navBar";
import AdvancedSearchForm from "../../components/advancedSearchForm/advancedSearchForm";

export default function SearchPage() {
  return (
    <div>
      <NavBar></NavBar>
      <AdvancedSearchForm></AdvancedSearchForm>
    </div>
  );
}
