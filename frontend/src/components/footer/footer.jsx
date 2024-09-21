import React from "react";
import "./footer.css";
import email from "../../media/images/footer-email.svg";
import linkedIn from "../../media/images/linkedIn.svg";
import github from "../../media/images/github.svg";

export default function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__header">Car Change</h2>
      <div className="socialElement">
        <a href="mailto: sdavidbyrne@gmail.com">
          {" "}
          <img alt="" className="socialIcons" src={email} />
        </a>
      </div>
      <div className="socialElement">
        <a
          href="https://www.linkedin.com/in/stephen-byrne-b4729321b/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="socialIcons" alt="" src={linkedIn} />
        </a>
      </div>
      <div className="socialElement">
        <a
          href="https://github.com/stephen447"
          target="_blank"
          rel="noreferrer"
        >
          <img className="socialIcons" alt="" src={github} />
        </a>
      </div>
    </div>
  );
}
