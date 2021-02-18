// <SearchBar />
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import * as styles from '../../styles/variables.scss';

import useDebounce from './hooks/useDebounce';
import { fetchBingSearch } from './bing/api';
import { getNearestCity, getPolygonAroundPoint } from './utils';

export default () => {
  // Internal state
  const [selectionIndex, setIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  // External state
  const { layers } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const map = useMap();
  const { t } = useTranslation();

  // Gets the search results if user stops typing
  const debouncedSearch = useDebounce(async searchTerm => {
    const searchResults = await fetchBingSearch(searchTerm);
    setSearchResults(searchResults);
  }, 600);

  const handleItemSelected = ({ name, point }) => {
    console.log(layers);
    const citiesLayer = layers.find(({ key }) => key === 'cities');
    const countiesLayer = layers.find(({ key }) => key === 'counties');
    const statesLayer = layers.find(({ key }) => key === 'states');
    const nationsLayer = layers.find(({ key }) => key === 'nations');

    let selectedFeatureProps;
    let zoomLevel;

    const nearestCity = getNearestCity(point, citiesLayer);
    if (nearestCity) {
      selectedFeatureProps = citiesLayer.layerConfig.props(nearestCity);
      zoomLevel = 10;
    } else {
      const county = getPolygonAroundPoint(point, countiesLayer);
      if (county) {
        selectedFeatureProps = countiesLayer.layerConfig.props(county);
        zoomLevel = 9;
      } else {
        const state = getPolygonAroundPoint(point, statesLayer);
        if (state) {
          selectedFeatureProps = statesLayer.layerConfig.props(state);
          zoomLevel = 6;
        } else {
          const nation = getPolygonAroundPoint(point, nationsLayer);
          if (nation) {
            selectedFeatureProps = nationsLayer.layerConfig.props(nation);
            zoomLevel = 5;
          }
        }
      }
    }

    // Set Infowindow
    dispatch({
      type: 'ui:info-window:show',
      payload: selectedFeatureProps,
    });

    dispatch({
      type: 'data:searchPopup',
      payload: {
        coords: point.coordinates,
        content: name,
      },
    });

    // Pan and Zoom
    map.setView(point.coordinates, zoomLevel);

    // Set search bar
    setIndex(-1);
    setSearchResults([]);
  };

  const handleEnterPress = () => {
    if (searchResults.length > 0) {
      // If user has selected an item with arrow keys
      const selectedItem =
        selectionIndex > -1
          ? // Use selected
            searchResults[selectionIndex]
          : // Otherwise use first result
            searchResults[0];
      setSearchTerm(selectedItem.name);
      handleItemSelected(selectedItem);
    }
  };

  const onKeyUp = e => {
    if (searchResults) {
      // on Enter press
      if (e.keyCode === 13) {
        handleEnterPress();
      }
      // on arrow down
      else if (e.keyCode === 40) {
        // Move cursor
        if (selectionIndex < searchResults.length - 1)
          setIndex(prevIndex => prevIndex + 1);
        else setIndex(0);
        // on arrow up
      } else if (e.keyCode === 38) {
        // Move cursor
        if (selectionIndex > 0) setIndex(prevIndex => prevIndex - 1);
        else setIndex(searchResults.length - 1);
      }
    }
  };

  return (
    <form
      id="search-bar-form"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div id="search-bar-div">
        <input
          onChange={async e => {
            // Set the search term
            setSearchTerm(e.target.value);
            // Fetch results
            await debouncedSearch(e.target.value);
          }}
          onKeyUp={onKeyUp}
          type="text"
          name="search"
          id="search-bar"
          aria-label="search"
          value={searchTerm}
          list="search-bar-autocomplete"
          autoComplete="off"
          placeholder={`🔍 ${t('searchbar.default-value')}`}
        />
        <div>
          <ul id="search-bar-autocomplete">
            {searchResults &&
              searchResults.length > 0 &&
              searchResults.map((result, index) => (
                <li
                  key={index}
                  style={
                    selectionIndex === index
                      ? { color: styles.rentStrikeColor }
                      : null
                  }
                  onClick={() => {
                    const selectedItem = searchResults[index];
                    setSearchTerm(selectedItem.name);
                    handleItemSelected(selectedItem);
                  }}
                >
                  {result.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </form>
  );
};
