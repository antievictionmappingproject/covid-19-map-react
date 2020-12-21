import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl
} from "react-leaflet";
import { defaultMapConfig } from "../utils/constants";
import MarkerClusterGroup from "react-leaflet-markercluster";

function LeafletMap(props) {
  const layers = useSelector(state => state.data.layers);
  const dispatch = useDispatch();

  if (!layers || !layers.length) return <></>;

  return (
    <>
      <LayersControl collapsed={false} position="topright">
        {layers.map(layer => {
          return (
            <LayersControl.Overlay
              key={layer.key}
              name={layer.layerConfig.name}
              checked
            >
              {layer.layerConfig.name === "Housing Justice Actions" ? (
                <Pane
                  name={layer.key}
                  style={{ zIndex: 500 + layer.layerConfig.zIndex }}
                >
                  <MarkerClusterGroup>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      pointToLayer={layer.layerConfig.pointToLayer}
                      onEachFeature={(mapLayer, feature) => {
                        feature.on("click", () => {
                          dispatch({
                            type: "ui:info-window:show",
                            payload: layer.layerConfig.props(feature.feature)
                          });
                        });
                      }}
                    ></GeoJSON>
                  </MarkerClusterGroup>
                </Pane>
              ) : (
                <Pane
                  name={layer.key}
                  style={{ zIndex: 500 + layer.layerConfig.zIndex }}
                >
                  <GeoJSON
                    data={layer.data}
                    style={layer.layerConfig.style}
                    onEachFeature={(feature, mapLayer) => {
                      mapLayer.on("click", () => {
                        dispatch({
                          type: "ui:info-window:show",
                          payload: layer.layerConfig.props(mapLayer.feature)
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

export default props => {
  const position = [defaultMapConfig.lat, defaultMapConfig.lng];
  // Map component id prop may be an anti-pattern
  return (
    <MapContainer zoomControl={false} center={position} zoom={4} id="map">
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <LeafletMap />
    </MapContainer>
  );
};
