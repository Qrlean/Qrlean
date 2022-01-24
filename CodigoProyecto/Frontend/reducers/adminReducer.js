import {
    CREAR_ASOCIACION_ERROR,
    CREAR_ASOCIACION_EXITO,
    CREAR_ASOCIACION_INIT,
    CREAR_FICHA_ERROR,
    CREAR_FICHA_EXITO,
    CREAR_FICHA_INIT,
    CREAR_USUARIO_ERROR,
    CREAR_USUARIO_EXITO,
    CREAR_USUARIO_INIT,
    DELETE_ASOCIACION_ERROR,
    DELETE_ASOCIACION_EXITO,
    DELETE_ASOCIACION_INIT,
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
    GET_ASIGNATURAS_ERROR,
    GET_ASIGNATURAS_EXITO,
    GET_ASIGNATURAS_INIT,
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
    GET_USUARIOSASOCIAR_ERROR,
    GET_USUARIOSASOCIAR_EXITO,
    GET_USUARIOSASOCIAR_INIT,
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
        usersAsociar: {
            state: null,
            loading: null,
            data: [],
            error: null,
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
            editingLoading: null,
        },
        deleteFicha: {
            state: null,
            loading: null,
        },
        asociarUsuario: {
            state: null,
            loading: null,
        },
        desasociarUsuario: {
            state: null,
            loading: null,
        },
    },
    fichaById: {
        state: null,
        loading: null,
        data: {},
    },
    programas: {
        state: null,
        loading: null,
        data: [],
    },
    asignaturas: {
        state: null,
        loading: null,
        data: [],
    },
    ciudades: {
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
        case GET_CIUDADES_INIT:
            state.ciudades.state = 'loading';
            state.ciudades.loading = true;
            return state;
        case GET_CIUDADES_EXITO:
            state.ciudades.state = 'success';
            state.ciudades.loading = false;
            state.ciudades.data = action.payload;
            return state;
        case GET_CIUDADES_ERROR:
            state.ciudades.state = 'error';
            state.ciudades.data = [];
            state.ciudades.loading = false;
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
            state.fichaById.state = 'loading';
            state.fichaById.loading = true;
            state.fichaById.data = {};
            return state;
        case GET_FICHA_EDITAR_EXITO:
            state.fichaById.state = 'success';
            state.fichaById.loading = false;
            state.fichaById.data = action.payload;
            return state;
        case GET_FICHA_EDITAR_ERROR:
            state.fichaById.state = 'error';
            state.fichaById.loading = false;
            return state;
        case EDITAR_FICHA_INIT:
            state.fichas.editFicha.editingLoading = true;
            return state;
        case EDITAR_FICHA_EXITO:
            state.fichaById.state = null;
            state.fichaById.loading = null;
            state.fichaById.data = null;
            state.fichas.editFicha.editingLoading = false;
            return state;
        case EDITAR_FICHA_ERROR:
            state.fichas.editFicha.editingLoading = false;
            return state;
        case ELIMINAR_FICHA_INIT:
            state.fichas.deleteFicha.state = 'loading';
            state.fichas.deleteFicha.loading = true;
            return state;
        case ELIMINAR_FICHA_ERROR:
            state.fichas.deleteFicha.state = 'success';
            state.fichas.deleteFicha.loading = false;
            return state;
        case ELIMINAR_FICHA_EXITO:
            state.fichas.data = state.fichas.data.filter(
                (x) => x.id_ficha !== action.payload,
            );
            state.fichas.deleteFicha.state = 'error';
            state.fichas.deleteFicha.loading = false;
            return state;
        case GET_ASIGNATURAS_INIT:
            state.asignaturas.state = 'loading';
            state.asignaturas.loading = true;
            return state;
        case GET_ASIGNATURAS_EXITO:
            state.asignaturas.state = 'success';
            state.asignaturas.loading = false;
            state.asignaturas.data = action.payload;
            return state;
        case GET_ASIGNATURAS_ERROR:
            state.asignaturas.state = 'error';
            state.asignaturas.data = [];
            state.asignaturas.loading = false;
            return state;
        case CREAR_ASOCIACION_INIT:
            state.fichas.asociarUsuario.state = 'loading';
            state.fichas.asociarUsuario.loading = true;
            return state;
        case CREAR_ASOCIACION_EXITO:
            state.fichas.asociarUsuario.state = 'success';
            state.fichas.asociarUsuario.loading = false;
            return state;
        case CREAR_ASOCIACION_ERROR:
            state.fichas.asociarUsuario.state = 'error';
            state.fichas.asociarUsuario.loading = false;
            return state;
        case DELETE_ASOCIACION_INIT:
            state.fichas.desasociarUsuario.state = 'loading';
            state.fichas.desasociarUsuario.loading = true;
            return state;
        case DELETE_ASOCIACION_EXITO:
            state.fichas.desasociarUsuario.state = 'success';
            state.fichas.desasociarUsuario.loading = false;
            return state;
        case DELETE_ASOCIACION_ERROR:
            state.fichas.desasociarUsuario.state = 'error';
            state.fichas.desasociarUsuario.loading = false;
            return state;
        case GET_USUARIOSASOCIAR_INIT:
            state.users.usersAsociar.state = 'loading';
            state.users.usersAsociar.loading = true;
            return state;
        case GET_USUARIOSASOCIAR_EXITO:
            state.users.usersAsociar.data = action.payload;
            state.users.usersAsociar.loading = false;
            state.users.usersAsociar.state = 'success';
            state.users.usersAsociar.error = null;
            return state;
        case GET_USUARIOSASOCIAR_ERROR:
            state.users.usersAsociar.loading = false;
            state.users.usersAsociar.state = 'error';
            state.users.usersAsociar.error = action.payload;
            state.users.usersAsociar.data = [];
            return state;
        default:
            return state;
    }
}
