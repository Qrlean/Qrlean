import {
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
        default:
            return state;
    }
}
