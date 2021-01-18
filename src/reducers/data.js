const initialState = {
  layers: [],
  marker: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'data:layers':
      return {
        ...state,
        layers: action.payload,
      };
    case 'data:marker':
      return {
        ...state,
        marker: action.payload,
      };
    default:
      return state;
  }
};
