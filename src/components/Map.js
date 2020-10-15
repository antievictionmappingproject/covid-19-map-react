import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Map, TileLayer, GeoJSON } from "react-leaflet";

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-126.21093749999999, 41.50857729743935],
            [-110.390625, 41.50857729743935],
            [-110.390625, 47.517200697839414],
            [-126.21093749999999, 47.517200697839414],
            [-126.21093749999999, 41.50857729743935],
          ],
        ],
      },
    },
  ],
};

const LeafletMap = (props) => {
  const geojson = useSelector((state) => state.data.geojson);

  const position = [51.505, -0.09];
  // Map component id prop may be an anti-pattern
  return (
    <Map center={position} zoom={13} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />

      {geojson.map((data) => (
        <GeoJSON data={data} />
      ))}
    </Map>
  );
};

export default LeafletMap;
