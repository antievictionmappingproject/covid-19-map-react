const initialState = {
  showModal: true,
  showResources: false,
  showAbout: false,
  showLoadingIndicator: true,
  infoWindowFeatureProps: null,
  language: 'en',
  searchTerm: '',
  searchResults: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ui:modal:show':
      return { ...state, showModal: true };
    case 'ui:modal:hide':
      return { ...state, showModal: false };
    case 'ui:resources:show':
      return { ...state, showResources: true };
    case 'ui:resources:hide':
      return { ...state, showResources: false };
    case 'ui:about:show':
      return { ...state, showAbout: true };
    case 'ui:about:hide':
      return { ...state, showAbout: false };
    case 'ui:loading-indicator:show':
      return { ...state, showLoadingIndicator: true };
    case 'ui:loading-indicator:hide':
      return { ...state, showLoadingIndicator: false };
    case 'ui:info-window:hide':
      return { ...state, infoWindowFeatureProps: null };
    case 'ui:info-window:show':
      return { ...state, infoWindowFeatureProps: action.payload };
    case 'ui:eviction-stories-interview:selected':
      return { ...state, interviewSelected: action.payload };
    default:
      return state;
  }
};
