import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_EXITO,
    CHANGE_PASSWORD_INIT,
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
                        await Router.push('/dashboard/admin/');
                        break;
                    case 2:
                        await Router.push('/dashboard/instructor/fichas');
                        break;
                    case 3:
                        await Router.push('/dashboard/aprendiz/fichas');
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
export const passwordRecoveryRequest = (payload) => {
    payload.id_tipo_documento = parseInt(payload.id_tipo_documento);
    payload.numero_documento = parseInt(payload.numero_documento);
    return async () => {
        try {
            await client.post('auth/passwordChangeRequest', payload);
        } catch (e) {
        } finally {
            toast.info(
                'Si encontramos una cuenta con los datos ingresados se le enviara un email al correo asociado de la cuenta.',
            );
            await Router.push('/login');
        }
    };
};
export const changePassword = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(changePasswordFn());
            await client.post(`auth/passwordChange?token=${payload.token}`, {
                password: payload.password,
            });
            toast.success('Contraseña cambiada con exito');
            await Router.push('/login');
            dispatch(changePasswordFnExito());
        } catch (e) {
            toast.error(e.response.data.message);
            await Router.push('/login');
            dispatch(changePasswordFnError());
        }
    };
};

const changePasswordFn = () => ({
    type: CHANGE_PASSWORD_INIT,
});
const changePasswordFnError = () => ({
    type: CHANGE_PASSWORD_ERROR,
});
const changePasswordFnExito = () => ({
    type: CHANGE_PASSWORD_EXITO,
});
