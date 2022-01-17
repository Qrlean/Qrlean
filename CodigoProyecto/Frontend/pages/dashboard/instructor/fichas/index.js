import React, { useState } from 'react';

// import { useRouter } from 'next/router';
import Dashboard from '../../../../components/layout/shared/Dashboard';

import Item from '../../../../components/layout/item/Item';
import Modal from '../../../../components/layout/shared/Modal';
import DashboardAdminHelp from '../../../../svg/dashboardAdminHelp.svg';

import Loader from 'react-loader-spinner';
import WithAuth from '../../../../components/utils/WithAuth';

// import { motion } from 'framer-motion';

// const infoVariants = {
//     hover: {
//         rotate: -10,
//         scale: 1,
//     },
// };
const InstructorDashboard = () => {
    const fichas = [
        { _id: 1, ficha: 12341234 },
        { _id: 2, ficha: 12341234 },
        { _id: 3, ficha: 12341234 },
        { _id: 4, ficha: 12341234 },
    ];
    // const router = useRouter();

    const error = false;
    const loader = false;
    const [help, setHelp] = useState(false);
    return (
        <Dashboard>
            <Modal state={help} setState={setHelp} titulo="Ayuda">
                <DashboardAdminHelp className="transform rotate-90 sm:rotate-0"></DashboardAdminHelp>
            </Modal>
            <div className="h-full w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
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
                                    key: '_id',
                                    text: 'Id',
                                },
                                {
                                    key: 'ficha',
                                    text: 'Ficha',
                                },
                            ]}
                            closePropierties={[
                                {
                                    key: '_id',
                                    text: 'Id',
                                },
                                {
                                    key: 'ficha',
                                    text: 'Ficha',
                                },
                            ]}
                            openTitle="Información de persona"
                            iconExpand={true}
                            trashIcon={false}
                            editIcon={false}
                            routerDir="/dashboard/instructor/fichas"
                            routerQuery="ficha"
                            idPropertie="_id"
                        />
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(InstructorDashboard);
