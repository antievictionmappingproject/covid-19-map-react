// fetch polyfill for IE
import 'whatwg-fetch';
import { aempCartoAccount } from './constants';
import { mapLayersConfig } from '../config/map-layers';

const cartoSqlApiBaseUri = `https://${aempCartoAccount}.carto.com/api/v2/sql`;

function handleFetchSuccess(name, data) {
  // dispatch.call(name, null, data);
}

function handleFetchFailure(name, error) {
  // dispatch.call(name, null, error);
}

export async function getCartoData(query, format = 'geojson') {
  const res = await fetch(
    `${cartoSqlApiBaseUri}?q=${window.encodeURIComponent(
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

export async function getAllCartoLayers() {
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
