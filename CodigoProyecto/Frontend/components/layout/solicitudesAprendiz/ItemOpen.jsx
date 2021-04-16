import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Avatar from 'react-avatar';

import Modal from '../../utils/Modal';
const ItemOpen = ({ data, closeItem }) => {
    const [modal, setModal] = useState(false);
    const router = useRouter();
    return (
        <>
            <Modal
                titulo="Eliminar solicitud"
                state={modal}
                setState={setModal}
            >
                <div className="flex flex-col text-justify w-full h-full">
                    <h2 className="text-center text-3xl text-red-500 font-semibold my-4">
                        Advertencia.
                    </h2>
                    <p className="text-red-400 text-base my-4 text-center">
                        Si cierra esta solicitud de cambio de asistencia el
                        instructor no podrá verla.
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
                className="bg-white rounded-lg w-full lg:w-4/5 h-85 m-3 overflow-x-hidden max-w-full flex flex-col justify-center items-center"
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
            >
                <div className="flex flex-row items-center h-full w-full  relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="m-6 absolute left-0 top-0 h-10 w-10 fill-current text-gray-800 cursor-pointer"
                        onClick={() => closeItem()}
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                        />
                    </svg>
                    <motion.div
                        layoutId="contenido"
                        className="flex flex-col justify-center items-start mx-2 sm:mx-16 h-full py-6 flex-1 w-full"
                    >
                        <motion.h1
                            className="text-base md:text-2xl text-center w-full font-semibold text-gray-800 my-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Información
                        </motion.h1>
                        <motion.h1
                            layoutId="asunto"
                            className="capitalize text-base md:text-2xl text-left font-semibold text-gray-800"
                        >
                            Asunto: {data.asunto}
                        </motion.h1>
                        <motion.h2
                            layoutId="receptor"
                            className="text-base md:text-2xl text-left text-gray-800"
                        >
                            Receptor : {data.receptor}
                        </motion.h2>
                        <motion.h2 className="text-base md:text-2xl text-left text-gray-800">
                            Contenido: {data.contenido}
                        </motion.h2>
                        <motion.h2 className="text-base md:text-2xl text-left text-gray-800">
                            Ficha: {data.ficha}
                        </motion.h2>
                    </motion.div>
                    <motion.div
                        className="flex flex-col justify-center items-end mx-2 sm:mx-16 h-full py-6 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg
                            viewBox="0 0 16 16"
                            className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 "
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setModal(true)}
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ItemOpen;
