import app from './appReducer';
import admin from './adminReducer';
import aprendiz from './aprendizReducer';
import instructor from './instructorReducer';
import { combineReducers } from 'redux-immer';
import { produce } from 'immer';

export default combineReducers(produce, { app, admin, aprendiz, instructor });
