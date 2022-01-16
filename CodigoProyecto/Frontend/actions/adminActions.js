import {
    CREAR_USUARIO,
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    EDITAR_USUARIO,
    EDITAR_USUARIO_ERROR,
    EDITAR_USUARIO_EXITO,
    ELIMINAR_USUARIO,
    ELIMINAR_USUARIO_ERROR,
    ELIMINAR_USUARIO_EXITO,
    GET_USUARIO_EDITAR,
    GET_USUARIO_EDITAR_ERROR,
    GET_USUARIO_EDITAR_EXITO,
    GET_USUARIOS,
    GET_USUARIOS_ERROR,
    GET_USUARIOS_EXITO,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router from 'next/router';

export const getUsuarios = () => {
    return async (dispatch) => {
        try {
            dispatch(getUsuariosFn());
            const res = await axios.get(`${uri}/usuarios`);
            await setTimeout(
                () => dispatch(getUsuariosFnExito(res.data.data.usuarios)),
                1000,
            );
        } catch (e) {
            toast.error(e.response.data.message);
            dispatch(getUsuariosFnError(e.response.data.message));
        }
    };
};

const getUsuariosFn = () => ({
    type: GET_USUARIOS,
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
    if (
        payload.telefono_movil === undefined ||
        payload.telefono_movil === null ||
        payload.telefono_movil === 0 ||
        payload.telefono_movil.trim() === ''
    ) {
        delete payload.telefono_movil;
    }
    if (
        payload.direccion_residencial === undefined ||
        payload.direccion_residencial === null ||
        payload.direccion_residencial === 0 ||
        payload.direccion_residencial.trim() === ''
    ) {
        delete payload.direccion_residencial;
    }
    return async (dispatch) => {
        try {
            dispatch(crearUsuarioFn());
            const res = await axios.post(`${uri}/usuarios/registrar`, payload);
            await setTimeout(
                () => dispatch(crearUsuarioFnExito(res.data.data.usuario)),
                1000,
            );

            Router.push('/dashboard/admin/personas');
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
                toast.error(e.response.data.message);
                dispatch(crearUsuarioFnError(e.response.data.message));
            }
        }
    };
};

const crearUsuarioFn = () => ({
    type: CREAR_USUARIO,
});
const crearUsuarioFnExito = (payload) => ({
    type: CREAR_USUARIO_EXITO,
    payload,
});
const crearUsuarioFnError = (payload) => ({
    type: CREAR_USUARIO_ERROR,
    payload,
});

export const eliminarUsuario = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(eliminarUsuarioFn());
            await axios.delete(`${uri}/usuarios/eliminar/${payload}`);
            dispatch(eliminarUsuarioFnExito(payload));
        } catch (e) {
            toast.error(e.response.data.message);
            dispatch(eliminarUsuarioFnError(e.response.data.message));
        }
    };
};

const eliminarUsuarioFn = () => ({
    type: ELIMINAR_USUARIO,
});
const eliminarUsuarioFnExito = (payload) => ({
    type: ELIMINAR_USUARIO_EXITO,
    payload,
});
const eliminarUsuarioFnError = (payload) => ({
    type: ELIMINAR_USUARIO_ERROR,
    payload,
});

export const editarUsuario = (payload) => {
    if (
        payload.telefono_movil === undefined ||
        payload.telefono_movil === null ||
        payload.telefono_movil === 0 ||
        payload.telefono_movil.trim() === ''
    ) {
        payload.telefono_movil = null;
    }
    if (
        payload.direccion_residencial === undefined ||
        payload.direccion_residencial === null ||
        payload.direccion_residencial === 0 ||
        payload.direccion_residencial.trim() === ''
    ) {
        payload.direccion_residencial = null;
    }
    console.log(payload);
    return async (dispatch) => {
        try {
            dispatch(editarUsuarioFn());
            const res = await axios.put(
                `${uri}/usuarios/editar/${payload.id_usuario}`,
                payload,
            );
            await setTimeout(() => {
                dispatch(editarUsuarioFnExito(res.data.data.usuario));
            }, 1000);
            Router.push('/dashboard/admin/personas');
        } catch (e) {
            console.log(e.response.data);
            toast.error(e.response.data.message);
            dispatch(editarUsuarioFnError(payload));
        }
    };
};
const editarUsuarioFn = () => ({
    type: EDITAR_USUARIO,
});
const editarUsuarioFnExito = (payload) => ({
    type: EDITAR_USUARIO_EXITO,
    payload,
});
const editarUsuarioFnError = (payload) => ({
    type: EDITAR_USUARIO_ERROR,
    payload,
});

export const getUsuarioEdit = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getUsuarioEditFn());
            const res = await axios.get(`${uri}/usuarios/${payload}`);
            dispatch(getUsuarioEditFnExito(res.data.data.usuario));
        } catch (e) {
            toast.error('Usuario no existente');
            Router.push('/dashboard/admin/personas');
            dispatch(getUsuarioEditFnError(e.response.data.message));
        }
    };
};

const getUsuarioEditFn = () => ({
    type: GET_USUARIO_EDITAR,
});

const getUsuarioEditFnExito = (payload) => ({
    type: GET_USUARIO_EDITAR_EXITO,
    payload,
});
const getUsuarioEditFnError = (payload) => ({
    type: GET_USUARIO_EDITAR_ERROR,
    payload,
});
