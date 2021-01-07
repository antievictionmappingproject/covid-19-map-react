const initialState = {
  layers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'data:layers':
      return {
        ...state,
        layers: action.payload,
      };

    default:
      return state;
  }
};
