import React from 'react';
import Avatar from 'react-avatar';

const ItemListaAdmin = ({ data }) => {
    return (
        <div className="w-11/12 bg-gray-100 shadow-lg h-16 py-8 my-2 rounded-lg flex flex-row justify-center items-center border-t-2 border-orange-500">
            <Avatar
                color="#FF914D"
                size="50"
                round={10}
                name="camilo garcia"
                className="mx-2"
            />
            <div className="flex flex-col justify-center items-center flex-1">
                <h1 className="text-center text-gray-800 mx-auto flex-1 text-base">
                    Camilo García López
                </h1>
                <p className="text-center text-gray-600 text-sm mx-auto">
                    Instructor
                </p>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-1 mr-2 fill-current text-gray-800"
                viewBox="0 0 16 16"
            >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                <path
                    fillRule="evenodd"
                    d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                />
            </svg>
        </div>
    );
};

export default ItemListaAdmin;
