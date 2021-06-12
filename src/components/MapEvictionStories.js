import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Pane,
  GeoJSON,
  ZoomControl,
  Marker,
  Popup,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useTranslation } from 'react-i18next';
import { evictionStoriesConfig as getMapConfig } from '../config/map';
import { fetchAirtableData } from '../reducers/data';
import SearchBar from './SearchBar';
import HouseIcon from './HouseIcon';
import { getAllCartoLayers } from '../carto/api';
import { evictionStoriesLayers } from '../config/map';

function LeafletMap({ mapConfig }) {
  const {
    evictionStoriesLayers: layers,
    evictionStoriesLoaded: loaded,
    searchPopup,
  } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { evictionStoriesInterviews: interviews } = useSelector(
    state => state.data
  );
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!loaded) {
      dispatch({ type: 'ui:loading-indicator:show' });
    }
    (async () => {
      const evictionStoriesCartoData = await getAllCartoLayers(
        evictionStoriesLayers
      );
      dispatch({
        type: 'data:eviction-stories:layers',
        payload: evictionStoriesCartoData,
      });
      dispatch({ type: 'ui:loading-indicator:hide' });
    })();
    dispatch(fetchAirtableData);

    return () => {
      dispatch({
        type: 'ui:eviction-stories-interview:selected',
        payload: null,
      });
    };
  }, []);

  useEffect(() => {
    if (!interviews.length) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      const interview = interviews.find(intv => intv.id === id);
      dispatch({
        type: 'ui:eviction-stories-interview:selected',
        payload: interview,
      });
    }
  }, [interviews, location]);

  // Make sure layers have resolved before rendering map
  if (!layers || !layers.length || layers.some(layer => layer === undefined))
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
                  style={{ zIndex: 200 + layer.layerConfig.zIndex * 2 }}
                >
                  <MarkerClusterGroup>
                    <GeoJSON
                      data={layer.data}
                      style={layer.layerConfig.style}
                      pointToLayer={layer.layerConfig.pointToLayer}
                      onEachFeature={(feature, mapLayer) => {
                        mapLayer.on('click', () => {
                          dispatch({
                            type: 'ui:eviction-stories-interview:selected',
                            payload: null,
                          });
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
                  style={{ zIndex: 200 + layer.layerConfig.zIndex * 2 }}
                >
                  <GeoJSON
                    data={layer.data}
                    style={layer.layerConfig.style}
                    onEachFeature={(feature, mapLayer) => {
                      mapLayer.on('click', () => {
                        dispatch({
                          type: 'ui:eviction-stories-interview:selected',
                          payload: null,
                        });
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
      {interviews.map(interview => {
        return (
          <Marker
            key={interview.id}
            position={[
              interview.fields['Latitude'],
              interview.fields['Longitude'],
            ]}
            icon={HouseIcon}
            eventHandlers={{
              click: e => {
                history.push(`/eviction-stories?id=${interview.id}`);
                dispatch({
                  type: 'ui:info-window:hide',
                });
                dispatch({
                  type: 'ui:eviction-stories-interview:selected',
                  payload: interview,
                });
              },
            }}
          ></Marker>
        );
      })}
      <ZoomControl position="bottomright" />
      <Switch>
        <Route path="/covid-19">
          <SearchBar />
        </Route>
      </Switch>
      {/* Popup for search results */}
      {searchPopup && (
        <Popup position={searchPopup.coords}>{searchPopup.content}</Popup>
      )}
    </>
  );
}

export default () => {
  const mapConfig = getMapConfig();

  // Map component id prop may be an anti-pattern
  return (
    <MapContainer
      zoomControl={false}
      center={[mapConfig.lat, mapConfig.lng]}
      maxBounds={mapConfig.bounds}
      minZoom={3}
      tap={false} // https://github.com/domoritz/leaflet-locatecontrol/issues/280
      zoom={mapConfig.z}
      id="map"
    >
      {/* <MapEvents /> */}
      <TileLayer
        attribution="<a href='https://www.antievictionmap.com/' target='_blank'>Anti-Eviction Mapping Project</a>"
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
      />
      <LeafletMap mapConfig={mapConfig} />
    </MapContainer>
  );
};
