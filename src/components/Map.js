import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Map, TileLayer, Popup, GeoJSON } from "react-leaflet";
import { defaultMapConfig } from "../utils/constants";

const LeafletMap = (props) => {
  const layers = useSelector((state) => state.data.layers);

  const position = [defaultMapConfig.lat, defaultMapConfig.lng];
  // Map component id prop may be an anti-pattern
  return (
    <Map center={position} zoom={13} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />

      {layers.map((layer) => {
        return (
          <GeoJSON
            key={layer.key}
            data={layer.data}
            style={layer.layerConfig.style}
            onEachFeature={layer.layerConfig.onEachFeature}>
          </GeoJSON>
        )})}
    </Map>
  );
};

export default LeafletMap;
