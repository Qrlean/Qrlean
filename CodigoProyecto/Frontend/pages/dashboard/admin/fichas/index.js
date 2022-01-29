import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import Dashboard from '../../../../components/layout/shared/Dashboard';

import Item from '../../../../components/layout/item/Item';

import Loader from 'react-loader-spinner';
import { NextSeo } from 'next-seo';
import WithAuth from '../../../../components/utils/WithAuth';
import ArrowBack from '../../../../components/layout/shared/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarFicha, getFichas } from '../../../../actions/adminActions';
import CreateButton from '../../../../components/layout/shared/CreateButton';

const Fichas = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFichas());
    }, []);
    const data = useSelector((store) => store.admin.fichas.data);
    const error = false;
    const loader = false;
    const router = useRouter();
    return (
        <>
            <NextSeo
                title="Qrlean | Admin"
                description="Then with a short description here."
            />
            <Dashboard>
                <div className="dashboard-index-nav relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                    <ArrowBack
                        onClick={() => router.push('/dashboard/admin/')}
                    />
                    {/* <SearchButton className="lg:flex hidden " /> */}
                    <CreateButton
                        title="Nueva ficha"
                        path="/dashboard/admin/fichas/crear"
                    />
                </div>
                <div className="dashboard-index-body w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                    {loader ? (
                        <div className="flex flex-row justify-center items-center">
                            <Loader
                                type="Circles"
                                color="#545454"
                                height={80}
                                width={80}
                                className="mx-2"
                            />
                            <h1 className="text-gray-800 text-3xl">
                                Cargando...
                            </h1>
                        </div>
                    ) : error ? (
                        <h1 className="text-red-500 text-3xl">{error}</h1>
                    ) : (
                        <>
                            <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">
                                Fichas
                            </h1>
                            <Item
                                list={data}
                                openPropierties={[
                                    {
                                        key: 'id_ficha',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa.nombre_programa',
                                        text: 'Programa',
                                    },
                                ]}
                                closePropierties={[
                                    {
                                        key: 'id_ficha',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa.nombre_programa',
                                        text: 'Programa',
                                    },
                                ]}
                                openTitle="Información de ficha"
                                iconExpand={true}
                                routerDir="/dashboard/admin/fichas"
                                routerQuery="ficha"
                                idProperty="id_ficha"
                                modalText="Eliminar ficha"
                                modalTitle="Eliminar ficha"
                                onDelete={(e) => dispatch(eliminarFicha(e))}
                                fnSelectorLoading={(store) =>
                                    store.admin.fichas.deleteFicha.loading
                                }
                            />
                        </>
                    )}
                </div>
            </Dashboard>
        </>
    );
};

export default WithAuth({ rol: [1] })(Fichas);
