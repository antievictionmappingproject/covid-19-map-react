// CARTO Credentials: Workspace > Developers > Credentials
export const cartoApiBaseUrl = 'https://gcp-us-east1.api.carto.com';
//export const cartoApiAccessToken = 'CHANGEME';

// CARTO API V3 variables : https://api-docs.carto.com/
export const cartoConnection = 'carto_dw';

// CARTO API V3 table names
export const cartoSheetSyncTable = 'shared.emergency_tenant_protections_scored';
export const cartoHousingActionsTable = 'shared.emergency_housing_actions';
export const cartoCountiesTable = 'carto-demo-data.demo_tables.usa_counties';
export const cartoStatesTable = 'shared.states_and_provinces_global';
// Natural Earth Admin 0 - Countries shapefile
// https://www.naturalearthdata.com/downloads/10m-cultural-vectors/
export const cartoNationsTable = 'shared.ne_10m_admin_0_countries';

//
// Deprecated: CARTO API V2 variables
//

// name of AEMP's CARTO account
export const aempCartoAccountV2 = 'ampitup';

// table in CARTO that syncs with the tenants protections legislation Google sheet
export const cartoSheetSyncTableV2 = 'public.emergency_tenant_protections_scored';

// table in CARTO that syncs with the housing actions Google sheet
export const cartoHousingActionsTableV2 = 'public.emergency_housing_actions';

// misc admin boundary geometry tables
export const cartoCountiesTableV2 = 'public.us_county_boundaries';
export const cartoStatesTableV2 = 'public.states_and_provinces_global';
export const cartoNationsTableV2 = 'public.countries';

