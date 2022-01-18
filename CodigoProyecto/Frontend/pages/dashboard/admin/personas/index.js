import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import Dashboard from '../../../../components/layout/shared/Dashboard';
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
    return (
        <Dashboard>
            <div className="dashboard-index-nav relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                <ArrowBack onClick={() => router.push('/dashboard/admin/')} />
                <CreateButton
                    title="Registrar nueva persona"
                    path="/dashboard/admin/personas/crear"
                />
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
                            fnSelectorLoading={(store) =>
                                store.admin.users.deleteUser.loading
                            }
                        />
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(ManagerUsuarios);
