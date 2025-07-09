// fetch polyfill for IE
import 'whatwg-fetch';
import { aempCartoAccountV2, cartoApiBaseUrl, cartoApiAccessToken, cartoConnection } from './constants';

const cartoSqlApiBaseUri = `${cartoApiBaseUrl}/v3/maps/${cartoConnection}/query`;
const cartoSqlApiBaseUriV2 = `https://${aempCartoAccountV2}.carto.com/api/v2/sql`;

export async function getCartoData(query, format = 'geojson') {
  const res = await fetch(
    `${cartoSqlApiBaseUri}?q=${window.encodeURIComponent(
      query
    )}&format=${format}`,
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=36000',
		'Authorization': `Bearer ${cartoApiAccessToken}`
      },
    }
  );

  if (!res || !res.ok) {
    throw Error('Unable to fetch Carto data');
  }

  return res.json();
}

export async function getCartoDataV2(query, format = 'geojson') {
  const res = await fetch(
    `${cartoSqlApiBaseUriV2}?q=${window.encodeURIComponent(
      query
    )}&format=${format}`,
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=36000',
      },
    }
  );

  if (!res || !res.ok) {
    throw Error('Unable to fetch Carto data');
  }

  return res.json();
}

export async function getAllCartoLayers(mapLayersConfig) {
  return Promise.all(
    Object.entries(mapLayersConfig).map(([key, layerConfig]) => {
      return (async function () {
        try {
          const data = await getCartoData(layerConfig.query);
          return {
            key,
            layerConfig,
            data,
          };
        } catch (error) {
          // handleFetchFailure("fetch-map-data-reject", error);
        }
      })();
    })
  );
}
