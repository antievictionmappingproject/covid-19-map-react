import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import ui from './ui';
import content from './content';
import data from './data';

export default createStore(
  combineReducers({
    ui,
    content,
    data,
  }),
  applyMiddleware(logger)
);
