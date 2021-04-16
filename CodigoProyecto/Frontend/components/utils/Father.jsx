import React from 'react';
import Loader from './Loader';
const Father = ({ children }) => {
    const loader = false;
    return (
        <>
            {loader && <Loader />}
            {children}
        </>
    );
};

export default Father;
