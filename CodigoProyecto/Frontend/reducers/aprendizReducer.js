import {
    GET_INFO_FICHA_APRENDIZ_INIT,
    GET_INFO_FICHA_APRENDIZ_EXITO,
    GET_INFO_FICHA_APRENDIZ_ERROR,
    GET_FICHASAPRENDIZ_INIT,
    GET_FICHASAPRENDIZ_EXITO,
    GET_FICHASAPRENDIZ_ERROR,
} from '../types';

const initialState = {
    fichas: {
        state: null,
        loading: null,
        data: [],
        error: null,
    },
    fichaById: {
        state: null,
        loading: null,
        data: {},
    },
};

export default function aprendizReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FICHASAPRENDIZ_INIT:
            state.fichas.state = 'loading';
            state.fichas.loading = true;
            return state;
        case GET_FICHASAPRENDIZ_EXITO:
            state.fichas.state = 'success';
            state.fichas.loading = false;
            state.fichas.data = action.payload;
            state.fichas.error = null;
            return state;
        case GET_FICHASAPRENDIZ_ERROR:
            state.fichas.state = 'error';
            state.fichas.loading = false;
            state.fichas.data = [];
            state.fichas.error = null;
            return state;
        case GET_INFO_FICHA_APRENDIZ_INIT:
            state.fichaById.state = 'loading';
            state.fichaById.loading = true;
            state.fichaById.data = {};
            return state;
        case GET_INFO_FICHA_APRENDIZ_EXITO:
            state.fichaById.state = 'success';
            state.fichaById.loading = false;
            state.fichaById.data = action.payload;
            return state;
        case GET_INFO_FICHA_APRENDIZ_ERROR:
            state.fichaById.state = 'error';
            state.fichaById.loading = false;
            return state;
        default:
            return state;
    }
}
