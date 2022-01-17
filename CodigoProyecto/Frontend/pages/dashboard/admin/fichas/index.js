import React from 'react';

import { useRouter } from 'next/router';
import Dashboard from '../../../../components/layout/shared/Dashboard';

import Item from '../../../../components/layout/item/Item';

import Loader from 'react-loader-spinner';

import SearchButton from '../../../../components/layout/shared/SearchButton';

import { NextSeo } from 'next-seo';
import WithAuth from '../../../../components/utils/WithAuth';
import ArrowBack from '../../../../components/layout/shared/ArrowBack';

const Fichas = () => {
    const fichas = [
        {
            _id: 1,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
        {
            _id: 2,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
        {
            _id: 3,
            numero: '2141041',
            personas: ['1', '2', '3'],
            programa: '123123123 Programacion',
        },
    ];
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
                    <SearchButton className="lg:flex hidden " />
                    <div className="flex-1 h-8/12 flex flex-row items-center justify-end xl:mx-28 mx-4 rounded">
                        <button
                            onClick={() =>
                                router.push('/dashboard/admin/fichas/crear')
                            }
                            className="h-5/6 outline-none bg-orange-300 rounded-lg text-base text-gray-800 px-4 shadow-lg border-black border border-double"
                        >
                            Nueva ficha.
                        </button>
                    </div>
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
                                list={fichas}
                                openPropierties={[
                                    {
                                        key: 'numero',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa',
                                        text: 'Programa',
                                    },
                                ]}
                                closePropierties={[
                                    {
                                        key: 'numero',
                                        text: 'Numero de ficha',
                                    },
                                    {
                                        key: 'programa',
                                        text: 'Programa',
                                    },
                                ]}
                                openTitle="Información de ficha"
                                iconExpand={false}
                                routerDir="/dashboard/admin/fichas"
                                routerQuery="ficha"
                                idProperty="_id"
                                modalText="Eliminar ficha"
                                modalTitle="Eliminar ficha"
                            />
                        </>
                    )}
                </div>
            </Dashboard>
        </>
    );
};

export default WithAuth({ rol: [1] })(Fichas);
