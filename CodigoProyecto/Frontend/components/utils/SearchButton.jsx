import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const SearchButton = ({ className }) => {
    const [search, setSearch] = useState(false);
    const inputVariants = {
        initial: {
            width: '0px',
            display: 'none',
        },
        show: {
            display: 'block',
            width: '270px',
            padding: '1rem',
            transition: {
                duration: 0.5,
            },
        },
        unshow: {
            width: '0px',
            padding: ['1rem', '1rem', '1rem', '1rem', '1rem', '0px'],
            transition: {
                duration: 0.5,
            },
        },
    };
    const iconVariants = {
        initial: {
            borderTopRightRadius: '0.25rem',
            borderBottomRightRadius: '0.25rem',
        },
        show: {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            transition: {
                duration: 0.5,
            },
        },
        unshow: {
            borderTopRightRadius: '0.25rem',
            borderBottomRightRadius: '0.25rem',
            transition: {
                duration: 0.5,
            },
        },
    };

    const closeVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        unshow: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    };
    return (
        <>
            <div
                className={`flex flex-row relative h-8/12 items-center ml-8 ${className}`}
            >
                <motion.div
                    initial="initial"
                    animate={search ? 'show' : 'unshow'}
                    variants={iconVariants}
                    className="h-5/6 fill-current bg-orange-300 rounded-l flex justify-center items-center p-2 px-3 cursor-pointer"
                    onClick={() => setSearch(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5/6 text-gray-800 my-auto"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </motion.div>
                <AnimatePresence>
                    {search && (
                        <>
                            <motion.input
                                variants={inputVariants}
                                animate="show"
                                initial="initial"
                                exit="unshow"
                                type="text"
                                name="search"
                                placeholder="Ingrese su palabra de busqueda."
                                className="h-5/6 outline-none border-none text-gray-800  rounded-r"
                            />
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute right-0 top-0 mt-1 text-gray-800 fill-current cursor-pointer"
                                viewBox="0 0 16 16"
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={closeVariants}
                                onClick={() => setSearch(false)}
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </motion.svg>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-2 w-2 absolute right-0 bottom-0 m-2 text-gray-800 fill-current cursor-pointer"
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={closeVariants}
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                />
                            </motion.svg>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default SearchButton;
