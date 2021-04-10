import React from 'react';
import Loader from './Loader'
const Father = ({children}) => {
    let loader = false;
    return (
        <>
            {loader 
                && 
            <Loader/>}
            {children}
        </>
    );
}
 
export default Father;