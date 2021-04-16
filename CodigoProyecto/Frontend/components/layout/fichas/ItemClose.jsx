import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Modal from '../../utils/Modal';
const ItemClose = ({ data, openItem }) => {
    const [modal, setModal] = useState(false);
    return (
        <>
            <Modal titulo="Eliminar programa" state={modal} setState={setModal}>
                <div className="flex flex-col text-justify w-full h-full">
                    <h2 className="text-center text-3xl text-red-500 font-semibold my-4">
                        Advertencia.
                    </h2>
                    <p className="text-red-400 text-base my-4">
                        Si desactivas el curso automáticamente se desasociaran
                        los usuarios de este , se desactivaran todas las fechas
                        de asistencia que hayan sido creadas y ninguna persona
                        podrá acceder a este.
                    </p>
                    <h2 className="text-center text-2xl text-red-500 font-semibold my-4">
                        ¿Esta segur@ de seguir?
                    </h2>
                    <div className="flex-1 flex flex-row justify-center items-center">
                        <button
                            className="bg-orange-500 text-white text-1xl mx-4 p-4 rounded-lg outline-none"
                            onClick={() => setModal(false)}
                        >
                            No,cancelar operación.
                        </button>
                        <button
                            className="bg-orange-500 text-white text-1xl mx-4 p-4 rounded-lg outline-none"
                            onClick={() => setModal(false)}
                        >
                            Si,realizar operación.
                        </button>
                    </div>
                </div>
            </Modal>
            <motion.div
                layoutId="item-expandible"
                className="bg-white rounded-lg p-1 w-full lg:w-2/5 h-40 m-3 cursor-pointer flex flex-col justify-center items-center"
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
                onClick={() => openItem()}
            >
                <div className="flex flex-row items-center h-full w-full">
                    <motion.div
                        layoutId="contenido"
                        className="flex flex-col justify-center items-start mx-4 h-full py-6 flex-1"
                    >
                        <motion.h1
                            layoutId="titulo"
                            className="capitalize text-sm font-semibold md:text-xl text-left text-gray-800"
                        >
                            Numero: {data.numero}
                        </motion.h1>
                        <motion.h2
                            layoutId="id"
                            className="text-xs md:text-base text-left text-gray-800"
                        >
                            Id: {data._id}
                        </motion.h2>
                        <motion.h2
                            layoutId="cursos"
                            className="text-xs md:text-base text-left text-gray-800"
                        >
                            Numero de personas asociadas: {data.personas.length}
                        </motion.h2>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ItemClose;
