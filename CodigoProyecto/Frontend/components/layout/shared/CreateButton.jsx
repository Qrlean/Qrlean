import * as React from 'react';
import { useRouter } from 'next/router';

const CreateButton = ({ path, title }) => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(path)}
            className="outline-none bg-orange-300 rounded-lg text-xl text-gray-800 px-2 shadow-lg font-bold"
        >
            {title}
        </button>
    );
};
export default CreateButton;
