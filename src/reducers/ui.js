const initialState = {
  showModal: false,
  showLoadingIndicator: true,
  infoWindowFeatureProps: null,
  language: "en",
  searchTerm: "",
  searchResults: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "ui:modal:show":
      return { ...state, showModal: true };
    case "ui:modal:hide":
      return { ...state, showModal: false };
    case "ui:loading-indicator:show":
      return { ...state, showLoadingIndicator: true };
    case "ui:loading-indicator:hide":
      return { ...state, showLoadingIndicator: false };
    case "ui:info-window:hide":
      return { ...state, infoWindowFeatureProps: null };
    case "ui:info-window:show":
      return { ...state, infoWindowFeatureProps: action.payload };
    case "ui:language:set":
      return { ...state, language: action.payload };
    case "ui:search:term:set":
      return { ...state, searchTerm: action.payload };
    case "ui:search:results:set":
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};
