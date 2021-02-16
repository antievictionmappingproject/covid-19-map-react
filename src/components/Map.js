import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useTranslation } from 'react-i18next';

import getMapConfig from '../config/map-config';

function LeafletMap({ mapConfig }) {
  const layers = useSelector(state => state.data.layers);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if ((!layers || !layers.length) && layers.every(layer => !!layer))
    return <></>;

  return (
    <>
      <LayersControl collapsed={false} position="topright">
        {layers.map(layer => {
          return (
            <LayersControl.Overlay
              key={layer.key}
              name={t(layer.layerConfig.nameI18n)}
              checked={mapConfig[layer.key] === true}
            >
              {layer.layerConfig.name === 'Housing Justice Actions' ? (
                <Pane
                  name={layer.key}
                  style={{ zIndex: 500 + layer.layerConfig.zIndex }}
                >
                  <MarkerClusterGroup>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      pointToLayer={layer.layerConfig.pointToLayer}
                      onEachFeature={(feature, mapLayer) => {
                        mapLayer.on('click', () => {
                          dispatch({
                            type: 'ui:info-window:show',
                            payload: layer.layerConfig.props(mapLayer.feature),
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
                      mapLayer.on('click', () => {
                        dispatch({
                          type: 'ui:info-window:show',
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

export default props => {
  const mapConfig = getMapConfig();

  // Map component id prop may be an anti-pattern
  return (
    <MapContainer
      zoomControl={false}
      center={[mapConfig.lat, mapConfig.lng]}
      bounds={mapConfig.bounds}
      minZoom={3}
      zoom={mapConfig.z}
      id="map"
    >
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <LeafletMap mapConfig={mapConfig} />
    </MapContainer>
  );
};
