import { applyMiddleware, createStore } from 'redux';
import { shopReducer } from './features/reducer'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';

const logger = createLogger({
  diff: true,
  collapsed: true
})

const store =createStore(shopReducer, applyMiddleware(thunk, logger))

export default store;