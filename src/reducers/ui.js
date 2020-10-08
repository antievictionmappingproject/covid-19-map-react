const initialState = {
    showModal: true,
    language: "en",
}
export default (state=initialState, action) => {
    switch(action.type) {
        case "ui:modal:show":
            return { ...state, showModal: true };
        case "ui:modal:hide":
            return { ...state, showModal: false };
        case "ui:language:set":
            return { ...state, language: action.payload };
        default:
            return state
    }
}