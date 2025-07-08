// NOTE: use this module for referencing Leaflet,
// so that any Leaflet plugins are also available
const L = Object.assign(
  {},
  require('leaflet'),
  require('leaflet.markercluster')
);

export const rentStrikeIcon = new L.Icon({
  iconUrl: require('../assets/mapIcons/rent-strike.svg').default,
  shadowUrl: require('../assets/mapIcons/rent-strike.svg').default,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: 'icon-rent-strike',
});

export default L;
