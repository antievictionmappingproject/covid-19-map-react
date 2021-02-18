import { fetch } from 'whatwg-fetch';
import { BING_API_KEY } from './constants';

const BASE_URL = 'https://dev.virtualearth.net/REST/v1/Locations';

/**
 *
 * @param {string} searchTerm
 * @return {{name: string, point: Point}[] | null} searchResults
 *
 * Returns an object with the name, and a geojson point feature.
 */
export const fetchBingSearch = async (searchTerm, locale) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
  // Build URL
  const url = `${BASE_URL}?q=${encodedSearchTerm}&key=${BING_API_KEY}`;

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
