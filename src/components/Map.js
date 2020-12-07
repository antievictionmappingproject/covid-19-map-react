import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { defaultMapConfig } from "../utils/constants";
import MarkerClusterGroup from "react-leaflet-markercluster";

function LeafletMap(props) {
  const leafletMap = useMap(); // we can use this to get access to the map object
  const layers = useSelector((state) => state.data.layers);
  const dispatch = useDispatch();

  return (
    <>
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
              checked
            >
              {layer.layerConfig.name === "Housing Justice Actions" ? (
                <Pane style={{ zIndex: 500 + layer.layerConfig.zIndex }}>
                  <MarkerClusterGroup>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      pointToLayer={layer.layerConfig.pointToLayer}
                      onEachFeature={(mapLayer, feature) => {
                        feature.on("click", () => {
                          dispatch({
                            type: "ui:info-window:show",
                            payload: layer.layerConfig.props(feature.feature),
                          });
                        });
                      }}
                    ></GeoJSON>
                  </MarkerClusterGroup>
                </Pane>
              ) : (
                <Pane>
                  <GeoJSON
                    data={layer.data}
                    style={layer.layerConfig.style}
                    onEachFeature={(feature, mapLayer) => {
                      mapLayer.on("click", () => {
                        dispatch({
                          type: "ui:info-window:show",
                          payload: layer.layerConfig.props(mapLayer.feature),
                        });
                      });
                      layer.layerConfig.onEachFeature(feature, mapLayer);
                    }}
                    pointToLayer={layer.layerConfig.pointToLayer}
                  ></GeoJSON>
                </Pane>
              )}
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
      <ZoomControl position="bottomright" />
    </>
  );
}

export default (props) => {
  const position = [defaultMapConfig.lat, defaultMapConfig.lng];
  // Map component id prop may be an anti-pattern
  return (
    <MapContainer zoomControl={false} center={position} zoom={4} id="map">
      <LeafletMap />
    </MapContainer>
  );
};

// fix the z order of the map layers

//   // return a new Map with the correct overlay order
//   const fixOverlayOrder = (dataLayers) => {
//     const layers = new Map(
//       [...dataLayers.entries()].sort(
//         (a, b) => a[1].overlayOrder - b[1].overlayOrder
//       )
//     );

//     return layers;
//   };
