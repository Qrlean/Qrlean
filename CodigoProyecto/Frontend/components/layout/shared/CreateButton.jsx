import * as React from 'react';
import { useRouter } from 'next/router';

const CreateButton = ({ path, title }) => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(path)}
            className="capitalize outline-none bg-orange-300 rounded-lg text-xl text-gray-800 px-4 shadow-lg"
        >
            {title}
        </button>
    );
};
export default CreateButton;
