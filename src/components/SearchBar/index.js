// <SearchBar />
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as styles from '../../styles/variables.scss';

import useDebounce from './hooks/useDebounce';
import { fetchBingSearch } from './bing/api';

export default () => {
  // Internal state
  const [selectionIndex, setIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  // External state
  // const { layers, marker } = useSelector(state => state.data);
  const dispatch = useDispatch();

  // Gets the search results if user stops typing
  const debouncedSearch = useDebounce(async searchTerm => {
    const searchResults = await fetchBingSearch(searchTerm);
    setSearchResults(searchResults);
  }, 600);

  const handleItemSelected = ({ name, point }) => {
    // Check if item near to a city

    // Check if item in polygons

    dispatch({
      type: 'data:searchPopup',
      payload: {
        coords: point.coordinates,
        content: name,
      },
    });

    // Reset search bar
    setIndex(-1);
    setSearchResults([]);
  };

  const handleClickListItem = index => {
    const selectedItem = searchResults[index];
    setSearchTerm(selectedItem.name);
    handleItemSelected(selectedItem);
  };

  const handleEnterPress = () => {
    if (searchResults.length > 0) {
      // If user has selected an item with arrow keys
      const selectedItem =
        selectionIndex > -1
          ? // Use selected item
            searchResults[selectionIndex]
          : // Otherwise use first
            searchResults[0];
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
        if (selectionIndex < searchResults.length - 1)
          setIndex(prevIndex => prevIndex + 1);
        else setIndex(0);
        // on arrow up
      } else if (e.keyCode === 38) {
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
