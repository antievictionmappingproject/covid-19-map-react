const initialState = {
    translations: {},
    i18n: false,
}

export default (state=initialState, action) => {
    switch(action.type) {
        case "content:translations":
            return {
                ...state,
                translations: { // we can add new translations piecemeal without wiping state
                    ...state.translations,
                    ...action.payload
                }
            }
        case "content:i18n":            
            return { ...state, i18n: true }
        default:
            return state;
    }
}