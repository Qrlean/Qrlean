import React from 'react';

import { useRouter } from 'next/router';

import Item from '../../../../../../components/layout/item/Item';
import Dashboard from '../../../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../../../components/utils/WithAuth';
import WithGetOrRedirect from '../../../../../../components/utils/WithGetOrRedirect';
import {
    eliminarClase,
    getAsignaturaById,
    getFichaById,
} from '../../../../../../actions/teacherActions';
import ArrowBack from '../../../../../../components/layout/shared/ArrowBack';
import CreateButton from '../../../../../../components/layout/shared/CreateButton';
import { useDispatch } from 'react-redux';

const Clases = ({ data }) => {
    const dispatch = useDispatch();
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
                    title="Crear clase"
                    path={`/dashboard/instructor/fichas/${router.query.id_ficha}/${router.query.id_materia}/crear-clase`}
                />
            </div>
            <div className="dashboard-index-body w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">
                    {`Clases de ${data.asignatura.nombre_asignatura}`}
                </h1>
                <Item
                    list={data.clases}
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
                    editIcon={false}
                    modalText="Eliminar clase"
                    modalTitle="Eliminar clase"
                    onDelete={(e) => dispatch(eliminarClase(e))}
                    fnSelectorLoading={(store) =>
                        store.admin.users.deleteUser.loading
                    }
                    routerDir={`/dashboard/instructor/fichas/${router.query.id_ficha}/${router.query.id_materia}`}
                    routerQuery="asignatura"
                    idProperty="id_clase"
                />
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(
    WithGetOrRedirect(
        WithGetOrRedirect(
            Clases,
            getAsignaturaById,
            (router) =>
                router.push(
                    `/dashboard/instructor/fichas/${router.query.id_ficha}`,
                ),
            (store) => store.teacher.asignaturaById.state,
            (store) => store.teacher.asignaturaById.data,
            'id_materia',
        ),
        getFichaById,
        (router) => router.push(`/dashboard/instructor/fichas/`),
        (store) => store.teacher.fichaById.state,
        (store) => store.teacher.fichaById.data,
        'id_ficha',
    ),
);
