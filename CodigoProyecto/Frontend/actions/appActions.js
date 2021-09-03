import {
    LOGIN,
    LOGIN_EXITO,
    LOGIN_ERROR,
    FIRST_CALL,
    FIRST_CALL_EXITO,
    FIRST_CALL_ERROR,
} from '../types';
import { Router } from 'next/router';
import axios from 'axios';
import { uri } from '../config/index';
import { toast } from 'react-toastify';

export const firstCall = () => {
    return async (dispatch) => {
        try {
            dispatch(firstCallInit());

            dispatch(firstCallExito());
        } catch (e) {
            dispatch(firstCallError());
        }
    };
};
const firstCallInit = () => ({
    type: FIRST_CALL,
});
const firstCallExito = (payload) => ({
    type: FIRST_CALL_EXITO,
    payload,
});
const firstCallError = () => ({
    type: FIRST_CALL_ERROR,
});

export const login = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(loginInit());
            const res = await axios.post(
                `${uri}/autentificacion/login`,
                payload,
            );
            console.log(res);
            dispatch(loginExito(res.data.data));
        } catch (e) {
            toast.error(e.response.data.message);
            console.log(e.response.data);
            dispatch(loginError());
        }
    };
};
const loginInit = () => ({
    type: LOGIN,
});
const loginExito = (payload) => ({
    type: LOGIN_EXITO,
    payload,
});
const loginError = () => ({
    type: LOGIN_ERROR,
});
