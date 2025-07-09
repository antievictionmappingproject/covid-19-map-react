import {
  cartoHousingActionsTable,
  cartoSheetSyncTable,
  cartoCountiesTable,
  cartoStatesTable,
  cartoNationsTable,
} from './constants';

/**
 * SQL queries that are passed to the CARTO SQL API
 * for more info on the SQL API see: https://carto.com/developers/sql-api/
 */

export const citiesCartoQuery = `
SELECT
  municipality, state, country, c.range, has_expired_protections,
  policy_type, policy_summary, link, resource, geom,
  end_date_earliest, end_date_legist, end_date_rent_relief, end_date_court,
  eviction_status, reviewed_date
FROM ${cartoSheetSyncTable} c
WHERE geom is not null and admin_scale = 'City'
ORDER BY c.range`;

export const countiesCartoQuery = `
SELECT
  c.geom, c.name, c.state_name, m.range,
  m.policy_type, m.policy_summary, m.link, m.resource,
  m.range, m.has_expired_protections,
  m.end_date_earliest, m.end_date_legist,
  m.end_date_rent_relief, m.end_date_court,
  m.eviction_status, m.reviewed_date
FROM ${cartoCountiesTable} c
JOIN ${cartoSheetSyncTable} m
ON ST_Intersects(c.geom, m.geom)
WHERE m.geom IS NOT NULL
  AND m.admin_scale = 'County'
  OR m.admin_scale = 'City and County'
ORDER BY m.range`;

export const statesCartoQuery = `
SELECT
  s.geom, s.name, s.admin, s.sr_adm0_a3,
  m.range, m.iso, m.policy_type, m.policy_summary,
  m.link, m.resource, m.has_expired_protections,
  m.end_date_earliest, m.end_date_legist,
  m.end_date_rent_relief, m.end_date_court,
  m.eviction_status, m.reviewed_date
FROM ${cartoStatesTable} s
INNER JOIN ${cartoSheetSyncTable} m
  ON s.name = m.state
  AND s.sr_adm0_a3 = m.iso
  AND m.admin_scale = 'State'
ORDER BY m.range`;

export const countriesCartoQuery = `
SELECT
  c.geom, c.adm0_a3, c.name_en, m.range,
  m.policy_type, m.policy_summary, m.link, m.resource,
  m.has_expired_protections, m.end_date_earliest, m.reviewed_date
FROM ${cartoNationsTable} c
INNER JOIN ${cartoSheetSyncTable} m
  ON c.adm0_a3 = m.iso
  AND m.admin_scale = 'Country'
ORDER BY m.range`;

export const housingActionsCartoQuery = `
  SELECT
    CASE
      WHEN strike_status IN ('Yes / Sí / 是 / Oui', 'Yes') THEN 'Yes'
      WHEN strike_status IN ('Unsure / No estoy segurx / 不确定 / Pas sûr.e.s.', 'No') THEN 'No'
      ELSE 'Unsure'
    END AS status,
    CASE
      WHEN type LIKE 'Rent Strike%' THEN 'Rent Strike / Rent decrease'
      WHEN type LIKE 'Occupation / Squat%' THEN 'Occupation / Squat'
      WHEN type LIKE 'Mutual aid / Direct aid%' THEN 'Mutual aid / Direct aid'
      WHEN type LIKE 'Campaigning / List of demands%' THEN 'Campaigning / List of demands'
      ELSE 'Other'
    END AS strike_type,
    CAST(date AS DATE) AS start,
    geom, location, why, resources
  FROM ${cartoHousingActionsTable}
  WHERE geom IS NOT NULL;
`;

// Deprecated V2 Housing Actions query
// TO_CHAR() is no longer supported by CARTO SQL but column "start" might not even be used, it's often NULL
export const housingActionsCartoQueryV2 = `
  SELECT
    CASE
      WHEN strike_status IN ('Yes / Sí / 是 / Oui', 'Yes') THEN 'Yes'
      WHEN strike_status IN ('Unsure / No estoy segurx / 不确定 / Pas sûr.e.s.', 'No') THEN 'No'
      ELSE 'Unsure'
    END AS status,
    CASE
      WHEN type LIKE 'Rent Strike%' THEN 'Rent Strike / Rent decrease'
      WHEN type LIKE 'Occupation / Squat%' THEN 'Occupation / Squat'
      WHEN type LIKE 'Mutual aid / Direct aid%' THEN 'Mutual aid / Direct aid'
      WHEN type LIKE 'Campaigning / List of demands%' THEN 'Campaigning / List of demands'
      ELSE 'Other'
    END AS strike_type,
    TO_CHAR(date :: DATE, 'Month d, yyyy') as start,
    the_geom, location, why, resources
  FROM ${cartoHousingActionsTable}
  WHERE the_geom IS NOT NULL;
`;
