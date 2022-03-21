import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_EXITO,
    CHANGE_PASSWORD_INIT,
    FIRST_CALL_ERROR,
    FIRST_CALL_EXITO,
    FIRST_CALL_INIT,
    LOGIN_ERROR,
    LOGIN_EXITO,
    LOGIN_INIT,
    LOGOUT,
    LOGOUT_INIT,
    SIGN_ASISTENCIA_ERROR,
    SIGN_ASISTENCIA_EXITO,
    SIGN_ASISTENCIA_INIT,
} from '../types';

const initialState = {
    auth: {
        state: 'loading',
        user: null,
        firstCallLoading: true,
        loginLoading: false,
    },
    signAsistencia: {
        state: null,
    },
    changePassword: {
        state: null,
        loading: null,
    },
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case FIRST_CALL_INIT:
            state.auth.firstCallLoading = true;
            return state;
        case FIRST_CALL_EXITO:
            state.auth.firstCallLoading = false;
            state.auth.user = action.payload;
            state.auth.state = 'auth';
            return state;
        case FIRST_CALL_ERROR:
            state.auth.firstCallLoading = false;
            state.auth.state = 'unauth';
            return state;
        case LOGIN_INIT:
            state.auth.loginLoading = true;
            return state;
        case LOGIN_EXITO:
            state.auth.loginLoading = false;
            state.auth.user = action.payload;
            state.auth.state = 'auth';
            return state;
        case LOGIN_ERROR:
            state.auth.state = 'unauth';
            state.auth.loginLoading = false;
            return state;
        case LOGOUT:
            state.auth.state = 'unauth';
            state.auth.loginLoading = false;
            state.auth.firstCallLoading = false;
            state.auth.user = null;
            state.auth.logoutLoading = false;
            return state;
        case LOGOUT_INIT:
            state.auth.state = 'loading';
            state.auth.logoutLoading = true;
            return state;
        case SIGN_ASISTENCIA_INIT:
            state.signAsistencia.state = 'loading';
            return state;
        case SIGN_ASISTENCIA_EXITO:
            state.signAsistencia.state = 'success';
            return state;
        case SIGN_ASISTENCIA_ERROR:
            state.signAsistencia.state = 'error';
            return state;
        case CHANGE_PASSWORD_INIT:
            state.changePassword.state = 'loading';
            state.changePassword.loading = true;
            return state;
        case CHANGE_PASSWORD_EXITO:
            state.changePassword.state = 'success';
            state.changePassword.loading = false;
            return state;
        case CHANGE_PASSWORD_ERROR:
            state.changePassword.state = 'error';
            state.changePassword.loading = false;
            return state;
        default:
            return state;
    }
}
