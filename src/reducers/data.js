const initialState = {
  geojson: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "data:geojson":
      return {
        ...state,
        geojson: action.payload,
      };

    default:
      return state;
  }
};
