import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import i18next from 'i18next';
import { fetch } from 'whatwg-fetch';
import * as styles from '../styles/variables.scss';

/* Bing API Key required.
const BING_API_KEY = <API KEY>;*/
const BING_API_KEY = `AqjKYN_6urDj_gpon9q04BKnthf65hYVpBCEaaY1x60gjkG6hPyvYPAMSzCYqclY`;

function parseBingResults(data) {
  const parsedData = data.resourceSets[0].resources.map(resource => {
    const { name, bbox, point } = resource;
    return { name, bbox, point };
  });

  return parsedData;
}

function getDataIndex(arr, indexValue) {
  return arr.indexOf(indexValue);
}

function useDebounce(callback, delay) {
  // Memoizing the callback because if it's an arrow function
  // it would be different on each render
  const memoizedCallback = useCallback(callback, []);
  const debouncedFn = useRef(debounce(memoizedCallback, delay));

  useEffect(() => {
    debouncedFn.current = debounce(memoizedCallback, delay);
  }, [memoizedCallback, debouncedFn, delay]);

  return debouncedFn.current;
}

function SearchBar() {
  const [selectionIndex, setIndex] = useState(-1);
  const { searchTerm, searchResults } = useSelector(state => state.ui);
  const { layers, marker } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const onSubmit = e => {
    // prevent sumbit in favor of Enter key press
    e.preventDefault();
  };

  const onChange = e => {
    dispatch({ type: 'ui:search:term:set', payload: e.target.value });
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

  const setSearchMarker = (coords, selection) => {
    setIndex(-1);
    dispatch({
      type: 'data:marker',
      payload: {
        coords,
        content: selection,
      },
    });
    dispatch({
      type: 'ui:search:results:set',
      payload: null,
    });
  };

  const handleClick = index => {
    const { name } = searchResults[index];
    const coords = searchResults[index].point.coordinates;

    // set the input
    dispatch({ type: 'ui:search:term:set', payload: name });

    // trigger state changes
    setSearchMarker(coords, name);
    setIndex(-1);
    dispatch({
      type: 'ui:search:results:set',
      payload: null,
    });
  };

  const handleEnterPress = () => {
    let coords, content;
    const resultNames = searchResults.map(result => result.name);
    const name = searchResults[selectionIndex]?.name;

    if (resultNames.includes(name)) {
      coords = searchResults[getDataIndex(resultNames, name)].point.coordinates;
      content = name;

      // set the input
      dispatch({ type: 'ui:search:term:set', payload: name });
    } else {
      coords = searchResults[0].point.coordinates; //first element coords
      content = searchResults[0].name;
    }

    // trigger state changes
    setSearchMarker(coords, content);
    setIndex(-1);
    dispatch({
      type: 'ui:search:results:set',
      payload: null,
    });
  };

  async function fetchBingSearch(term) {
    const lang = navigator.language ? `&culture = ${navigator.language}` : '';
    const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
      term.trim()
    )}${lang}&key=${BING_API_KEY}`;
    try {
      if (term) {
        const res = await fetch(url);
        const json = await res.json();

        //parse through the results to get data
        dispatch({
          type: 'ui:search:results:set',
          payload: parseBingResults(json),
        });
      } else {
        dispatch({ type: 'ui:search:results:set', payload: null });
      }
    } catch (err) {
      throw new Error(`An error occurred fetching Bing data.: ${err.message}. 
      Check that you have a Bing API key.`);
    }
  }

  const debouncedFetch = useDebounce(val => fetchBingSearch(val), 200);

  return (
    <form id="search-bar-form" onSubmit={onSubmit}>
      <div id="search-bar-div">
        <input
          onChange={async e => {
            onChange(e);
            debouncedFetch(e.target.value);
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
              searchResults.map((result, index) => (
                <li
                  key={index}
                  style={
                    selectionIndex === index
                      ? { color: styles.rentStrikeColor }
                      : null
                  }
                  onClick={() => handleClick(index)}
                >
                  {result.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
