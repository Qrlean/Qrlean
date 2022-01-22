import {
    CREAR_FICHA_ERROR,
    CREAR_FICHA_EXITO,
    CREAR_FICHA_INIT,
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    CREAR_USUARIO_INIT,
    EDITAR_FICHA_ERROR,
    EDITAR_FICHA_EXITO,
    EDITAR_FICHA_INIT,
    EDITAR_USUARIO_ERROR,
    EDITAR_USUARIO_EXITO,
    EDITAR_USUARIO_INIT,
    ELIMINAR_FICHA_ERROR,
    ELIMINAR_FICHA_EXITO,
    ELIMINAR_FICHA_INIT,
    ELIMINAR_USUARIO_ERROR,
    ELIMINAR_USUARIO_EXITO,
    ELIMINAR_USUARIO_INIT,
    GET_CIUDADES_ERROR,
    GET_CIUDADES_EXITO,
    GET_CIUDADES_INIT,
    GET_FICHA_EDITAR_ERROR,
    GET_FICHA_EDITAR_EXITO,
    GET_FICHA_EDITAR_INIT,
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
    GET_ASIGNATURAS_INIT,
    GET_ASIGNATURAS_EXITO,
    GET_ASIGNATURAS_ERROR,
    CREAR_ASOCIACION_INIT,
    CREAR_ASOCIACION_EXITO,
    CREAR_ASOCIACION_ERROR,
} from '../types';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { client } from '../config/axios';

export const getUsuarios = (idTipoRol) => {
    return async (dispatch) => {
        try {
            dispatch(getUsuariosFn());
            const res = await client.get(
                `/usuarios${
                    idTipoRol !== undefined ? '?byTipoRol=' + idTipoRol : ''
                }`,
            );
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
export const getCiudades = () => {
    return async (dispatch) => {
        try {
            dispatch(getCiudadesFn());
            const res = await client.get('/ciudades');
            dispatch(getCiudadesFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getCiudadesFnError());
        }
    };
};

const getCiudadesFn = () => ({
    type: GET_CIUDADES_INIT,
});
const getCiudadesFnExito = (payload) => ({
    type: GET_CIUDADES_EXITO,
    payload,
});
const getCiudadesFnError = () => ({
    type: GET_CIUDADES_ERROR,
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
const crearUsuarioFnExito = () => ({
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
        try {
            payload.id_programa = parseInt(payload.id_programa);
            dispatch(crearFichaFn());
            await client.post('/fichas', payload);
            dispatch(crearFichaFnExito());
            await Router.push('/dashboard/admin/fichas');
            toast.success('Ficha creada con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(crearFichaFnError(e.response.data.message));
        }
    };
};

const crearFichaFn = () => ({
    type: CREAR_FICHA_INIT,
});
const crearFichaFnExito = () => ({
    type: CREAR_FICHA_EXITO,
});
const crearFichaFnError = () => ({
    type: CREAR_FICHA_ERROR,
});

export const getFichaById = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getFichaEditFn());
            const res = await client.get(`/fichas/${payload}`);
            dispatch(getFichaEditFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getFichaEditFnError(e.response.data.message));
        }
    };
};

const getFichaEditFn = () => ({
    type: GET_FICHA_EDITAR_INIT,
});

const getFichaEditFnExito = (payload) => ({
    type: GET_FICHA_EDITAR_EXITO,
    payload,
});
const getFichaEditFnError = (payload) => ({
    type: GET_FICHA_EDITAR_ERROR,
    payload,
});

export const editarFicha = (payload) => {
    return async (dispatch) => {
        payload.id_programa = parseInt(payload.id_programa);
        try {
            dispatch(editarFichaFn());
            await client.patch(`/fichas/${payload.id_ficha}`, payload);
            dispatch(editarFichaFnExito());
            await Router.push('/dashboard/admin/fichas');
            toast.success('Ficha editada con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(editarFichaFnError(payload));
        }
    };
};
const editarFichaFn = () => ({
    type: EDITAR_FICHA_INIT,
});
const editarFichaFnExito = () => ({
    type: EDITAR_FICHA_EXITO,
});
const editarFichaFnError = () => ({
    type: EDITAR_FICHA_ERROR,
});

export const eliminarFicha = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(eliminarFichaFn());
            await client.delete(`/fichas/${payload}`);
            dispatch(eliminarFichaFnExito(payload));
            toast.success('Ficha eliminada con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(eliminarFichaFnError(e.response.data.message));
        }
    };
};

const eliminarFichaFn = () => ({
    type: ELIMINAR_FICHA_INIT,
});
const eliminarFichaFnExito = (payload) => ({
    type: ELIMINAR_FICHA_EXITO,
    payload,
});
const eliminarFichaFnError = (payload) => ({
    type: ELIMINAR_FICHA_ERROR,
    payload,
});

export const getAsignaturas = () => {
    return async (dispatch) => {
        try {
            dispatch(getAsignaturasFn());
            const res = await client.get('/asignaturas');
            dispatch(getAsignaturasFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getAsignaturasFnError());
        }
    };
};

const getAsignaturasFn = () => ({
    type: GET_ASIGNATURAS_INIT,
});
const getAsignaturasFnExito = (payload) => ({
    type: GET_ASIGNATURAS_EXITO,
    payload,
});
const getAsignaturasFnError = () => ({
    type: GET_ASIGNATURAS_ERROR,
});

export const crearAsociacion = (payload) => {
    return async (dispatch) => {
        try {
            payload.id_usuario = parseInt(payload.id_usuario);
            if (payload.id_asignatura) {
                payload.id_asignatura = parseInt(payload.id_asignatura);
            }
            dispatch(crearAsociacionFn());
            await client.post('/fichas/asociarUsuario', payload);
            dispatch(crearAsociacionFnExito());
            await Router.push(`/dashboard/admin/fichas/${payload.id_ficha}`);
            toast.success('Usuario asociado con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(crearAsociacionFnError(e.response.data.message));
        }
    };
};

const crearAsociacionFn = () => ({
    type: CREAR_ASOCIACION_INIT,
});
const crearAsociacionFnExito = () => ({
    type: CREAR_ASOCIACION_EXITO,
});
const crearAsociacionFnError = (payload) => ({
    type: CREAR_ASOCIACION_ERROR,
    payload,
});
