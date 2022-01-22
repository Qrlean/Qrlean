import * as React from 'react';
import Loader from 'react-loader-spinner';

const SubmitButton = ({ formik, isLoading, title, validationSchema }) => {
    return (
        <button
            className={
                formik.isValid && validationSchema.isValidSync(formik.values)
                    ? 'bg-red-500 rounded w-11/12 outline-none p-3 text-white text-base font-extrabold mx-auto my-6 '
                    : 'bg-red-300 rounded w-11/12 mx-auto outline-none p-3 text-white text-base font-extrabold my-6 cursor-not-allowed'
            }
            type={
                formik.isValid &&
                validationSchema.isValidSync(formik.values) &&
                'submit'
            }
        >
            {isLoading ? (
                <div className="flex flex-row justify-center items-center">
                    <Loader
                        type="Circles"
                        color="#FFFFFF"
                        height={24}
                        width={24}
                        className="mx-2"
                    />
                    Cargando...
                </div>
            ) : (
                title
            )}
        </button>
    );
};
export default SubmitButton;
