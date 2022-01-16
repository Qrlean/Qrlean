import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Dashboard from '../../../components/utils/Dashboard';
import Modal from '../../../components/utils/Modal';

// import { motion } from 'framer-motion';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Teacher from '../../../svg/teacher2.svg';
import Cursos from '../../../svg/cursos.svg';
import DashboardAdminHelp from '../../../svg/dashboardAdminHelp.svg';

import WithAuth from '../../../components/utils/WithAuth';

// const infoVariants = {
//     hover: {
//         rotate: -10,
//         scale: 1,
//     },
// };
const InicioAdmin = () => {
    const router = useRouter();
    const [help, setHelp] = useState(false);
    return (
        <Dashboard>
            <Modal state={help} setState={setHelp} titulo="Ayuda">
                <DashboardAdminHelp className="transform rotate-90 sm:rotate-0" />
            </Modal>
            <PerfectScrollbar className="h-full grid grid-cols-2 relative">
                {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="left-0 top-0 absolute w-10 h-10 fill-current text-gray-700 m-4" xmlns="http://www.w3.org/2000/svg" onClick={()=>setHelp(true)} style={{zIndex:99}}>
                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                        <circle cx="8" cy="4.5" r="1"/>
                </motion.svg> */}
                {/* //COLUMNA 1 - PERSONAS */}
                <div className="flex flex-col justify-center items-center  bg-deeppink-200 col-span-2 sm:col-span-2 lg:col-span-1 h-screen lg:h-auto relative">
                    <div className="flex flex-col justify-center items-center">
                        <div className="rounded-full ring-2 ring-gray-800 ring-offset-2 bg-darkorchid-400 m-6">
                            <Teacher className="w-64 h-64" />
                        </div>
                        <button
                            onClick={() =>
                                router.push('/dashboard/admin/personas')
                            }
                            className="m-2 outline-none transform hover:scale-110 bg-darkorchid-400 w-10/12 rounded p-2 text-gray-800 text-center text-2xl ring-2 ring-gray-800 ring-offset-2"
                        >
                            <h1>Personas</h1>
                        </button>
                    </div>
                </div>
                {/* //COLUMNA 1 - PERSONAS */}
                {/* //COLUMNA 3 - FICHAS */}
                <div className="flex flex-col justify-center items-center bg-red-200 col-span-2 sm:col-span-2 lg:col-span-1 h-screen lg:h-auto">
                    <div className="flex flex-col justify-center items-center ">
                        <div className="rounded-full ring-2 ring-gray-800 ring-offset-2 bg-red-400 m-6">
                            {' '}
                            <Cursos className="w-64 h-64" />
                        </div>
                        <button
                            onClick={() =>
                                router.push('/dashboard/admin/fichas')
                            }
                            className="m-2 outline-none transform hover:scale-110 bg-red-400 w-10/12 rounded p-2 text-gray-800 text-center text-2xl ring-2 ring-gray-800 ring-offset-2"
                        >
                            <h1>Fichas</h1>
                        </button>
                    </div>
                </div>
                {/* //COLUMNA 3 - FICHAS */}
            </PerfectScrollbar>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(InicioAdmin);
