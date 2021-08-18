import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import ui from './ui';
import content from './content';
import data from './data';

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

export default createStore(
  combineReducers({
    ui,
    content,
    data,
  }),
  applyMiddleware(...middleware)
);
