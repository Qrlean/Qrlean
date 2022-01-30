import Avatar from 'react-avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { logoutFn } from '../../../actions/appActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import Salir from '../../../svg/salir.svg';
const opcVariants = {
    initial: {
        height: '0px',
        display: 'none',
    },
    show: {
        height: 'auto',
        borderBottomRightRadius: '8px',
        borderBottomLeftRadius: '8px',
        transition: {
            duration: 0.5,
        },
    },
    unshow: {
        height: '0px',
        transition: {
            duration: 0.5,
        },
    },
};
const iconVariants = {
    animate: {
        rotate: 180,
        transition: {
            duration: 0.5,
        },
    },
    initial: {
        rotate: 0,
        transition: {
            duration: 0.5,
        },
    },
};
export const DashboardProfileOptions = ({ user, active, setActive }) => {
    const dispatch = useDispatch();
    return (
        <motion.div
            className={`flex flex-col justify-center items-center mb-16 p-3`}
        >
            <div className="flex flex-row items-center justify-center w-full my-2">
                <div className="flex flex-row items-center justify-center">
                    <Avatar size="50" round={10} name="camilo garcia" />
                    <div className="flex flex-col items-center justify-center mx-3">
                        <h5 className=" text-base font-semibold">
                            {user.nombres_usuario}
                        </h5>
                        <div
                            className="flex flex-row justify-center items-center cursor-pointer"
                            onClick={() => setActive(!active)}
                        >
                            <h5 className=" text-base">Opciones</h5>
                            <motion.svg
                                animate={active ? 'animate' : 'initial'}
                                style={{
                                    originX: '50%',
                                    originY: '50%',
                                }}
                                variants={iconVariants}
                                className="w-4 mx-1 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10" />
                            </motion.svg>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {active ? (
                    <motion.div
                        animate="show"
                        initial="initial"
                        exit="unshow"
                        variants={opcVariants}
                        className="flex flex-col justify-center w-full overflow-hidden bg-gray-700 shadow-lg bg-opacity-75"
                    >
                        <button
                            onClick={() => dispatch(logoutFn())}
                            className="flex flex-row items-center m-1 mx-auto p-1 outline-none"
                        >
                            <div className="flex flex-row items-center m-1 mx-auto p-1 ">
                                <Salir className="w-6 mx-2 fill-current" />
                                <h5 className="text-base  font-semibold">
                                    Salir
                                </h5>
                            </div>
                        </button>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
};
