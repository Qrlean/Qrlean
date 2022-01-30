import {
    CREAR_CLASE_ERROR,
    CREAR_CLASE_EXITO,
    CREAR_CLASE_INIT,
    CREATE_ASISTENCIA_CLASE_ERROR,
    CREATE_ASISTENCIA_CLASE_EXITO,
    CREATE_ASISTENCIA_CLASE_INIT,
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
    crearClase: {
        state: null,
        loading: null,
    },
    getAsistenciasByClase: {
        state: null,
        loading: null,
        data: [],
    },
    crearAsitencia: {
        state: null,
        loading: null,
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
            state.asignaturaById.data = [];
            return state;
        case CREAR_CLASE_INIT:
            state.crearClase.state = 'loading';
            state.crearClase.loading = true;
            return state;
        case CREAR_CLASE_EXITO:
            state.crearClase.state = 'success';
            state.crearClase.loading = false;
            return state;
        case CREAR_CLASE_ERROR:
            state.crearClase.state = 'error';
            state.crearClase.loading = false;
            return state;
        case GET_ASISTENCIAS_CLASE_INIT:
            state.getAsistenciasByClase.state = 'loading';
            state.getAsistenciasByClase.loading = true;
            state.getAsistenciasByClase.data = {};
            return state;
        case GET_ASISTENCIAS_CLASE_EXITO:
            state.getAsistenciasByClase.state = 'success';
            state.getAsistenciasByClase.loading = false;
            state.getAsistenciasByClase.data = action.payload;
            return state;
        case GET_ASISTENCIAS_CLASE_ERROR:
            state.getAsistenciasByClase.state = 'error';
            state.getAsistenciasByClase.loading = false;
            state.getAsistenciasByClase.data = [];
            return state;
        case CREATE_ASISTENCIA_CLASE_INIT:
            state.crearAsitencia.state = 'loading';
            state.crearAsitencia.loading = true;
            return state;
        case CREATE_ASISTENCIA_CLASE_EXITO:
            state.crearAsitencia.state = 'success';
            state.crearAsitencia.loading = false;
            return state;
        case CREATE_ASISTENCIA_CLASE_ERROR:
            state.crearAsitencia.state = 'error';
            state.crearAsitencia.loading = false;
            return state;
        default:
            return state;
    }
}
