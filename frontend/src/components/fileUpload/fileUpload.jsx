import React, { useState } from "react";
import "./fileUpload.css"; // CSS file

const FileUpload = ({ handleImageChange, selectedFiles }) => {
  //const [selectedFiles, setSelectedFiles] = useState(null);

  //   const handleImageChange = (event) => {
  //     setSelectedFiles(event.target.files);
  //     console.log(event.target.files); // Logs the files
  //   };
  console.log(selectedFiles);
  const handleUploadClick = (event) => {
    event.preventDefault();
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        multiple
        onChange={handleImageChange}
      />
      {/* Custom button */}
      <button
        className="fileUpload__button--upload"
        onClick={handleUploadClick}
      >
        Upload Files
      </button>

      {/* Display the number of files selected */}
      {selectedFiles && <p>{selectedFiles.length} file(s) selected</p>}
    </div>
  );
};

export default FileUpload;
