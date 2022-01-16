import React from 'react';
import Avatar from 'react-avatar';

const ItemPersonaAsistencia = () => {
    return (
        <div
            className="w-full lg:w-1/4 my-4 lg:m-4 h-64 rounded shadow-lg flex flex-col justify-start items-center border-gray-500 text-gray-800 bg-white"
            style={{ border: '1px solid' }}
        >
            <Avatar
                color="#FF914D"
                size="90"
                round={10}
                name="camilo garcia"
                className="my-2"
            />
            <h1 className="text-center my-2 text-xl ">Camilo García López</h1>
            <p className="text-xm  text-center">1001277963 TI</p>
            <p className="text-xm text-center">3 Fallas en Programación</p>
        </div>
    );
};

export default ItemPersonaAsistencia;
