// fetch polyfill for IE
import 'whatwg-fetch';

function handleFetchSuccess(name, data) {
  // dispatch.call(name, null, data);
}

function handleFetchFailure(name, error) {
  // dispatch.call(name, null, error);
}

// export async function getSearchData(str) {
//   let langStr = navigator.language ? `&culture = ${navigator.language}` : '';
//   try {
//     let res = await fetch(
//       `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${str}${langStr}&includeEntityTypes=place&userMapView=-90,-180,90,180&key=${bingApiKey}`
//     );
//     return await res.json();
//   } catch (e) {
//     // dispatch.call("search-fetch-data-reject", this, e);
//   }
// }

// export async function getAutocompleteMapLocation(val) {
//   try {
//     let res = await fetch(
//       `https://dev.virtualearth.net/REST/v1/Locations/${val}?&key=${bingApiKey}`
//     );
//     return res.json();
//   } catch (e) {
//     // dispatch.call("search-fetch-data-reject", this, e);
//   }
// }
