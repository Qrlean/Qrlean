import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Modal from '../../../../components/layout/shared/Modal';
import Dashboard from '../../../../components/layout/shared/Dashboard';
import DashboardAdminHelp from '../../../../svg/dashboardAdminHelp.svg';

import Item from '../../../../components/layout/item/Item';

import Loader from 'react-loader-spinner';
import WithAuth from '../../../../components/utils/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarUsuario, getUsuarios } from '../../../../actions/adminActions';
import ArrowBack from '../../../../components/layout/shared/ArrowBack';
import CreateButton from '../../../../components/layout/shared/CreateButton';

const ManagerUsuarios = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsuarios());
    }, []);

    const peopleIsLoading = useSelector((store) => store.admin.users.loading);
    const peopleError = useSelector((store) => store.admin.users.error);
    const data = useSelector((store) => store.admin.users.data);
    const router = useRouter();
    const [help, setHelp] = useState(false);
    return (
        <Dashboard>
            <Modal state={help} setState={setHelp} titulo="Ayuda">
                <DashboardAdminHelp className="transform rotate-90 sm:rotate-0" />
            </Modal>
            <div className="dashboard-index-nav relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                <ArrowBack onClick={() => router.push('/dashboard/admin/')} />
                <div className="flex-1 h-8/12 flex flex-row justify-end xl:mx-28 mx-4 rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" px-3 h-full fill-current text-gray-800 "
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"
                        />
                    </svg>
                    <CreateButton
                        title="Registrar nueva persona"
                        path="/dashboard/admin/personas/crear"
                    />
                </div>
            </div>
            <div className="dashboard-index-body w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                {peopleIsLoading ? (
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
                ) : peopleError ? (
                    <h1 className="text-red-500 text-3xl">{peopleError}</h1>
                ) : (
                    <>
                        {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="left-0 top-0 absolute w-10 h-10 fill-current text-gray-700 m-4" xmlns="http://www.w3.org/2000/svg" onClick={()=>setHelp(true)} style={{zIndex:99}}>
                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                                    <circle cx="8" cy="4.5" r="1"/>
                                </motion.svg> */}
                        <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">
                            Usuarios
                        </h1>
                        <Item
                            list={data}
                            openPropierties={[
                                {
                                    key: 'nombres_usuario',
                                    text: 'Nombres',
                                },
                                {
                                    key: 'apellidos_usuario',
                                    text: 'Apellidos',
                                },
                                {
                                    key: 'numero_documento',
                                    text: 'Numero de documento',
                                },
                                {
                                    key: 'rol.nombre_rol',
                                    text: 'Nombre del rol',
                                },
                                {
                                    key: 'emailInstitucional',
                                    text: 'Email',
                                },
                            ]}
                            closePropierties={[
                                {
                                    key: 'nombres_usuario',
                                    text: 'Nombres',
                                },
                                {
                                    key: 'apellidos_usuario',
                                    text: 'Apellidos',
                                },
                                {
                                    key: 'numero_documento',
                                    text: 'Numero de documento',
                                },
                                {
                                    key: 'rol.nombre_rol',
                                    text: 'Nombre del rol',
                                },
                                {
                                    key: 'emailInstitucional',
                                    text: 'Email',
                                },
                            ]}
                            openTitle="Información de persona"
                            iconExpand={false}
                            routerDir="/dashboard/admin/personas"
                            routerQuery="persona"
                            idProperty="id_usuario"
                            modalText="Eliminar persona"
                            modalTitle="Eliminar persona"
                            onDelete={(id) => dispatch(eliminarUsuario(id))}
                        />
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(ManagerUsuarios);
