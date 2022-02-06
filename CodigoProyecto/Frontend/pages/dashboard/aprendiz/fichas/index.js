import React, { useEffect, useState } from 'react';
import Dashboard from '../../../../components/layout/shared/Dashboard';

import Item from '../../../../components/layout/item/Item';
import Modal from '../../../../components/layout/shared/Modal';
import DashboardAdminHelp from '../../../../svg/dashboardAdminHelp.svg';

import Loader from 'react-loader-spinner';
import WithAuth from '../../../../components/utils/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getFichas } from '../../../../actions/aprendizActions';

const AprendizDashboard = () => {
    const dispatch = useDispatch();
    const fichas = useSelector((store) => store.aprendiz.fichas.data);
    const loader = useSelector((store) => store.aprendiz.fichas.loading);
    const error = useSelector((store) => store.aprendiz.fichas.error);
    useEffect(() => {
        dispatch(getFichas());
    }, []);
    // const router = useRouter();
    const [help, setHelp] = useState(false);
    return (
        <Dashboard>
            <Modal state={help} setState={setHelp} titulo="Ayuda">
                <DashboardAdminHelp className="transform rotate-90 sm:rotate-0" />
            </Modal>
            <div className="h-full w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                {loader ? (
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
                            trashIcon={false}
                            editIcon={false}
                            routerDir="/dashboard/aprendiz/fichas"
                            routerQuery="ficha"
                            idProperty="id_ficha"
                        />
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [3] })(AprendizDashboard);
