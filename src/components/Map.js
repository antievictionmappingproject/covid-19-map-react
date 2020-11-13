import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Map,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import {
  defaultMapConfig,
  TOTAL_NUMBER_OF_MAP_LAYERS,
} from "../utils/constants";
import MarkerCluster from "react-leaflet-markercluster";

export default (props) => {
  const layers = useSelector((state) => state.data.layers);
  const dispatch = useDispatch();

  const position = [defaultMapConfig.lat, defaultMapConfig.lng];

  // Map component id prop may be an anti-pattern
  return (
    <Map zoomControl={false} center={position} zoom={4} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <LayersControl collapsed={false} position="topright">
        {layers.map((layer) => {
          return (
            <LayersControl.Overlay
              key={layer.key}
              name={layer.layerConfig.name}
              whenReady={() => {
                dispatch({ type: "ui:loading-indicator:hide" });
              }}
              checked
            >
              <Pane
                style={{
                  zIndex: layer.layerConfig.zIndex + 400,
                }}
              >
                {layer.layerConfig.name === "Housing Justice Actions" ? (
                  // For Housing Justice Action Layer, use clusters
                  <MarkerCluster>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      zIndexOffset={layer.layerConfig.zIndex}
                      pointToLayer={layer.layerConfig.pointToLayer}
                      onEachFeature={(mapLayer, feature) => {
                        feature.on('click', () => {
                          dispatch({type: "ui:info-window:show", payload: layer.layerConfig.props(feature.feature)},)
                        })
                      }}
                    ></GeoJSON>
                  </MarkerCluster>
                ) : (
                  // For vector layers, don't use clusters
                  <GeoJSON
                    data={layer.data}
                    style={layer.layerConfig.style}
                    zIndexOffset={layer.layerConfig.zIndex}
                    onEachFeature={(mapLayer, feature) => {
                      feature.on('click', () => {
                        dispatch({type: "ui:info-window:show", payload: layer.layerConfig.props(feature.feature)},)
                      })
                      layer.layerConfig.onEachFeature(mapLayer, feature)
                    }}
                    pointToLayer={layer.layerConfig.pointToLayer}
                  ></GeoJSON>
                )}
              </Pane>
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
      <ZoomControl position="bottomright" />
    </Map>
  );
};
