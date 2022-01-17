import * as React from 'react';
import { useRouter } from 'next/router';

const CreateButton = ({ path, title }) => {
    const router = useRouter();
    return (
        <div className="flex-1 h-8/12 flex flex-row justify-end xl:mx-28 mx-4 rounded">
            <button
                onClick={() => router.push(path)}
                className="capitalize outline-none bg-orange-300 rounded-lg text-xl text-gray-800 px-4 shadow-lg  border-black border border-double"
            >
                {title}
            </button>
        </div>
    );
};
export default CreateButton;
