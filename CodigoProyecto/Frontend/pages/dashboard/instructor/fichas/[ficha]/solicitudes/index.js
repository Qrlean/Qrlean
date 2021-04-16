import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Dashboard from '../../../../../../components/utils/Dashboard';

import Item from '../../../../../../components/layout/solicitudesInstructor/Item';
// import Modal from '../../../../components/utils/Modal'

import Loader from 'react-loader-spinner';

import { motion } from 'framer-motion';

const infoVariants = {
    hover: {
        rotate: -10,
        scale: 1,
    },
};
const SolicitudesAprendiz = () => {
    const solicitudes = [
        {
            _id: 1,
            ficha: 12341234,
            asunto: 'prueba',
            receptor: 'Julio Paparazi',
            contenido: 'Tube una falla de internet el lunes',
        },
        {
            _id: 2,
            ficha: 12341234,
            asunto: 'prueba',
            receptor: 'Julio Paparazi',
            contenido: 'Tube una falla de internet el lunes',
        },
        {
            _id: 3,
            ficha: 12341234,
            asunto: 'prueba',
            receptor: 'Julio Paparazi',
            contenido: 'Tube una falla de internet el lunes',
        },
        {
            _id: 4,
            ficha: 12341234,
            asunto: 'prueba',
            receptor: 'Julio Paparazi',
            contenido: 'Tube una falla de internet el lunes',
        },
    ];
    const router = useRouter();

    const error = false;
    const loader = false;
    const [item, setItem] = useState(null);
    const [help, setHelp] = useState(false);
    return (
        <Dashboard>
            {/* <Modal state={help} setState={setHelp} titulo="Ayuda">
            <DashboardAdminHelp className="transform rotate-90 sm:rotate-0"></DashboardAdminHelp>
        </Modal> */}
            <div className="h-2/12 relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() =>
                        router.push(
                            '/dashboard/instructor/fichas/[ficha]/',
                            `/dashboard/instructor/fichas/${router.query.ficha}/`,
                        )
                    }
                    className="xl:ml-28 ml-4 h-8/12  fill-current text-gray-800"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                </svg>

                <div className="flex-1 h-8/12 flex flex-row justify-end xl:mx-28 mx-4 rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" px-3 h-full fill-current text-gray-800 "
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"
                        />
                    </svg>
                </div>
            </div>
            <div className="h-10/12 w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                {loader ? (
                    <div className="flex flex-row justify-center items-center">
                        <Loader
                            type="Circles"
                            color="#545454"
                            height={80}
                            width={80}
                            className="mx-2"
                        />
                        <h1 className="text-gray-800 text-3xl">Cargando...</h1>
                    </div>
                ) : error ? (
                    <h1 className="text-red-500 text-3xl">{error}</h1>
                ) : (
                    <>
                        {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="left-0 top-0 absolute w-10 h-10 fill-current text-gray-700 m-4" xmlns="http://www.w3.org/2000/svg" onClick={()=>setHelp(true)} style={{zIndex:99}}>
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                            <circle cx="8" cy="4.5" r="1"/>
                        </motion.svg> */}
                        <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">
                            Tus solicitudes
                        </h1>

                        {solicitudes.map((i) => (
                            <Item
                                data={i}
                                key={i._id}
                                itemActivo={item}
                                setItem={setItem}
                            />
                        ))}
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default SolicitudesAprendiz;
