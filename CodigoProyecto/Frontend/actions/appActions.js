import {
    FIRST_CALL_ERROR,
    FIRST_CALL_EXITO,
    FIRST_CALL_INIT,
    LOGIN_ERROR,
    LOGIN_EXITO,
    LOGIN_INIT,
    LOGOUT,
    LOGOUT_INIT,
} from '../types';
import { client } from '../config/axios';
import Router from 'next/router';
import { toast } from 'react-toastify';

export const firstCall = () => {
    return async (dispatch) => {
        try {
            dispatch(firstCallInit());
            client.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
                'token',
            )}`;
            const res = await client.get('/usuarios/getSelfInformation');
            dispatch(firstCallExito(res.data));
            toast.success(`Bienvenido ${res.data.nombres_usuario}`);
        } catch (e) {
            dispatch(firstCallError());
        }
    };
};
const firstCallInit = () => ({
    type: FIRST_CALL_INIT,
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
            const res = await client.post('auth/login', payload);
            setTimeout(async () => {
                dispatch(loginExito(res.data.user));
                client.defaults.headers.Authorization = `bearer ${res.data.token}`;
                localStorage.setItem('token', res.data.token);
                switch (res.data.user.id_tipo_rol) {
                    case 1:
                        await Router.push('/dashboard/admin/personas');
                        break;
                    case 2:
                        await Router.push('/dashboard/instructor/fichas');
                        break;
                    case 3:
                        await Router.push('/dashboard/aprendiz');
                        break;
                }
            }, 1000);
        } catch (e) {
            setTimeout(() => {
                dispatch(loginError());
                toast.error(e.response.data.message);
            }, 1000);
        }
    };
};
const loginInit = () => ({
    type: LOGIN_INIT,
});
const loginExito = (payload) => ({
    type: LOGIN_EXITO,
    payload,
});
const loginError = () => ({
    type: LOGIN_ERROR,
});

export const logoutFn = () => {
    return async (dispatch) => {
        dispatch(logoutInit());
        await Router.push('/login');
        dispatch(logout());
        client.defaults.headers.Authorization = '';
        localStorage.removeItem('token');
    };
};

const logout = () => ({
    type: LOGOUT,
});
const logoutInit = () => ({
    type: LOGOUT_INIT,
});
