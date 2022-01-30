import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Modal from '../shared/Modal';

import ArrowDown from '../../../svg/arrowdown.svg';
import EditIcon from '../../../svg/editicon.svg';
import TrashIcon from '../../../svg/trashicon.svg';
import IconExpand from '../../../svg/iconexpand.svg';
import Warning from '../../../svg/warning-signs-svgrepo-com.svg';
import { fetchFromObject } from './Item';
import { useSelector } from 'react-redux';
import SubmitWithLoader from '../shared/SubmitWithLoader';

const ItemOpen = ({
    data,
    closeItem,
    openPropierties,
    openTitle,
    iconExpand,
    routerDir,
    idProperty,
    modalText,
    modalTitle,
    editIcon,
    trashIcon,
    onDelete,
    fnSelectorLoading,
}) => {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    let deleteIsLoading;
    if (fnSelectorLoading) {
        deleteIsLoading = useSelector(fnSelectorLoading);
    }
    const handleDelete = () => {
        onDelete(data[idProperty]);
        setModal(false);
    };
    return (
        <>
            {trashIcon && fnSelectorLoading && (
                <Modal titulo={modalTitle} state={modal} setState={setModal}>
                    <div className="flex flex-col text-justify w-full h-full overflow-x-hidden overflow-y-auto">
                        <h2 className="text-center text-3xl text-gray-800 font-semibold my-4">
                            Advertencia.
                        </h2>
                        <Warning className="w-32 h-32 mx-auto " />
                        <p className="text-gray-800 text-base my-4 w-11/12 sm:w-3/5 mx-auto">
                            {modalText}
                        </p>
                        <h2 className="text-center text-xl text-red-500 p-2 my-6 bg-red-100 p-1 w-80 mx-auto rounded">
                            ¿Esta segur@ de seguir?
                        </h2>
                        <div className="flex-1 flex flex-row justify-center items-center">
                            <button
                                className="bg-orange-300 text-gray-800 text-base mx-4 p-3 rounded-lg outline-none "
                                onClick={() => setModal(false)}
                            >
                                No,cancelar operación.
                            </button>
                            <SubmitWithLoader
                                title="Si,realizar operación"
                                loading={deleteIsLoading}
                                onClick={handleDelete}
                                type="button"
                                className="bg-orange-300 text-gray-800 text-base mx-4 p-3 rounded-lg outline-none"
                            />
                        </div>
                    </div>
                </Modal>
            )}
            <div
                className="flex justify-center items-center h-screen w-screen bg-black opacity-75 fixed  inset-0"
                onClick={() => closeItem()}
                style={{ zIndex: 99999999 }}
            />
            <motion.div
                layoutId="item-expandible"
                className="bg-white rounded-lg lg:h-3/5 lg:w-3/5 m-auto inset-0 fixed overflow-hidden max-w-full flex flex-col justify-center items-center"
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                    zIndex: 99999999,
                }}
            >
                <div className="flex flex-row items-center h-full w-full  relative">
                    <ArrowDown
                        className="m-6 absolute left-0 top-0 h-10 w-10 fill-current text-gray-800 cursor-pointer"
                        onClick={() => closeItem()}
                    />
                    <motion.div
                        layoutId="contenido"
                        className="flex flex-col justify-center items-start mx-16 h-full py-6 flex-1 w-full"
                    >
                        <motion.h1
                            className="text-base md:text-2xl text-center w-full font-semibold text-gray-800 my-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {openTitle}
                        </motion.h1>
                        {openPropierties.map((p) => (
                            <motion.h2
                                key={p.key}
                                layoutId={p.key}
                                className={
                                    p.className
                                        ? p.className
                                        : 'text-xs md:text-base text-left text-gray-800'
                                }
                            >
                                {p.text} : {fetchFromObject(data, p.key)}
                            </motion.h2>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex flex-col justify-center items-end mx-16 h-full py-6 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {editIcon && (
                            <EditIcon
                                onClick={() =>
                                    router.push(
                                        `${routerDir}/editar/${data[idProperty]}`,
                                    )
                                }
                                className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 "
                            />
                        )}
                        {trashIcon && (
                            <TrashIcon
                                className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 "
                                onClick={() => setModal(true)}
                            />
                        )}
                        {iconExpand && (
                            <IconExpand
                                className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 "
                                onClick={() =>
                                    router.push(
                                        `${routerDir}/${data[idProperty]}/`,
                                    )
                                }
                            />
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ItemOpen;
