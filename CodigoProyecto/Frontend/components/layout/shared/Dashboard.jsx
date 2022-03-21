import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Hamburger from 'hamburger-react';
import LogoWhite from '../../../svg/2S.svg';
import { useSelector } from 'react-redux';
import DashboardOptions from './DashboardOptions';
import { DashboardProfileOptions } from './DashboardProfileOptions';

const mainVariants = {
    initial: {
        width: '0px',
        display: 'none',
    },
    show: {
        width: 'auto',
        transition: {
            duration: 0.5,
        },
    },
    unshow: {
        width: '0px',
        transition: {
            duration: 0.5,
        },
    },
};

const Dashboard = (props) => {
    const [menu, setMenu] = useState(false);
    const [active, setActive] = useState(false);

    const bgColor = 'bg-gray-800';

    const user = useSelector((store) => store.app.auth.user);
    // const [user, setUser] = useState('aprendiz');
    return (
        <>
            <AnimatePresence>
                {menu && (
                    <motion.div
                        animate="show"
                        initial="initial"
                        exit="unshow"
                        variants={mainVariants}
                        className={`${bgColor} text-white overflow-hidden h-screen top-0 left-0  flex flex-col justify-center items-center fixed `}
                        style={{ zIndex: 9999 }}
                    >
                        <LogoWhite className="w-16 h-16  cursor-pointer mt-24" />
                        <h1 className="text-white text-center text-3xl m-2">
                            QrLean
                        </h1>
                        <div className="flex flex-col justify-center items-center flex-1">
                            <DashboardProfileOptions
                                user={user}
                                active={active}
                                setActive={setActive}
                            />
                            <DashboardOptions rol={user.id_tipo_rol} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-row justify-center h-screen w-full overflow-x-hidden">
                <div className="flex-1 h-full bg-gray-100 flex flex-col justify-center items-center">
                    <div
                        className="absolute top-0 left-0 m-4 rounded bg-orange-200 shadow-lg border border-gray-800"
                        style={{ zIndex: 99999 }}
                    >
                        <Hamburger
                            toggled={menu}
                            toggle={setMenu}
                            color="#1F2937"
                            size={25}
                            rounded
                        />
                    </div>
                    <div className="bg-white rounded-lg w-11/12 h-10/12 overflow-hidden relative">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
