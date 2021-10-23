import queryString from 'query-string';

const defaultMapConfig = {
  lat: 45,
  lng: -97,
  z: 4,
  bounds: [
    [0, -160], // lower left
    [80, 0], // upper right
  ],
  states: true,
  cities: true,
  counties: true,
};

// Returns the default config combined with any overrides set in the URL string
export default () => {
  // Get any hash values from the URL
  const parsedHash = queryString.parse(window.location.hash, {
    parseBooleans: true,
  });

  return {
    ...defaultMapConfig,
    // Merge URL hash values to the default values
    ...Object.entries(parsedHash).reduce((acc, [key, value]) => {
      if (key) return { [key]: value, ...acc };
      return acc;
    }, {}),
  };
};
