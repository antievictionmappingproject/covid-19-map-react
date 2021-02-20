const initialState = {
  layers: [],
  searchPopup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'data:layers':
      return {
        ...state,
        layers: action.payload,
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
