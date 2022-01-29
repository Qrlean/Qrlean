import * as React from 'react';
import InputError from './InputError';

const CustomSelect = ({
    title,
    formik,
    keyName,
    options,
    wEmptyOption = true,
}) => {
    return (
        <div className="my-4">
            <label className="text-gray-800 text-xl w-full" htmlFor={keyName}>
                {title}
            </label>
            <InputError
                error={formik.errors[keyName]}
                touched={formik.touched[keyName]}
            />
            <select
                id={keyName}
                className="bg-white  text-gray-800 w-full outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500"
                name={keyName}
                onChange={formik.handleChange}
                value={formik.values[keyName]}
            >
                {wEmptyOption && <option value="">Seleccione su opcion</option>}
                {options.map((x) => (
                    <option key={x.value} value={x.value}>
                        {x.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default CustomSelect;
