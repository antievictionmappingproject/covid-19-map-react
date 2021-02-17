import distance from '@turf/distance';
import { point } from '@turf/helpers';
import booleanWithin from '@turf/boolean-within';

export const getNearestCity = (searchPoint, citiesLayer) => {
  const nearestCity = citiesLayer.data.features.reduce((acc, city) => {
    // Reverse points to use same order as features
    const pointObject = point([
      searchPoint.coordinates[1],
      searchPoint.coordinates[0],
    ]);
    const distanceBetween = distance(pointObject, city);

    if (
      // Within 10km
      distanceBetween < 10 &&
      // No item yet, or it's closer than the existing
      (acc === null || distanceBetween < acc.distanceBetween)
    ) {
      return {
        distanceBetween,
        city,
      };
    }
    return acc;
  }, null);

  return nearestCity?.city;
};

export const getPolygonAroundPoint = (searchPoint, layer) => {
  const polygonAroundPoint = layer.data.features.find(feature => {
    const pointObject = point([
      searchPoint.coordinates[1],
      searchPoint.coordinates[0],
    ]);

    return booleanWithin(pointObject, feature);
  });

  return polygonAroundPoint;
};
