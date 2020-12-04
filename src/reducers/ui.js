const initialState = {
  showModal: false,
  showLoadingIndicator: true,
  infoWindowFeatureProps: null,
  language: "en",
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
    default:
      return state;
  }
};
