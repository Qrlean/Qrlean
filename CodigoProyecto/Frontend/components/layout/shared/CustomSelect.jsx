import * as React from 'react';
import InputError from './InputError';

const CustomSelect = ({ title, formik, keyName, options }) => {
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
            <select
                id={keyName}
                className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                name={keyName}
                onChange={formik.handleChange}
                value={formik.values[keyName]}
            >
                <option value="">Seleccione su opcion</option>
                {options.map((x) => (
                    <option key={x.value} value={x.value}>
                        {x.name}
                    </option>
                ))}
            </select>
        </>
    );
};
export default CustomSelect;
