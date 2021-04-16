import app from './appReducer';
import admin from './adminReducer';
import aprendiz from './aprendizReducer';
import instructor from './instructorReducer';
import { combineReducers } from 'redux';
export default combineReducers({ app, admin, aprendiz, instructor });
