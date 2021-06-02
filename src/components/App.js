import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { i18nInit } from '../utils/i18n';
import { Translation } from 'react-i18next';
import { getAllCartoLayers } from '../carto/api';

import Modal from './Modal';
import LoadingIndicator from './LoadingIndicator';
import InfoWindow from './InfoWindow';
import MapCovid19 from './MapCovid19';
import MapOralHistories from './MapOralHistories';
import Titlebox from './Titlebox';
import InfoWindowOralHistory from './InfoWindowOralHistory';
import Navigation from "./Navigation";
import { MapConsumer } from 'react-leaflet';

export default () => {
  const i18nLoaded = useSelector(state => state.content.i18n);
  const dispatch = useDispatch();
  const interviewSelected = useSelector((state) => state.ui.interviewSelected);
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/maps/oral-histories')
    }

    (async () => {
      await i18nInit();
    })();
    return () => null;
  }, []);

  useEffect(() => {
    (async () => {
      const cartoData = await getAllCartoLayers();
      dispatch({ type: 'data:layers', payload: cartoData });
      dispatch({ type: 'ui:loading-indicator:hide' });
    })();

    return () => null;
  }, [dispatch]);
  if (!i18nLoaded) {
    return null;
  }

  return (
    <>
      <Translation>
        {(t, { i18n }) => {
          document.title = t('page-title');
          document
            .querySelector('meta[name="description"]')
            .setAttribute('content', t('titlebox.about-description'));
          return null;
        }}
      </Translation>
      <Switch>
        <Route path="/maps/oral-histories">
          <MapOralHistories />
        </Route>
        <Route path="/maps/covid-19">
          <MapCovid19 />
          <Titlebox />
          <Modal />
          <InfoWindow />
        </Route>
      </Switch>
      <LoadingIndicator />
      {interviewSelected && <InfoWindowOralHistory />}
      <Navigation />
    </>
  );
};

// About: something.com/about
// Maps
// - Oral Histories: something.com/maps/oral-histories
// - Covid 19: something.com/maps/covid-19