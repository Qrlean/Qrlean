import {
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    CREAR_USUARIO_INIT,
    EDITAR_USUARIO_ERROR,
    EDITAR_USUARIO_EXITO,
    EDITAR_USUARIO_INIT,
    ELIMINAR_USUARIO_ERROR,
    ELIMINAR_USUARIO_EXITO,
    ELIMINAR_USUARIO_INIT,
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
        createLoading: null,
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
        default:
            return state;
    }
}
