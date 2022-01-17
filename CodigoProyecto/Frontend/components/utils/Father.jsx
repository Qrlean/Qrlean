import React, { useEffect } from 'react';
import { firstCall } from '../../actions/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/shared/Loader';

const Father = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(firstCall());
    }, []);
    const firtCallIsLoading = useSelector(
        (store) => store.app.auth.firstCallLoading,
    );
    return (
        <>
            {firtCallIsLoading ? <Loader /> : null}
            {children}
        </>
    );
};

export default Father;
