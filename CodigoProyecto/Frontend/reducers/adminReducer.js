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
    ELIMINAR_USUARIO_ERROR,
    ELIMINAR_USUARIO_EXITO,
    ELIMINAR_USUARIO_INIT,
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
} from '../types';

const initialState = {
    users: {
        state: null,
        loading: null,
        data: [],
        error: null,
        createUser: {
            state: null,
            loading: null,
        },
        editUser: {
            state: null,
            loading: null,
            data: {},
            editingLoading: null,
        },
        deleteUser: {
            state: null,
            loading: null,
        },
    },
    fichas: {
        state: null,
        loading: null,
        data: [],
        error: null,
        createFicha: {
            state: null,
            loading: null,
        },
        editFicha: {
            state: null,
            loading: null,
            data: {},
            editingLoading: null,
        },
    },
    programas: {
        state: null,
        loading: null,
        data: [],
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
            state.users.data = [];
            return state;
        case CREAR_USUARIO_INIT:
            state.users.createUser.state = 'loading';
            state.users.createUser.loading = true;
            return state;
        case CREAR_USUARIO_EXITO:
            state.users.createUser.state = 'success';
            state.users.createUser.loading = false;
            return state;
        case CREAR_USUARIO_ERROR:
            state.users.createUser.state = 'error';
            state.users.createUser.loading = false;
            return state;
        case GET_USUARIO_EDITAR_INIT:
            state.users.editUser.state = 'loading';
            state.users.editUser.loading = true;
            return state;
        case GET_USUARIO_EDITAR_EXITO:
            state.users.editUser.state = 'success';
            state.users.editUser.loading = false;
            state.users.editUser.data = action.payload;
            return state;
        case GET_USUARIO_EDITAR_ERROR:
            state.users.editUser.state = 'error';
            state.users.editUser.loading = false;
            return state;
        case EDITAR_USUARIO_INIT:
            state.users.editUser.editingLoading = true;
            return state;
        case EDITAR_USUARIO_EXITO:
            state.users.editUser.state = null;
            state.users.editUser.loading = null;
            state.users.editUser.data = null;
            state.users.editUser.editingLoading = false;
            return state;
        case EDITAR_USUARIO_ERROR:
            state.users.editUser.editingLoading = false;
            return state;
        case ELIMINAR_USUARIO_INIT:
            state.users.deleteUser.state = 'loading';
            state.users.deleteUser.loading = true;
            return state;
        case ELIMINAR_USUARIO_ERROR:
            state.users.deleteUser.state = 'success';
            state.users.deleteUser.loading = false;
            return state;
        case ELIMINAR_USUARIO_EXITO:
            state.users.data = state.users.data.filter(
                (x) => x.id_usuario !== action.payload,
            );
            state.users.deleteUser.state = 'error';
            state.users.deleteUser.loading = false;
            return state;
        case GET_FICHAS_INIT:
            state.fichas.state = 'loading';
            state.fichas.loading = true;
            return state;
        case GET_FICHAS_EXITO:
            state.fichas.state = 'success';
            state.fichas.loading = false;
            state.fichas.data = action.payload;
            state.fichas.error = null;
            return state;
        case GET_FICHAS_ERROR:
            state.fichas.state = 'error';
            state.fichas.loading = false;
            state.fichas.data = [];
            state.fichas.error = null;
            return state;
        case GET_PROGRAMAS_INIT:
            state.programas.state = 'loading';
            state.programas.loading = true;
            return state;
        case GET_PROGRAMAS_EXITO:
            state.programas.state = 'success';
            state.programas.loading = false;
            state.programas.data = action.payload;
            return state;
        case GET_PROGRAMAS_ERROR:
            state.programas.state = 'error';
            state.programas.data = [];
            state.programas.loading = false;
            return state;
        case CREAR_FICHA_INIT:
            state.fichas.createFicha.state = 'loading';
            state.fichas.createFicha.loading = true;
            return state;
        case CREAR_FICHA_EXITO:
            state.fichas.createFicha.state = 'success';
            state.fichas.createFicha.loading = false;
            return state;
        case CREAR_FICHA_ERROR:
            state.fichas.createFicha.state = 'error';
            state.fichas.createFicha.loading = false;
            return state;
        case GET_FICHA_EDITAR_INIT:
            state.fichas.editFicha.state = 'loading';
            state.fichas.editFicha.loading = true;
            return state;
        case GET_FICHA_EDITAR_EXITO:
            state.fichas.editFicha.state = 'success';
            state.fichas.editFicha.loading = false;
            state.fichas.editFicha.data = action.payload;
            return state;
        case GET_FICHA_EDITAR_ERROR:
            state.fichas.editFicha.state = 'error';
            state.fichas.editFicha.loading = false;
            return state;
        case EDITAR_FICHA_INIT:
            state.fichas.editFicha.editingLoading = true;
            return state;
        case EDITAR_FICHA_EXITO:
            state.fichas.editFicha.state = null;
            state.fichas.editFicha.loading = null;
            state.fichas.editFicha.data = null;
            state.fichas.editFicha.editingLoading = false;
            return state;
        case EDITAR_FICHA_ERROR:
            state.fichas.editFicha.editingLoading = false;
            return state;
        default:
            return state;
    }
}
