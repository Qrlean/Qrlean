import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveBar } from '@nivo/bar';

const divAnimate = {
    initial: {
        height: '0px',
        display: 'none',
    },
    show: {
        height: 300,
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
const imageAnimate = {
    activate: {
        rotate: 180,
    },
    noactivate: {
        rotate: 0,
    },
};

const ItemClases = ({ clase, width }) => {
    const data = [
        {
            id: 'Asistió',
            label: 'Asistió',
            value: 90,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            value: 387,
            color: 'hsl(312, 70%, 50%)',
        },
    ];
    const [active, setActive] = useState(false);
    return (
        <motion.div className={`${width} mx-auto my-3`}>
            <div
                className="cursor-pointer h-16 flex flex-row relative justify-center items-center w-full bg-orange-200 shadow border-orange-600 border-t-2 rounded text-gray-800 p-2 text-xl"
                onClick={() => setActive(!active)}
            >
                {clase}
                <motion.svg
                    style={{ originX: '50%', originY: '50%' }}
                    animate={`${active ? 'activate' : 'noactivate'}`}
                    variants={imageAnimate}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 absolute right-0 mx-2 fill-current text-gray-800"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                    />
                </motion.svg>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial="initial"
                        animate="show"
                        exit="unshow"
                        variants={divAnimate}
                        className="flex flex-col justify-center items-center overflow-hidden w-full"
                    >
                        <ResponsiveBar
                            height={300}
                            data={data}
                            margin={{
                                top: 40,
                                bottom: 40,
                                left: 40,
                                right: 40,
                            }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ItemClases;
