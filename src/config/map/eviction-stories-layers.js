import L from '../../lib/leaflet';
import {
  strokeWeightLess,
  strokeWeightMore,
  pointRadius,
  fillOpacity,
  policyStrengthLayerClassNames,
} from '../constants';
import { formatDate } from '../../utils/datetime';
import {
  cartoSheetSyncTable,
  cartoCountiesTable,
  cartoStatesTable,
} from '../../carto/constants';

// const colorNoData = '#939393';
// const fillColorCity = '#ed9289';
// const fillColorCounty = '#f2b0aa';
// const fillColorState = '#f6c6c1';
// const strokeColorCity = '#ffffff';
// const strokeColorCounty = '#ffffff';
// const strokeColorState = '#ffffff';

// #FCBBA1
// cities & counties = #FC9272 ?

const colorNoData = '#939393';
const fillColorCity = '#bf2d2d';
const fillColorCounty = '#ce3131';
const fillColorState = '#d24141';
const strokeColorCity = '#ffffff';
const strokeColorCounty = '#ffffff';
const strokeColorState = '#ffffff';



//styling helpers
function highlightFeature(e) {
  const layer = e.target;

  if (e.type === 'mouseover') {
    layer.setStyle({
    fillOpacity: 0.7,
    });
  } else if (e.type === 'mouseout') {
    layer.setStyle({
      fillOpacity: fillOpacity,
    });
  } else {
    return;
  }
}

export const mapLayersConfig = {
  cities: {
    name: 'City Protections',
    nameI18n: 'layer-select-protections-stories.cities',
    type: 'point',
    query: `SELECT
      municipality, state, country, c.range, geom, eviction_status, link, resource, reviewed_date
    FROM ${cartoSheetSyncTable} c
    WHERE geom is not null and admin_scale = 'City' and eviction_status is not null and eviction_status <> ''
    ORDER BY c.range`,
    zIndex: 4,
    overlayOrder: 0,
    props(feature) {
      const {
        municipality,
        state,
        country,
        reviewed_date,
        ...rest
      } = feature.properties;
      return {
        // Build city name with state and country if supplied
        jurisdictionName: `${municipality}${state ? `, ${state}` : ''}${
          country ? `, ${country}` : ''
        }`,
        jurisdictionType: 'City',
        jurisdictionTypeI18n: 'city',
        popupName: municipality,
        reviewed_date: formatDate(reviewed_date),
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorCity,
        fillColor: fillColorCity,
        fillOpacity: 0.85,
        radius: pointRadius,
        weight: strokeWeightLess,
      };
    },
    pointToLayer(feature, latlng) {
      return L.circleMarker(latlng, mapLayersConfig.cities.style(feature));

    },
    onEachFeature(feature, layer) {
      // class name is used for applying pattern fills to polygons
      if (feature.properties.has_expired_protections) {
        layer.options.className =
          policyStrengthLayerClassNames[feature.properties.range] +
          '--city-level';
      }
      layer.on({
        mouseover: e => highlightFeature(e),
        mouseout: e => highlightFeature(e),
      });
      layer.bindPopup(feature.properties.municipality);
    },
  },
  counties: {
    name: 'County Protections',
    nameI18n: 'layer-select-protections-stories.counties',
    type: 'polygon',
    // type: 'imageOverlay',
    query: `
    SELECT
      c.geom, c.name, c.state_name, m.eviction_status, m.link, m.resource, m.reviewed_date
    FROM ${cartoCountiesTable} c
    JOIN ${cartoSheetSyncTable} m
    ON ST_Intersects(c.geom, m.geom)
    WHERE m.geom IS NOT NULL
      AND m.admin_scale = 'County'
      OR m.admin_scale = 'City and County'
      AND m.eviction_status is not null AND m.eviction_status <> ''
    ORDER BY m.range`,
    zIndex: 3,
    overlayOrder: 1,
    props(feature) {
      const {
        state,
        county,
        reviewed_date,
        ...rest
      } = feature.properties;
      return {
        // Show county with state if state field is set
        jurisdictionName: `${county}${state ? `, ${state}` : ''}`,
        jurisdictionType: 'County',
        jurisdictionTypeI18n: 'county',
        popupName: `${county}${state ? `, ${state}` : ''}`,
        reviewed_date: formatDate(reviewed_date),
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorCounty || colorNoData,
        fillColor: fillColorCounty || colorNoData,
        fillOpacity: fillOpacity,
        weight: strokeWeightLess,
      };
    },
    onEachFeature(feature, layer) {
      // class name is used for applying pattern fills to polygons
      if (feature.properties.has_expired_protections) {
        layer.options.className =
          policyStrengthLayerClassNames[feature.properties.range];
      }
      layer.on({
        mouseover: e => highlightFeature(e),
        mouseout: e => highlightFeature(e),
      });
      const { county, state } = feature.properties;
      layer.bindPopup(`${county}${state ? `, ${state}` : ''}`);




    },
  },
  states: {
    name: 'State/Province Protections',
    nameI18n: 'layer-select-protections-stories.states',
    type: 'polygon',
    query: `
    SELECT
      s.geom, s.name, s.admin, s.sr_adm0_a3,
      m.eviction_status, m.link, m.resource, m.reviewed_date
    FROM ${cartoStatesTable} s
    INNER JOIN ${cartoSheetSyncTable} m
      ON s.name = m.state
      AND s.sr_adm0_a3 = m.iso
      AND m.admin_scale = 'State'
    WHERE m.eviction_status is not null and m.eviction_status <> ''
    ORDER BY m.range`,
    zIndex: 2,
    overlayOrder: 2,
    props(feature) {
      const {
        name,
        admin,
        reviewed_date,
        ...rest
      } = feature.properties;
      return {
        jurisdictionName: `${name}${admin ? `, ${admin}` : ''}`,
        jurisdictionType: 'State/Province',
        jurisdictionTypeI18n: 'state-province',
        popupName: name,
        reviewed_date: formatDate(reviewed_date),
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorState,
        fillColor: fillColorState,
        fillOpacity: fillOpacity,
        weight: strokeWeightMore,
      };
    },
    onEachFeature(feature, layer) {
      // class name is used for applying pattern fills to polygons
      if (feature.properties.has_expired_protections) {
        layer.options.className =
          policyStrengthLayerClassNames[feature.properties.range];
      }
      layer.on({
        mouseover: e => highlightFeature(e),
        mouseout: e => highlightFeature(e),
      });
      layer.bindPopup(feature.properties.name);
    },
  },
};

window.mapLayersConfig = mapLayersConfig;
