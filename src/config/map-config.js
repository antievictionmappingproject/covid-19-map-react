import queryString from 'query-string';
/**
 *
 * Check the url hash for params then override map default settings if any are present.
 *
 * Available params are as follows:
 * #lat=<float>&lng=<float>&z=<integer>&states=<boolean>&cities=<boolean>&counties=<boolean>&rentstrike=<boolean>
 *
 */

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

export default () => {
  const parsedHash = queryString.parse(window.location.hash, {
    parseBooleans: true,
  });

  return {
    ...defaultMapConfig,
    ...Object.entries(parsedHash).reduce((acc, [key, value]) => {
      if (key) return { [key]: value, ...acc };
      return acc;
    }, {}),
  };
};
