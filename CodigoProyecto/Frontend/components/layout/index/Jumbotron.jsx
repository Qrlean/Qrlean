import React from 'react';
import PrincipalPath from './principalPath';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Jumbotron = ({ divRef }) => {
    return (
        <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mx-8 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-24 flex flex-col justify-center items-center my-4 mt-24 py-5"
        >
            {/* PRIMERA PARTE */}

            <PrincipalPath />

            <h3 className="text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-white text-center mx-auto">
                Sistema único para firmar asistencia mediante el fácil uso de
                códigos QR.
            </h3>
            <div className="flex flex-row justify-center items-center">
                <Link href="/login">
                    <motion.button
                        whileHover={{
                            backgroundColor: '#F5B700',
                            color: 'black',
                            scale: 1.1,
                            boxShadow: ' 0px 0px 39px -1px rgba(255,255,255,1)',
                        }}
                        className="border border-white rounded text-center text-white text-xl m-5 lg:m-4 xl:m-2 font-semibold p-3 outline-none"
                    >
                        Ingresar
                    </motion.button>
                </Link>
            </div>
            <motion.svg
                initial={{ y: 10 }}
                animate={{ y: -10 }}
                transition={{ yoyo: Infinity, duration: 1 }}
                fill="white"
                viewBox="0 0 20 20"
                className="w-10 my-10"
                onClick={() => divRef.current.scrollIntoView()}
            >
                <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10" />
            </motion.svg>
        </motion.div>
    );
};

export default Jumbotron;
