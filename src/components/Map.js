import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Map,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON
} from "react-leaflet";
import { defaultMapConfig } from "../utils/constants";

const LeafletMap = props => {
  const layers = useSelector(state => state.data.layers);

  const position = [
    defaultMapConfig.lat,
    defaultMapConfig.lng
  ];
  // Map component id prop may be an anti-pattern
  return (
    <Map center={position} zoom={13} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <LayersControl position="topright">
        {layers.map(layer => {
          return (
            <LayersControl.Overlay
              name={layer.layerConfig.name}
              checked
            >
              <Pane
                key={layer.key}
                style={{
                  zIndex: layer.layerConfig.zIndex + 400
                }}
              >
                <GeoJSON
                  data={layer.data}
                  style={layer.layerConfig.style}
                  zIndexOffset={layer.layerConfig.zIndex}
                  onEachFeature={
                    layer.layerConfig.onEachFeature
                  }
                ></GeoJSON>
              </Pane>
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
    </Map>
  );
};

export default LeafletMap;
