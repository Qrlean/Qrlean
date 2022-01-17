import * as React from 'react';
import InputError from './InputError';

const CustomInput = ({ title, formik, keyName }) => {
    return (
        <>
            <label
                className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                htmlFor={keyName}
            >
                {title}
            </label>
            <InputError
                error={formik.errors[keyName]}
                touched={formik.touched[keyName]}
            />
            <input
                className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4 "
                type="text"
                id={keyName}
                name={keyName}
                placeholder={`Ingrese el valor al campo ${title}`}
                onChange={formik.handleChange}
                value={formik.values[keyName]}
            />
        </>
    );
};
export default CustomInput;
