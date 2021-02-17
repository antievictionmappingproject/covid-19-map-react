// <SearchBar />
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from '../../styles/variables.scss';

import useDebounce from './hooks/useDebounce';
import { fetchBingSearch } from './bing/api';

export default () => {
  // Internal state
  const [selectionIndex, setIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  // External state
  const { layers, marker } = useSelector(state => state.data);
  const dispatch = useDispatch();

  console.log(searchResults);

  const setSearchMarker = (coords, selection) => {
    dispatch({
      type: 'data:marker',
      payload: {
        coords,
        content: selection,
      },
    });

    // Reset search bar
    setIndex(-1);
    setSearchResults([]);
  };

  const handleClickListItem = index => {
    const { name } = searchResults[index];
    const coords = searchResults[index].point.coordinates;
    setSearchTerm(name);
    setSearchMarker(coords, name);
  };

  const handleEnterPress = () => {
    // List of results names
    const resultNames = searchResults.map(result => result.name);
    // Name of selected search result
    const name = searchResults[selectionIndex]?.name;

    // If the typed name is in the autocomplete
    if (resultNames.includes(name)) {
      // Get selected result coordinates
      const coords = searchResults[resultNames.indexOf(name)].point.coordinates;
      // Set the marker location
      setSearchMarker(coords, name);
      // Set the search term in the search bar
      setSearchTerm(name);
      return;
    }
    // If it's not in the list
    const coords = searchResults[0].point.coordinates;
    const firstResultName = searchResults[0].name;
    setSearchMarker(coords, firstResultName);
    return;
  };

  const onKeyUp = e => {
    if (searchResults) {
      // on arrow down
      if (e.keyCode === 40) {
        if (selectionIndex < searchResults.length - 1) {
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIndex(0);
        }
        // on arrow up
      } else if (e.keyCode === 38) {
        if (selectionIndex > 0) {
          setIndex(prevIndex => prevIndex - 1);
        } else {
          setIndex(searchResults.length - 1);
        }
      }

      // on Enter press
      else if (e.keyCode === 13) {
        handleEnterPress();
      }
    }
  };

  const debouncedSearch = useDebounce(async searchTerm => {
    const searchResults = await fetchBingSearch(searchTerm);
    setSearchResults(searchResults);
  }, 200);

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
            debouncedSearch(e.target.value);
          }}
          onKeyUp={onKeyUp}
          type="text"
          name="search"
          id="search-bar"
          aria-label="search"
          value={searchTerm}
          list="search-bar-autocomplete"
          autoComplete="off"
          placeholder="Search nation, state, city..."
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
                  onClick={() => handleClickListItem(index)}
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
