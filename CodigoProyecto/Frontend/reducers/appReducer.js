const initialState = {
    user: { user: null, loading: null, error: null },
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
