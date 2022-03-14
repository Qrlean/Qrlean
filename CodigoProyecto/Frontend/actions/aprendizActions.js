import { client } from '../config/axios';
import { toast } from 'react-toastify';
import {
    GET_FICHASAPRENDIZ_ERROR,
    GET_FICHASAPRENDIZ_EXITO,
    GET_FICHASAPRENDIZ_INIT,
    GET_INFO_FICHA_APRENDIZ_ERROR,
    GET_INFO_FICHA_APRENDIZ_EXITO,
    GET_INFO_FICHA_APRENDIZ_INIT,
    SIGN_ASISTENCIA_INIT,
    SIGN_ASISTENCIA_EXITO,
    SIGN_ASISTENCIA_ERROR,
} from '../types';
export const getInfoFicha = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(getInfoFichaFn());
            const res = await client.get(`/fichas/${payload}`);
            dispatch(getInfoFichaFnExito(res.data));
        } catch (e) {
            toast.error(
                Array.isArray(e.response.data.message)
                    ? e.response.data.message[0]
                    : e.response.data.message,
            );
            dispatch(getInfoFichaFnError(e.response.data.message));
        }
    };
};

const getInfoFichaFn = () => ({
    type: GET_INFO_FICHA_APRENDIZ_INIT,
});
const getInfoFichaFnExito = (payload) => ({
    type: GET_INFO_FICHA_APRENDIZ_EXITO,
    payload,
});
const getInfoFichaFnError = (payload) => ({
    type: GET_INFO_FICHA_APRENDIZ_ERROR,
    payload,
});

export const getFichas = () => {
    return async (dispatch) => {
        try {
            dispatch(getFichasFn());
            const res = await client.get('/fichas');
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
    type: GET_FICHASAPRENDIZ_INIT,
});

const getFichasFnExito = (payload) => ({
    type: GET_FICHASAPRENDIZ_EXITO,
    payload,
});
const getFichasFnError = (payload) => ({
    type: GET_FICHASAPRENDIZ_ERROR,
    payload,
});

export const signAsistencia = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(signAsistenciaFn());
            await client.post(`asistencias/sign/${payload}`);
            toast.success('Se firmo correctamente');
            dispatch(signAsistenciaFnExito());
        } catch (e) {
            toast.error(e.response.data.message);
            dispatch(signAsistenciaFnError());
        }
    };
};
const signAsistenciaFn = () => ({
    type: SIGN_ASISTENCIA_INIT,
});
const signAsistenciaFnExito = () => ({
    type: SIGN_ASISTENCIA_EXITO,
});
const signAsistenciaFnError = () => ({
    type: SIGN_ASISTENCIA_ERROR,
});
