import React from 'react';
const ItemAprendiz = () => {
    return (
        <>
            <div
                className="h-20 flex flex-row justify-center items-center text-xl text-gray-800 border-gray-800 my-4 rounded shadow-lg"
                style={{ border: '1px solid' }}
            >
                <h1 className="flex-1 text-left ml-8">Dora Espinosa</h1>
                <select
                    name=""
                    id=""
                    className="mx-8 rounded outline-none text-center"
                    disabled
                    value="Asistió"
                >
                    <option value="Ninguna" className="text-center">
                        Ninguna
                    </option>
                    <option value="Asistió" className="text-center">
                        Asistió
                    </option>
                    <option value="No asistió" className="text-center">
                        No asistió
                    </option>
                    <option
                        value="No asistió (justificado)"
                        className="text-center"
                    >
                        No asistió (justificado)
                    </option>
                    <option
                        value="Asistencia con retraso"
                        className="text-center"
                    >
                        Asistencia con retraso
                    </option>
                </select>
            </div>
        </>
    );
};

export default ItemAprendiz;
