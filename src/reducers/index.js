import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import uiReducer from "./ui";
import contentReducer from "./content";

const initialState = {
    showModal: false,
    content: { translations: {} },
};

export default createStore(
    combineReducers({
        ui: uiReducer,
        content: contentReducer,
    }),
    applyMiddleware(logger)
);