const initialState = {
  showModal: true,
  showLoadingIndicator: true,
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
    case "ui:language:set":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
