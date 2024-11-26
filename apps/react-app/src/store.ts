import { createStore } from 'redux';
import AppReducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(AppReducers, composeWithDevTools());

export default store;
