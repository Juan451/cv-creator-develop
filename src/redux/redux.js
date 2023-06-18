/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import thunk from 'redux-thunk';

import userSlice from './reducers/userSlice.js';
import routingSlice from './reducers/routingSlice.js';
import loginSlice from './reducers/loginSlice.js';
import experienceSlice from './reducers/experienceSlice.js';
import studiesSlice from './reducers/studiesSlice.js';
import skillsSlice from './reducers/skillsSlice.js';
import techToolSlice from './reducers/techToolSlice.js';
import {
  languageReducer,
  certificateReducer,
} from './reducers/languageSlice.js';
import strongPointsSlice from './reducers/strongPointsSlice.js';

const rootReducer = combineReducers({
  info: userSlice,
  routing: routingSlice,
  login: loginSlice,
  experience: experienceSlice,
  studies: studiesSlice,
  skills: skillsSlice,
  tech: techToolSlice,
  language: languageReducer,
  certificate: certificateReducer,
  points: strongPointsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [lazyReducerEnhancer(rootReducer)],
  middleware: [thunk],
});

export default store;
