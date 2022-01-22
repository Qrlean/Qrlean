import * as React from 'react';
import InputError from './InputError';

const CustomInput = ({ title, formik, keyName }) => {
    return (
        <div>
            <label
                className="text-gray-800 text-xl mt-4 w-full"
                htmlFor={keyName}
            >
                {title}
            </label>
            <InputError
                error={formik.errors[keyName]}
                touched={formik.touched[keyName]}
            />
            <input
                className="text-gray-800 shadow-xl w-full outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4 "
                type="text"
                id={keyName}
                name={keyName}
                placeholder={`Ingrese el valor al campo ${title.toLowerCase()}`}
                onChange={formik.handleChange}
                value={formik.values[keyName]}
            />
        </div>
    );
};
export default CustomInput;
