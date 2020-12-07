import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import { defaultMapConfig } from "../utils/constants";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default (props) => {
  const layers = useSelector((state) => state.data.layers);
  const dispatch = useDispatch();

  const position = [defaultMapConfig.lat, defaultMapConfig.lng];

  // Map component id prop may be an anti-pattern
  return (
    <MapContainer zoomControl={false} center={position} zoom={4} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <LayersControl collapsed={false} position="topright">
        {layers.map((layer) => {
          console.log(layer)
          return (
            <LayersControl.Overlay
              key={layer.key}
              name={layer.layerConfig.name}
              checked
            >
              <Pane
                // style={{
                //   zIndex: layer.layerConfig.overlayOrder,
                // }}
              >
                {layer.layerConfig.name === "Housing Justice Actions" ? (
                  // For Housing Justice Action Layer, use clusters
                  <MarkerClusterGroup>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      // zIndexOffset={layer.layerConfig.zIndex}
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
                ) : (
                  // For vector layers, don't use clusters
                  <GeoJSON
                    data={layer.data}
                    style={layer.layerConfig.style}
                    zIndexOffset={layer.layerConfig.overlayOrder}
                    onEachFeature={(mapLayer, feature) => {
                      feature.on("click", () => {
                        dispatch({
                          type: "ui:info-window:show",
                          payload: layer.layerConfig.props(feature.feature),
                        });
                      });
                      layer.layerConfig.onEachFeature(mapLayer, feature);
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
    </MapContainer>
  );
};


// fix the z order of the map layers
// const fixZOrder = (dataLayers) => {
//     const layers = Array.from(dataLayers.values()).sort(
//       (a, b) => b.zIndex - a.zIndex
//     );

//     layers.forEach(({ layerGroup }) => {
//       if (this.map.hasLayer(layerGroup)) {
//         layerGroup.bringToFront();
//       }
//     });
//   };

//   // return a new Map with the correct overlay order
//   const fixOverlayOrder = (dataLayers) => {
//     const layers = new Map(
//       [...dataLayers.entries()].sort(
//         (a, b) => a[1].overlayOrder - b[1].overlayOrder
//       )
//     );

//     return layers;
//   };
