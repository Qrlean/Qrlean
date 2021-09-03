import React from 'react';
import { motion } from 'framer-motion';

const ItemClose = ({ data, openItem, closePropierties }) => {
    return (
        <>
            <motion.div
                layoutId="item-expandible"
                className="bg-white rounded-lg p-1 w-full lg:w-2/5 h-40 m-3 cursor-pointer flex flex-col justify-center items-center"
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
                onClick={() => openItem()}
            >
                <div className="flex flex-row items-center h-full w-full">
                    <motion.div
                        layoutId="contenido"
                        className="flex flex-col justify-center items-start mx-4 h-full py-6 flex-1"
                    >
                        {/* 
                        [{
                            key:"nombre",
                            text:"Tu nombre:",
                            className:"asdcasd"
                        }] */}
                        {closePropierties.map((p) => (
                            <motion.h2
                                key={p.key}
                                layoutId={p.key}
                                className={
                                    p.className
                                        ? p.className
                                        : 'text-xs md:text-base text-left text-gray-800'
                                }
                            >
                                {p.text} : {data[p.key]}
                            </motion.h2>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ItemClose;
