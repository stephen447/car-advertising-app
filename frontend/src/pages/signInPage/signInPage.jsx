import React from "react";
import "./signInPage.css";
// Component Imports
import NavBar from "../../components/navBar/navBar";
import SignInForm from "../../components/signInForm/signInForm";

export default function SignInPage() {
  return (
    <div>
      <NavBar></NavBar>
      <SignInForm></SignInForm>
    </div>
  );
}
