import React from 'react';

import { useRouter } from 'next/router';

import Dashboard from '../../../../../components/layout/shared/Dashboard';
import ItemListaAdmin from '../../../../../components/layout/fichas/ItemListaAdmin';
import ItemMaterias from '../../../../../components/layout/fichas/ItemMaterias';
import { ResponsiveBar } from '@nivo/bar';
import WithAuth from '../../../../../components/utils/WithAuth';
import WithEdit from '../../../../../components/utils/WithEdit';
import { getFichaById } from '../../../../../actions/adminActions';
import { useSelector } from 'react-redux';

const Ficha = () => {
    const router = useRouter();
    const dataFicha = useSelector((store) => store.admin.fichaById.data);
    const data = [
        {
            id: 'Asistió con retardo',
            label: 'Asistió con retardo',
            value: dataFicha.asistenciaConRetardo,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'Asistió',
            label: 'Asistió',
            value: dataFicha.asistencia,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            value: dataFicha.inasistencia,
            color: 'hsl(312, 70%, 50%)',
        },
        {
            id: 'Por firmar',
            label: 'Por firmar',
            value: dataFicha.porFirmar,
            color: 'hsl(312, 70%, 50%)',
        },
    ];
    return (
        <Dashboard>
            <div className="grid grid-cols-4 h-full relative overflow-y-auto">
                <svg
                    viewBox="0 0 20 20"
                    fill="black"
                    className="cursor-pointer   top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                    onClick={() => router.push('/dashboard/admin/fichas')}
                    style={{ zIndex: 999 }}
                >
                    <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10" />
                </svg>

                <div className="col-span-4 xl:col-span-3 w-full lg:w-auto h-auto flex flex-col flex-start items-center overflow-y-visible xl:overflow-y-auto relative">
                    <svg
                        onClick={() =>
                            router.push(
                                '/dashboard/admin/fichas/[id]/asociar',
                                `/dashboard/admin/fichas/${router.query.id}/asociar`,
                            )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer fill-current text-gray-800 absolute right-0 top-0 m-4 h-10 w-10"
                        viewBox="0 0 16 16"
                    >
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path
                            fillRule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                    </svg>
                    <h1 className="text-center mx-auto text-4xl text-gray-800 my-8  border-b-2 border-orange-500 ">
                        Ficha 2141041
                    </h1>
                    <h1
                        className="text-left mb-3 text-base text-gray-600"
                        style={{ width: '83.333334%' }}
                    >
                        Gráfica general.
                    </h1>
                    <div className="flex flex-row justify-center items-center w-11/12 md:w-full h-full flex-wrap">
                        <div
                            className="h-96  overflow-none rounded-lg shadow-lg md:mx-2 w-full md:w-11/12 "
                            style={{ border: '1px solid rgba(31, 41, 55,1)' }}
                        >
                            <ResponsiveBar
                                data={data}
                                margin={{
                                    top: 40,
                                    bottom: 40,
                                    left: 40,
                                    right: 40,
                                }}
                                padding={0.3}
                                valueScale={{ type: 'linear' }}
                                indexScale={{ type: 'band', round: true }}
                                colors={{ scheme: 'nivo' }}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                            />
                        </div>
                    </div>
                    <div className="my-12 w-full h-auto">
                        <h1 className="text-center text-3xl text-gray-800 mx-auto my-4">
                            Materias
                        </h1>
                        {dataFicha.asignaturas.map((x) => (
                            <ItemMaterias
                                key={x.id_asociacion_asignatura_ficha}
                                titulo={x.asignatura.nombre_asignatura}
                                width="w-11/12"
                                clases={x.clases}
                            />
                        ))}
                    </div>
                </div>

                <div className="xl:col-span-1 col-span-4 bg-gray-200 shadow-lg h-auto w-full flex flex-col items-center overflow-y-visible xl:overflow-y-auto">
                    <h1 className="text-gray-800 text-2xl my-4 text-center font-semibold">
                        Personas
                    </h1>
                    {dataFicha.usuarios.map((data) => (
                        <ItemListaAdmin
                            key={data.usuario.id_usuario}
                            data={data}
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(
    WithEdit(
        Ficha,
        getFichaById,
        '/dashboard/admin/fichas',
        (store) => store.admin.fichaById.state,
        (store) => store.admin.fichaById.data,
    ),
);
