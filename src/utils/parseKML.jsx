import { xml2js } from "xml-js";

export const parseKML = (kmlString) => {
  try {
    const json = xml2js(kmlString, { compact: true, spaces: 2 });

    const elements = { Point: 0, LineString: 0, MultiLineString: 0, Polygon: 0 };
    const lineLengths = { LineString: 0, MultiLineString: 0 };
    const coordinates = { points: [], lines: [], polygons: [] };

    if (json.kml?.Document?.Placemark) {
      const placemarks = Array.isArray(json.kml.Document.Placemark)
        ? json.kml.Document.Placemark
        : [json.kml.Document.Placemark];

      placemarks.forEach((placemark) => {
        const type = Object.keys(placemark).find((key) =>
          ["Point", "LineString", "MultiLineString", "Polygon"].includes(key)
        );

        if (type) {
          elements[type] += 1;

          if (type === "Point") {
            const rawCoords = placemark.Point.coordinates?._text.trim();
            if (rawCoords) {
              const [lon, lat] = rawCoords.split(",").map(Number);
              coordinates.points.push([lat, lon]);
            }
          }

          if (type === "LineString" || type === "MultiLineString") {
            const rawCoords = placemark[type]?.coordinates?._text.trim();
            if (rawCoords) {
              const coordPairs = rawCoords.split(/\s+/).map((coord) => {
                const [lon, lat] = coord.split(",").map(Number);
                return [lat, lon]; // Leaflet format
              });

              lineLengths[type] += coordPairs.length - 1;
              coordinates.lines.push(coordPairs);
            }
          }

          if (type === "Polygon") {
            const rawCoords =
              placemark.Polygon?.outerBoundaryIs?.LinearRing?.coordinates?._text.trim();
            if (rawCoords) {
              const coordPairs = rawCoords.split(/\s+/).map((coord) => {
                const [lon, lat] = coord.split(",").map(Number);
                return [lat, lon]; // Leaflet format
              });

              coordinates.polygons.push(coordPairs);
            }
          }
        }
      });
    }

    return { elements, lineLengths, coordinates };
  } catch (error) {
    console.error("Error parsing KML:", error);
    return { elements: {}, lineLengths: {}, coordinates: { points: [], lines: [], polygons: [] } };
  }
};
