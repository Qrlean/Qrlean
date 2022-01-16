import {
    FIRST_CALL_ERROR,
    FIRST_CALL_EXITO,
    FIRST_CALL_INIT,
    LOGIN_ERROR,
    LOGIN_EXITO,
    LOGIN_INIT,
    LOGOUT,
    LOGOUT_INIT,
} from '../types';

const initialState = {
    auth: {
        state: 'loading',
        user: null,
        firstCallLoading: true,
        loginLoading: false,
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
        default:
            return state;
    }
}
