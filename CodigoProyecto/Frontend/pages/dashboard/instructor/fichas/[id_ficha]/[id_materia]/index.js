import React from 'react';

import { useRouter } from 'next/router';

import Item from '../../../../../../components/layout/item/Item';
import Dashboard from '../../../../../../components/layout/shared/Dashboard';
import Loader from 'react-loader-spinner';
import WithAuth from '../../../../../../components/utils/WithAuth';
import WithEdit from '../../../../../../components/utils/WithEdit';
import { getAsignaturaById } from '../../../../../../actions/teacherActions';
import { useSelector } from 'react-redux';
import ArrowBack from '../../../../../../components/layout/shared/ArrowBack';
import CreateButton from '../../../../../../components/layout/shared/CreateButton';

const Materia = () => {
    const dataAsignatura = useSelector(
        (store) => store.teacher.asignaturaById.data,
    );

    const error = useSelector((store) => store.teacher.asignaturaById.error);
    const loader = useSelector((store) => store.teacher.asignaturaById.loading);
    const router = useRouter();
    return (
        <Dashboard>
            <div className="dashboard-index-nav relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                <ArrowBack
                    onClick={() =>
                        router.push(
                            `/dashboard/instructor/fichas/${router.query.id_ficha}`,
                        )
                    }
                />
                <CreateButton
                    title="Registrar nueva persona"
                    path={`/dashboard/instructor/fichas/${router.query.id_ficha}/crear`}
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
                        <h1 className="text-gray-800 text-3xl">Cargando...</h1>
                    </div>
                ) : error ? (
                    <h1 className="text-red-500 text-3xl">{error}</h1>
                ) : (
                    <>
                        <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">
                            {`Clases de ${dataAsignatura.asignatura.nombre_asignatura}`}
                        </h1>
                        <Item
                            list={dataAsignatura.clases}
                            openPropierties={[
                                {
                                    key: 'nombre_clase',
                                    text: 'Nombre',
                                },
                                {
                                    key: 'dia',
                                    text: 'Dia',
                                },
                                {
                                    key: 'hora_inicio',
                                    text: 'Hora de inicio',
                                },
                                {
                                    key: 'hora_final',
                                    text: 'Hora de finalizacion',
                                },
                            ]}
                            closePropierties={[
                                {
                                    key: 'nombre_clase',
                                    text: 'Nombre',
                                },
                                {
                                    key: 'dia',
                                    text: 'Dia',
                                },
                                {
                                    key: 'hora_inicio',
                                    text: 'Hora de inicio',
                                },
                                {
                                    key: 'hora_final',
                                    text: 'Hora de finalizacion',
                                },
                            ]}
                            openTitle="Información de clase"
                            iconExpand={true}
                            trashIcon={true}
                            editIcon={true}
                            routerDir="/dashboard/instructor/fichas/12/Ingles"
                            routerQuery="asignatura"
                            idProperty="id_clase"
                        />
                    </>
                )}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(
    WithEdit(
        Materia,
        getAsignaturaById,
        '/dashboard/instructor/fichas',
        (store) => store.teacher.asignaturaById.state,
        (store) => store.teacher.asignaturaById.data,
        'id_materia',
    ),
);
