import L, { rentStrikeIcon } from '../../lib/leaflet';
import {
  colorNoData,
  fillColorScale,
  strokeColorScale,
  strokeWeightLess,
  strokeWeightMore,
  pointRadius,
  fillOpacity,
  policyStrengthLayerClassNames,
} from '../constants';
import * as queries from '../../carto/queries';
import { formatDate } from '../../utils/datetime';


//styling helpers
function highlightFeature(e) {
  const layer = e.target;

  if (e.type === 'mouseover') {
    layer.setStyle({
      fillOpacity: 0.4,
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
    nameI18n: 'layer-select.cities',
    type: 'point',
    query: queries.citiesCartoQuery,
    zIndex: 4,
    overlayOrder: 0,
    props(feature) {
      const {
        municipality,
        state,
        country,
        end_date_legist,
        end_date_rent_relief,
        end_date_court,
        end_date_earliest,
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
        endDateLegist: formatDate(end_date_legist),
        endDateRentRelief: formatDate(end_date_rent_relief),
        endDateCourt: formatDate(end_date_court),
        endDateEarliest: formatDate(end_date_earliest),
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorScale[feature.properties.range] || colorNoData,
        fillColor: fillColorScale[feature.properties.range] || colorNoData,
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
    nameI18n: 'layer-select.counties',
    type: 'polygon',
    query: queries.countiesCartoQuery,
    zIndex: 3,
    overlayOrder: 1,
    props(feature) {
      const {
        state,
        county,
        end_date_legist,
        end_date_rent_relief,
        end_date_court,
        end_date_earliest,
        ...rest
      } = feature.properties;
      return {
        // Show county with state if state field is set
        jurisdictionName: `${county}${state ? `, ${state}` : ''}`,
        jurisdictionType: 'County',
        jurisdictionTypeI18n: 'county',
        popupName: `${county}${state ? `, ${state}` : ''}`,
        endDateLegist: formatDate(end_date_legist),
        endDateRentRelief: formatDate(end_date_rent_relief),
        endDateCourt: formatDate(end_date_court),
        endDateEarliest: formatDate(end_date_earliest),
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorScale[feature.properties.range] || colorNoData,
        fillColor: fillColorScale[feature.properties.range] || colorNoData,
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
    nameI18n: 'layer-select.states',
    type: 'polygon',
    query: queries.statesCartoQuery,
    zIndex: 2,
    overlayOrder: 2,
    props(feature) {
      const {
        name,
        admin,
        end_date_legist,
        end_date_rent_relief,
        end_date_court,
        end_date_earliest,
        ...rest
      } = feature.properties;
      return {
        jurisdictionName: `${name}${admin ? `, ${admin}` : ''}`,
        jurisdictionType: 'State/Province',
        jurisdictionTypeI18n: 'state-province',
        popupName: name,
        endDateLegist: formatDate(end_date_legist),
        endDateRentRelief: formatDate(end_date_rent_relief),
        endDateCourt: formatDate(end_date_court),
        endDateEarliest: formatDate(end_date_earliest),
        ...rest,
      };
    },
    style(feature) {
      return {
        fillColor: fillColorScale[feature.properties.range] || colorNoData,
        color: strokeColorScale[feature.properties.range] || colorNoData,
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
  nations: {
    name: 'National Protections',
    nameI18n: 'layer-select.nations',
    type: 'polygon',
    query: queries.countriesCartoQuery,
    zIndex: 1,
    overlayOrder: 3,
    props(feature) {
      const { name_en, end_date_earliest, ...rest } = feature.properties;
      return {
        endDateEarliest: formatDate(end_date_earliest),
        jurisdictionName: name_en,
        jurisdictionType: 'Country',
        jurisdictionTypeI18n: 'nation',
        popupName: name_en,
        ...rest,
      };
    },
    style(feature) {
      return {
        color: strokeColorScale[feature.properties.range] || colorNoData,
        fillColor: fillColorScale[feature.properties.range] || colorNoData,
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
      layer.bindPopup(feature.properties.name_en);
    },
  },
  rentStrikes: {
    name: 'Housing Justice Actions',
    nameI18n: 'layer-select.housingJusticeAction',
    type: 'marker-cluster',
    query: queries.housingActionsCartoQuery,
    zIndex: 5,
    overlayOrder: 4,
    pointToLayer(feature, latlng) {
      return L.marker(latlng, {
        icon: rentStrikeIcon,
      });
    },
    props(feature) {
      return {
        ...feature.properties,
        actionStart: feature.properties.start,
        action: true,
      };
    },
  },
};

window.mapLayersConfig = mapLayersConfig;
