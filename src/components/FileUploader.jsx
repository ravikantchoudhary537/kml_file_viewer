import React from "react";

const FileUploader = ({ setKMLData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const kmlString = e.target.result;
        setKMLData(kmlString);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".kml"
        onChange={handleFileUpload}
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
    </div>
  );
};

export default FileUploader;
