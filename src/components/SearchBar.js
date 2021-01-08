import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import i18next from 'i18next';
import { fetch } from 'whatwg-fetch';

const BING_API_KEY =
  'AiCodebvKHCT2XAWYPvfOIkR9f8EA0AfLBnCmL2TchluJ3kn36befi0DWGzm9fuz';

// async function fetchBingData(searchTerm) {
//   const lang = navigator.language ? `&culture = ${navigator.language}` : '';
//   const url = `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${searchTerm.trim()}${lang}&includeEntityTypes=place&userMapView=-90,-180,90,180&key=${BING_API_KEY}`;
//   try {
//     const res = await fetch(url);
//     const json = await res.json();
//     console.log(json);
//     return json;
//   } catch (e) {
//     throw new Error(`An error occurred fetching Bing data: ${e.message}.`);
//   }
// }

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

function useDebouncedFetch(callback, delay, term) {
  const dispatch = useDispatch();
  // Memoizing the callback because if it's an arrow function
  // it would be different on each render
  const memoizedCallback = useCallback(callback, []);
  const debouncedFn = useRef(debounce(memoizedCallback, delay));

  useEffect(() => {
    debouncedFn.current = debounce(memoizedCallback, delay);
  }, [memoizedCallback, debouncedFn, delay, term]);
}

function SearchBar(props) {
  const { searchTerm, searchResults } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  // const debouncedFetch = useDebounce(val => fetchBingData(val), 1000);

  const onChange = val => {
    dispatch({ type: 'ui:search:term:set', payload: val });
  };

  async function fetchBingData(term) {
    const lang = navigator.language ? `&culture = ${navigator.language}` : '';
    const url = `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${term.trim()}${lang}&includeEntityTypes=place&userMapView=-90,-180,90,180&key=${BING_API_KEY}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      dispatch({ type: 'ui:search:results:set', payload: json });
    } catch (e) {
      throw new Error(`An error occurred fetching Bing data: ${e.message}.`);
    }
  }

  const debouncedOnChange = useDebounce(val => fetchBingData(val), 1000);
  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form id="search-bar-form" onSubmit={e => onSubmit(e)}>
      <div id="search-bar-div">
        <input
          onChange={async e => {
            onChange(e.target.value);
            debouncedOnChange(e.target.value);
          }}
          type="text"
          name="search"
          id="search-bar"
          aria-label="search"
          value={searchTerm}
          list="search-bar-autocomplete"
          autoComplete="off"
          placeholder="Search nation, state, city..."
        />
        <datalist id="search-bar-autocomplete">{/*options go here*/}</datalist>
      </div>
    </form>
  );
}

export default SearchBar;
