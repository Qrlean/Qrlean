import { client } from '../config/axios';
import { toast } from 'react-toastify';
import {
    CREAR_CLASE_ERROR,
    CREAR_CLASE_EXITO,
    CREAR_CLASE_INIT,
    CREATE_ASISTENCIA_CLASE_ERROR,
    CREATE_ASISTENCIA_CLASE_EXITO,
    CREATE_ASISTENCIA_CLASE_INIT,
    ELIMINAR_CLASE_ERROR,
    ELIMINAR_CLASE_EXITO,
    ELIMINAR_CLASE_INIT,
    GET_ASIGNATURA_ERROR,
    GET_ASIGNATURA_EXITO,
    GET_ASIGNATURA_INIT,
    GET_ASISTENCIAS_CLASE_ERROR,
    GET_ASISTENCIAS_CLASE_EXITO,
    GET_ASISTENCIAS_CLASE_INIT,
    GET_FICHAINSTRUCTOR_EDITAR_ERROR,
    GET_FICHAINSTRUCTOR_EDITAR_EXITO,
    GET_FICHAINSTRUCTOR_EDITAR_INIT,
    GET_FICHASINSTRUCTOR_ERROR,
    GET_FICHASINSTRUCTOR_EXITO,
    GET_FICHASINSTRUCTOR_INIT,
} from '../types';
import Router from 'next/router';

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
    type: GET_FICHASINSTRUCTOR_INIT,
});

const getFichasFnExito = (payload) => ({
    type: GET_FICHASINSTRUCTOR_EXITO,
    payload,
});
const getFichasFnError = (payload) => ({
    type: GET_FICHASINSTRUCTOR_ERROR,
    payload,
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
    type: GET_FICHAINSTRUCTOR_EDITAR_INIT,
});

const getFichaEditFnExito = (payload) => ({
    type: GET_FICHAINSTRUCTOR_EDITAR_EXITO,
    payload,
});
const getFichaEditFnError = (payload) => ({
    type: GET_FICHAINSTRUCTOR_EDITAR_ERROR,
    payload,
});

export const getAsignaturaById = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getAsignaturaFn());
            const res = await client.get(
                `/asignaturas/asignaturaFicha/${payload}`,
            );
            dispatch(getAsignaturaFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getAsignaturaFnError(e.response.data.message));
        }
    };
};

const getAsignaturaFn = () => ({
    type: GET_ASIGNATURA_INIT,
});

const getAsignaturaFnExito = (payload) => ({
    type: GET_ASIGNATURA_EXITO,
    payload,
});
const getAsignaturaFnError = (payload) => ({
    type: GET_ASIGNATURA_ERROR,
    payload,
});
export const createClase = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(createClaseFn());
            const res = await client.post(
                `/clases/${payload.id_asociacion_asignatura_ficha}`,
                payload,
            );
            await Router.push(
                `/dashboard/instructor/fichas/${Router.query.id_ficha}/${Router.query.id_materia}`,
            );
            toast.success('Ficha creada con exito');
            dispatch(createClaseFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(createClaseFnError(e.response.data.message));
        }
    };
};

const createClaseFn = () => ({
    type: CREAR_CLASE_INIT,
});

const createClaseFnExito = (payload) => ({
    type: CREAR_CLASE_EXITO,
    payload,
});
const createClaseFnError = (payload) => ({
    type: CREAR_CLASE_ERROR,
    payload,
});
export const getAsistenciasClase = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getAsistenciasClaseFn());
            const res = await client.get(
                `/asistencias/getAsistenciasByClase/${payload}`,
            );
            dispatch(getAsistenciasClaseFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getAsistenciasClaseFnError(e.response.data.message));
        }
    };
};

const getAsistenciasClaseFn = () => ({
    type: GET_ASISTENCIAS_CLASE_INIT,
});

const getAsistenciasClaseFnExito = (payload) => ({
    type: GET_ASISTENCIAS_CLASE_EXITO,
    payload,
});
const getAsistenciasClaseFnError = (payload) => ({
    type: GET_ASISTENCIAS_CLASE_ERROR,
    payload,
});
export const createAsistencias = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        try {
            dispatch(createAsistenciasFn());
            const res = await client.post(
                `/asistencias/bulk/clase/${payload.id_clase}`,
                payload,
            );
            await Router.push(
                `/dashboard/instructor/fichas/${Router.query.id_ficha}/${Router.query.id_materia}`,
            );
            toast.success('Asistencia guardada con exito');
            dispatch(createAsistenciasFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(createAsistenciasFnError(e.response.data.message));
        }
    };
};

const createAsistenciasFn = () => ({
    type: CREATE_ASISTENCIA_CLASE_INIT,
});

const createAsistenciasFnExito = (payload) => ({
    type: CREATE_ASISTENCIA_CLASE_EXITO,
    payload,
});
const createAsistenciasFnError = (payload) => ({
    type: CREATE_ASISTENCIA_CLASE_ERROR,
    payload,
});

export const eliminarClase = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(eliminarClaseFn());
            await client.delete(`/clases/${payload}`);
            dispatch(eliminarClaseFnExito(payload));
            toast.success('Clase eliminada con exito.');
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(eliminarClaseFnError(e.response.data.message));
        }
    };
};

const eliminarClaseFn = () => ({
    type: ELIMINAR_CLASE_INIT,
});
const eliminarClaseFnExito = (payload) => ({
    type: ELIMINAR_CLASE_EXITO,
    payload,
});
const eliminarClaseFnError = (payload) => ({
    type: ELIMINAR_CLASE_ERROR,
    payload,
});
