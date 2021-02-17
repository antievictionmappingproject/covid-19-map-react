import { fetch } from 'whatwg-fetch';
import { BING_API_KEY } from './constants';

/**
 *
 * @param {string} searchTerm
 * @return {{name: string, point: Point}[] | null} searchResults
 */
export const fetchBingSearch = async searchTerm => {
  // Get i18n language
  const lang = navigator.language ? `&culture = ${navigator.language}` : '';
  // Build URL
  const url = `https://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
    searchTerm.trim()
  )}${lang}&key=${BING_API_KEY}`;

  try {
    // If there's a search term passed in
    if (searchTerm) {
      // Get results
      const res = await fetch(url);
      const resJson = await res.json();

      // Get useful part of response
      const results = resJson.resourceSets[0].resources;
      // Extract out list of objects with data we can use
      const extractedResults = results.map(resource => {
        const { name, point } = resource;
        return { name, point };
      });
      return extractedResults;
    }
    // If no search term provided, return null
    return [];
  } catch (err) {
    throw new Error(`An error occurred fetching Bing data.: ${err.message}. 
    Check that you have a Bing API key.`);
  }
};
