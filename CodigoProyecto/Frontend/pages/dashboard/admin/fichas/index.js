import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Modal from '../../../../components/utils/Modal';
import Dashboard from '../../../../components/utils/Dashboard';
import DashboardAdminHelp from '../../../../svg/dashboardAdminHelp.svg';

import Item from '../../../../components/layout/item/Item';

import Loader from 'react-loader-spinner';

import SearchButton from '../../../../components/utils/SearchButton';

import { NextSeo } from 'next-seo';
import WithAuth from '../../../../components/utils/WithAuth';
// import { motion } from 'framer-motion';

// const infoVariants = {
//     hover: {
//         rotate: -10,
//         scale: 1,
//     },
// };

const Fichas = () => {
    const fichas = [
        {
            _id: 1,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
        {
            _id: 2,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
        {
            _id: 3,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
    ];
    const error = false;
    const loader = false;
    const [help, setHelp] = useState(false);
    const router = useRouter();
    return (
        <>
            <NextSeo
                title="Qrlean | Admin"
                description="Then with a short description here."
            />
            <Dashboard>
                <Modal state={help} setState={setHelp} titulo="Ayuda">
                    <DashboardAdminHelp className="transform rotate-90 sm:rotate-0"></DashboardAdminHelp>
                </Modal>
                <div className="h-2/12 relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => router.push('/dashboard/admin')}
                        className="xl:ml-28 ml-4 h-6/12  fill-current text-gray-800"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                    </svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="ml-6  px-2 h-8/12 w-10 fill-current text-gray-800 bg-white rounded rounded-r-none" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg>
                    <input type="text" className="text-gray-800 text-xl rounded rounded-l-none p-2 outline-none h-8/12 mr-4 md:w-80 w-40" placeholder="Buscar"/> */}
                    <SearchButton className="lg:flex hidden " />
                    <div className="flex-1 h-8/12 flex flex-row items-center justify-end xl:mx-28 mx-4 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" px-3 h-8 fill-current text-gray-800 "
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
                            />
                        </svg>
                        <button
                            onClick={() =>
                                router.push('/dashboard/admin/fichas/crear')
                            }
                            className="h-5/6 outline-none bg-orange-300 rounded-lg text-base text-gray-800 px-4 shadow-lg border-black border border-double"
                        >
                            Nueva ficha.
                        </button>
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
                            <h1 className="text-gray-800 text-3xl">
                                Cargando...
                            </h1>
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
                                Fichas
                            </h1>
                            {/* 
                        list,
                        openPropierties,
                        closePropierties,
                        openTitle,
                        iconExpand,
                        routerDir,
                        routerQuery,
                        idPropertie,
                        modalText,
                        modalTitle,
                        */}
                            {/* [{
                            key:"nombre",
                            text:"Tu nombre:",
                            className:"asdcasd"
                        }] */}
                            <Item
                                list={fichas}
                                openPropierties={[
                                    {
                                        key: 'numero',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa',
                                        text: 'Programa',
                                    },
                                ]}
                                closePropierties={[
                                    {
                                        key: 'numero',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa',
                                        text: 'Programa',
                                    },
                                ]}
                                openTitle="Información de ficha"
                                iconExpand={false}
                                routerDir="/dashboard/admin/fichas"
                                routerQuery="ficha"
                                idPropertie="_id"
                                modalText="Eliminar ficha"
                                modalTitle="Eliminar ficha"
                            />
                            {/* {fichas.map((i) => (
                            <Item
                                data={i}
                                key={i._id}
                                item={item}
                                setItem={setItem}
                            />
                        ))} */}
                        </>
                    )}
                </div>
            </Dashboard>
        </>
    );
};

export default WithAuth({ rol: [1] })(Fichas);
