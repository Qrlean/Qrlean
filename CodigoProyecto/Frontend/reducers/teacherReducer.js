import {
    GET_ASIGNATURA_ERROR,
    GET_ASIGNATURA_EXITO,
    GET_ASIGNATURA_INIT,
    GET_FICHAINSTRUCTOR_EDITAR_ERROR,
    GET_FICHAINSTRUCTOR_EDITAR_EXITO,
    GET_FICHAINSTRUCTOR_EDITAR_INIT,
    GET_FICHASINSTRUCTOR_ERROR,
    GET_FICHASINSTRUCTOR_EXITO,
    GET_FICHASINSTRUCTOR_INIT,
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
    asignaturaById: {
        state: null,
        loading: null,
        data: {},
    },
};

export default function teacherReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FICHASINSTRUCTOR_INIT:
            state.fichas.state = 'loading';
            state.fichas.loading = true;
            return state;
        case GET_FICHASINSTRUCTOR_EXITO:
            state.fichas.state = 'success';
            state.fichas.loading = false;
            state.fichas.data = action.payload;
            state.fichas.error = null;
            return state;
        case GET_FICHASINSTRUCTOR_ERROR:
            state.fichas.state = 'error';
            state.fichas.loading = false;
            state.fichas.data = [];
            state.fichas.error = null;
            return state;
        case GET_FICHAINSTRUCTOR_EDITAR_INIT:
            state.fichaById.state = 'loading';
            state.fichaById.loading = true;
            state.fichaById.data = {};
            return state;
        case GET_FICHAINSTRUCTOR_EDITAR_EXITO:
            state.fichaById.state = 'success';
            state.fichaById.loading = false;
            state.fichaById.data = action.payload;
            return state;
        case GET_FICHAINSTRUCTOR_EDITAR_ERROR:
            state.fichaById.state = 'error';
            state.fichaById.loading = false;
            return state;
        case GET_ASIGNATURA_INIT:
            state.asignaturaById.state = 'loading';
            state.asignaturaById.loading = true;
            state.asignaturaById.data = {};
            return state;
        case GET_ASIGNATURA_EXITO:
            state.asignaturaById.state = 'success';
            state.asignaturaById.loading = false;
            state.asignaturaById.data = action.payload;
            return state;
        case GET_ASIGNATURA_ERROR:
            state.asignaturaById.state = 'error';
            state.asignaturaById.loading = false;
            return state;
        default:
            return state;
    }
}
