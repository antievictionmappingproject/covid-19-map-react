const initialState = {
  searchPopup: null,
  tenantProtectionsLayers: null,
  tenantProtectionsLoaded: false,
  evictionStoriesLayers: null,
  evictionStoriesLoaded: false,
  evictionStoriesInterviews: [],
  tenantProtectionsLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'data:tenant-protections:layers':
      return {
        ...state,
        tenantProtectionsLayers: action.payload,
        tenantProtectionsLoaded: true,
      };
    case 'data:eviction-stories:layers':
      return {
        ...state,
        evictionStoriesLayers: action.payload,
        evictionStoriesLoaded: !!state.evictionStoriesInterviews,
      };
    case 'data:eviction-stories:interviews':
      return {
        ...state,
        evictionStoriesInterviews: action.payload,
        evictionStoriesLoaded: !!state.evictionStoriesLayers,
      };
    case 'data:searchPopup':
      return {
        ...state,
        searchPopup: action.payload,
      };
    default:
      return state;
  }
};

export async function fetchAirtableData(dispatch, getState) {
//  const response = await fetch(`/.netlify/functions/airtable`);
//  const data = await response.json();
//  const records = data.records;
//  dispatch({ type: 'data:eviction-stories:interviews', payload: records });
}
