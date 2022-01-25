import { client } from '../config/axios';
import { toast } from 'react-toastify';
import {
    GET_FICHASINSTRUCTOR_ERROR,
    GET_FICHASINSTRUCTOR_EXITO,
    GET_FICHASINSTRUCTOR_INIT,
} from '../types';

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
