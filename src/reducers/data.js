const initialState = {
  layers: [],
  interviews: [],
  searchPopup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'data:tenant-protections:layers':
      return {
        ...state,
        tenantProtectionsLayers: action.payload,
      };
    case 'data:eviction-stories:layers':
      return {
        ...state,
        evictionStoriesLayers: action.payload,
      };
    case 'data:interviews':
      return {
        ...state,
        interviews: action.payload,
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
  const response = await fetch(`/.netlify/functions/airtable`);
  const data = await response.json();
  const records = data.records;
  dispatch({ type: 'data:interviews', payload: records });
}
