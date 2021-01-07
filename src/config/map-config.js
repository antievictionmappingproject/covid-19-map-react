import queryString from 'query-string';

const defaultMapConfig = {
  lat: 39.8333333,
  lng: -98.585522,
  z: 3,
  nations: true,
  states: true,
  cities: true,
  counties: true,
  rentStrikes: true,
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
