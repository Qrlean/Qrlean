import * as React from 'react';
import FormArrowBack from './FormArrowBack';
import { useRouter } from 'next/router';

const CustomForm = ({ formik, children, title, pathToBack }) => {
    const router = useRouter();
    return (
        <div className="h-full w-full overflow-y-scroll bg-gray-300 flex flex-col py-6">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center w-full lg:w-2/6 mx-auto rounded relative shadow-xl bg-white border-t-4 border-orange-600"
                autoComplete="off"
            >
                <FormArrowBack onClick={() => router.push(pathToBack)} />
                <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                    {title}
                </h1>
                {children}
            </form>
        </div>
    );
};
export default CustomForm;
