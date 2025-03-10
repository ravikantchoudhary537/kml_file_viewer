import React from "react";

const DetailsTable = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <th className="px-6 py-3 text-left text-lg font-semibold">Element Type</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Total Length</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.lineLengths).map(([key, value], index) => (
              <tr key={key} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                <td className="px-6 py-3">{key}</td>
                <td className="px-6 py-3">{value} units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;
