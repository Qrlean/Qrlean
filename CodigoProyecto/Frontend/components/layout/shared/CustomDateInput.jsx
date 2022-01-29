import * as React from 'react';
import InputError from './InputError';

const CustomDateInput = ({ title, formik, keyName, children }) => {
    return (
        <div className="my-4">
            <label className="text-gray-800 text-xl  w-full" htmlFor={keyName}>
                {title}
            </label>
            <InputError
                error={formik.errors[keyName]}
                touched={formik.touched[keyName]}
            />
            {children}
        </div>
    );
};
export default CustomDateInput;
