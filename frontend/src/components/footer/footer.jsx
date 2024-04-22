import React from "react";
import "./footer.css"; // CSS file

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__column">
        {" "}
        {/* Left column */}
        <div className="footer__name+logo">
          <h2>Car Change</h2>
          <img></img>
        </div>
        <div className="footer__socials">
          <img></img>
          <img></img>
          <img></img>
        </div>
        <p>Phone: 0838128391</p>
        <p>Email: sdavidbyrne@gmail.com</p>
      </div>

      <div className="footer__column">
        {/*Right column*/}
        <h2>Information</h2>
        <p>Ask us a question</p>
        <p>Careers</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Terms&Conditions</p>
      </div>
    </div>
  );
}
