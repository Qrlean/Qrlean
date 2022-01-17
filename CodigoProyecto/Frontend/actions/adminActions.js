import {
    CREAR_FICHA_ERROR,
    CREAR_FICHA_EXITO,
    CREAR_FICHA_INIT,
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    CREAR_USUARIO_INIT,
    EDITAR_USUARIO_ERROR,
    EDITAR_USUARIO_EXITO,
    EDITAR_USUARIO_INIT,
    ELIMINAR_USUARIO_ERROR,
    ELIMINAR_USUARIO_EXITO,
    ELIMINAR_USUARIO_INIT,
    GET_FICHAS_ERROR,
    GET_FICHAS_EXITO,
    GET_FICHAS_INIT,
    GET_PROGRAMAS_ERROR,
    GET_PROGRAMAS_EXITO,
    GET_PROGRAMAS_INIT,
    GET_USUARIO_EDITAR_ERROR,
    GET_USUARIO_EDITAR_EXITO,
    GET_USUARIO_EDITAR_INIT,
    GET_USUARIOS_ERROR,
    GET_USUARIOS_EXITO,
    GET_USUARIOS_INIT,
} from '../types';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { client } from '../config/axios';

export const getUsuarios = () => {
    return async (dispatch) => {
        try {
            dispatch(getUsuariosFn());
            const res = await client.get('/usuarios');
            dispatch(getUsuariosFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getUsuariosFnError(e.response.data.message));
        }
    };
};

const getUsuariosFn = () => ({
    type: GET_USUARIOS_INIT,
});
const getUsuariosFnExito = (payload) => ({
    type: GET_USUARIOS_EXITO,
    payload,
});
const getUsuariosFnError = (payload) => ({
    type: GET_USUARIOS_ERROR,
    payload,
});

export const crearUsuario = (payload) => {
    return async (dispatch) => {
        try {
            payload.telefono_movil = parseInt(payload.telefono_movil);
            payload.numero_documento = parseInt(payload.numero_documento);
            payload.id_tipo_rol = parseInt(payload.id_tipo_rol);
            payload.id_ciudad = parseInt(payload.id_ciudad);
            payload.id_tipo_documento = parseInt(payload.id_tipo_documento);
            dispatch(crearUsuarioFn());
            await client.post('/usuarios', payload);
            dispatch(crearUsuarioFnExito());
            await Router.push('/dashboard/admin/personas');
            toast.success('Usuario creado con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(crearUsuarioFnError(e.response.data.message));
        }
    };
};

const crearUsuarioFn = () => ({
    type: CREAR_USUARIO_INIT,
});
const crearUsuarioFnExito = (payload) => ({
    type: CREAR_USUARIO_EXITO,
});
const crearUsuarioFnError = (payload) => ({
    type: CREAR_USUARIO_ERROR,
    payload,
});

export const getUsuarioById = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getUsuarioEditFn());
            const res = await client.get(`/usuarios/${payload}`);
            dispatch(getUsuarioEditFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getUsuarioEditFnError(e.response.data.message));
        }
    };
};

const getUsuarioEditFn = () => ({
    type: GET_USUARIO_EDITAR_INIT,
});

const getUsuarioEditFnExito = (payload) => ({
    type: GET_USUARIO_EDITAR_EXITO,
    payload,
});
const getUsuarioEditFnError = (payload) => ({
    type: GET_USUARIO_EDITAR_ERROR,
    payload,
});
export const editarUsuario = (payload) => {
    return async (dispatch) => {
        payload.telefono_movil = parseInt(payload.telefono_movil);
        payload.numero_documento = parseInt(payload.numero_documento);
        payload.id_tipo_rol = parseInt(payload.id_tipo_rol);
        payload.id_ciudad = parseInt(payload.id_ciudad);
        payload.id_tipo_documento = parseInt(payload.id_tipo_documento);
        try {
            dispatch(editarUsuarioFn());
            await client.patch(`/usuarios/${payload.id_usuario}`, payload);
            dispatch(editarUsuarioFnExito());
            await Router.push('/dashboard/admin/personas');
            toast.success('Usuario editado con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(editarUsuarioFnError(payload));
        }
    };
};
const editarUsuarioFn = () => ({
    type: EDITAR_USUARIO_INIT,
});
const editarUsuarioFnExito = (payload) => ({
    type: EDITAR_USUARIO_EXITO,
    payload,
});
const editarUsuarioFnError = (payload) => ({
    type: EDITAR_USUARIO_ERROR,
    payload,
});

export const eliminarUsuario = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(eliminarUsuarioFn());
            await client.delete(`/usuarios/${payload}`);
            dispatch(eliminarUsuarioFnExito(payload));
            toast.success('Usuario eliminado con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(eliminarUsuarioFnError(e.response.data.message));
        }
    };
};

const eliminarUsuarioFn = () => ({
    type: ELIMINAR_USUARIO_INIT,
});
const eliminarUsuarioFnExito = (payload) => ({
    type: ELIMINAR_USUARIO_EXITO,
    payload,
});
const eliminarUsuarioFnError = (payload) => ({
    type: ELIMINAR_USUARIO_ERROR,
    payload,
});

export const getFichas = () => {
    return async (dispatch) => {
        try {
            dispatch(getFichasFn());
            const res = await client.get('fichas');
            dispatch(getFichasFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getFichasFnError(e.response.data.message));
        }
    };
};

const getFichasFn = () => ({
    type: GET_FICHAS_INIT,
});

const getFichasFnExito = (payload) => ({
    type: GET_FICHAS_EXITO,
    payload,
});
const getFichasFnError = (payload) => ({
    type: GET_FICHAS_ERROR,
    payload,
});

export const getProgramas = () => {
    return async (dispatch) => {
        try {
            dispatch(getProgramasFn());
            const res = await client.get('/programas');
            dispatch(getProgramasFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getProgramasFnError());
        }
    };
};

const getProgramasFn = () => ({
    type: GET_PROGRAMAS_INIT,
});
const getProgramasFnExito = (payload) => ({
    type: GET_PROGRAMAS_EXITO,
    payload,
});
const getProgramasFnError = () => ({
    type: GET_PROGRAMAS_ERROR,
});

export const crearFicha = (payload) => {
    return async (dispatch) => {
        console.log(payload);
        try {
            payload.id_programa = parseInt(payload.id_programa);
            dispatch(crearFichaFn());
            await client.post('/fichas', payload);
            dispatch(crearFichaFnExito());
            await Router.push('/dashboard/admin/fichas');
            toast.success('Ficha creada con exito.');
        } catch (e) {
            console.log(e);
            // toast.error(
            //     Array.isArray(e.response.data.message)
            //         ? e.response.data.message[0]
            //         : e.response.data.message,
            // );
            // dispatch(crearFichaFnError(e.response.data.message));
        }
    };
};

const crearFichaFn = () => ({
    type: CREAR_FICHA_INIT,
});
const crearFichaFnExito = (payload) => ({
    type: CREAR_FICHA_EXITO,
});
const crearFichaFnError = (payload) => ({
    type: CREAR_FICHA_ERROR,
    payload,
});
