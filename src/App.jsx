import React, { useState } from "react";
import { parseKML } from "./utils/parseKML";
import MapView from "./components/MapView";
import SummaryTable from "./components/SummaryTable";
import DetailsTable from "./components/DetailsTable";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [kmlData, setKmlData] = useState({
    elements: { Point: 0, LineString: 0, MultiLineString: 0, Polygon: 0 },
    lineLengths: { LineString: 0, MultiLineString: 0 },
    coordinates: { points: [], lines: [], polygons: [] },
  });

  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsedData = parseKML(e.target.result);
        setKmlData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">KML Viewer</h1>

        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-lg p-1 mb-4 cursor-pointer hover:border-blue-500 transition-all">
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />  
        <div className="text-center">
          <p className="text-gray-600">{selectedFile ? `${selectedFile.name}` : "Click to upload a KML file"}</p>
          <p className="text-sm text-gray-400">Only .kml files are supported</p>
        </div>
      </label>


        <div className="flex justify-center gap-4 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setShowSummary(!showSummary)}
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => setShowDetailed(!showDetailed)}
          >
            {showDetailed ? "Hide Detailed" : "Show Detailed"}
          </button>
        </div>

        <div className="flex gap-2 justify-evenly items-center">
          {/* Summary Table */}
          {showSummary && <SummaryTable data={kmlData} />}

          {/* Detailed Table */}
          {showDetailed && <DetailsTable data={kmlData} />}
        </div>
        <MapView kmlData={kmlData} />
      </div>
    </div>
  );
};

export default App;
