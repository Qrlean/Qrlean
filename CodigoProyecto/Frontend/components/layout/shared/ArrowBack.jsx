import * as React from 'react';
import ArrowBackTwo from '../../../svg/arrowback2.svg';
const ArrowBack = ({ onClick }) => {
    return (
        <ArrowBackTwo
            onClick={onClick}
            className="xl:ml-28 ml-4 h-8/12  fill-current text-gray-800 cursor-pointer"
        />
    );
};
export default ArrowBack;
