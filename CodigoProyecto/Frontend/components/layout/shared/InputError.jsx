import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const errorVariants = {
    initial: {
        height: '0px',
        display: 'none',
    },
    animate: {
        height: 'auto',
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
const InputError = ({ error, touched }) => {
    return (
        <AnimatePresence>
            {error && touched ? (
                <motion.p
                    initial="initial"
                    animate="animate"
                    exit="unshow"
                    variants={errorVariants}
                    className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                >
                    {error}
                </motion.p>
            ) : null}
        </AnimatePresence>
    );
};
export default InputError;
