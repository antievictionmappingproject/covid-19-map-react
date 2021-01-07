import React, { useState, useEffect } from 'react';
import { getSearchData } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { fetch } from 'whatwg-fetch';

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

async function fetchBingData(searchTerm) {
  const BING_API_KEY =
    'Al2-1GXrd8GzwtSAID3J3LJn-flLLgNWzNtsT5nnSKW8dA2ClgaXXXMQR6WfE6wE';
  const lang = navigator.language ? `&culture = ${navigator.language}` : '';
  const url = `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${"portland"}${lang}&includeEntityTypes=place&userMapView=-90,-180,90,180&key=${BING_API_KEY}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (e) {
    throw new Error(`An error occurred fetching Bing data: ${e.message}.`);
  }
}

function SearchBar(props) {
  const { searchTerm } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const onChange = async e => {
    dispatch({ type: 'ui:search:term:set', payload: e.target.value });
    const data = debounce(fetchBingData(searchTerm), 300);
    console.log(data);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form id="search-bar-form" onSubmit={e => onSubmit(e)}>
      <div id="search-bar-div">
        <input
          onChange={e => onChange(e)}
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
