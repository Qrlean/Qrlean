import * as React from 'react';
import { useRouter } from 'next/router';
import ArrowBack from '../../../svg/arrowback.svg';

const CustomForm = ({ formik, children, title, pathToBack }) => {
    const router = useRouter();
    return (
        <div className="h-full w-full overflow-y-auto bg-gray-300 flex flex-col py-6">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center w-full lg:w-2/6 mx-auto rounded relative shadow-xl bg-white border-t-4 border-orange-600 p-4"
                autoComplete="off"
            >
                <ArrowBack
                    className="cursor-pointer top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-2 md:m-4 "
                    onClick={() => router.push(pathToBack)}
                />
                <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                    {title}
                </h1>
                {children}
            </form>
        </div>
    );
};
export default CustomForm;
