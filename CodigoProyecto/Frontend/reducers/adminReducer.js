import {
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    CREAR_USUARIO_INIT,
    GET_USUARIOS_ERROR,
    GET_USUARIOS_EXITO,
    GET_USUARIOS_INIT,
} from '../types';

const initialState = {
    users: {
        state: null,
        loading: null,
        data: [],
        error: null,
        createLoading: null,
    },
};

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USUARIOS_INIT:
            state.users.state = 'loading';
            state.users.loading = true;
            return state;
        case GET_USUARIOS_EXITO:
            state.users.data = action.payload;
            state.users.loading = false;
            state.users.state = 'success';
            state.users.error = null;
            return state;
        case GET_USUARIOS_ERROR:
            state.users.loading = false;
            state.users.state = 'error';
            state.users.error = action.payload;
            return state;
        case CREAR_USUARIO_INIT:
            state.users.createLoading = true;
            return state;
        case CREAR_USUARIO_EXITO:
            state.users.createLoading = false;
            return state;
        case CREAR_USUARIO_ERROR:
            state.users.createLoading = false;
            return state;
        default:
            return state;
    }
}
