import React from 'react';

import { useRouter } from 'next/router';
import ItemPersonaAsistencia from '../../../../../components/layout/fichas/ItemPersonaAsistencia';
import Dashboard from '../../../../../components/layout/shared/Dashboard';
import ItemLista from '../../../../../components/layout/fichas/ItemLista';
import ItemMaterias from '../../../../../components/layout/fichas/ItemMaterias';
import { ResponsivePie } from '@nivo/pie';
// import { ResponsiveAreaBump } from '@nivo/bump'
import { ResponsiveBar } from '@nivo/bar';
import WithAuth from '../../../../../components/utils/WithAuth';

const Ficha = () => {
    const router = useRouter();
    const data = [
        {
            id: 'Asistió',
            label: 'Asistió',
            value: 90,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            value: 387,
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
                    onClick={() => router.push('/dashboard/instructor/fichas')}
                    style={{ zIndex: 999 }}
                >
                    <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                </svg>
                <div className="col-span-4 xl:col-span-3 w-full lg:w-auto h-auto flex flex-col flex-start items-center overflow-y-visible xl:overflow-y-auto relative">
                    <div className="w-full lg:w-11/12 flex flex-row justify-center items-center ">
                        <h1 className="flex-1 text-center text-4xl text-gray-800 my-8 mx-4">
                            Ficha 2141041
                        </h1>

                        <div
                            className="flex flex-col justify-center items-center mx-2"
                            onClick={() =>
                                router.push(
                                    '/dashboard/instructor/fichas/[ficha]/solicitudes',
                                    `/dashboard/instructor/fichas/${router.query.ficha}/solicitudes`,
                                )
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=" cursor-pointer fill-current text-gray-800 h-8 w-8"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            <p className="text-sm text-gray-800 text-center">
                                Gestionar solicitudes.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center mx-3">
                            <svg
                                onClick={() =>
                                    router.push(
                                        '/dashboard/instructor/fichas/[ficha]/[materia]',
                                        `/dashboard/instructor/fichas/${
                                            router.query.ficha
                                        }/${'Ingles'}`,
                                    )
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                className=" cursor-pointer fill-current text-gray-800 h-8 w-8"
                                viewBox="0 0 16 16"
                            >
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                            <p className="text-sm text-gray-800 text-center">
                                Gestionar clases.
                            </p>
                        </div>
                    </div>
                    <h1
                        className="text-left mb-3 text-base text-gray-600"
                        style={{ width: '83.333334%' }}
                    >
                        Gráfica general.
                    </h1>
                    <div className="flex flex-row justify-center items-center w-11/12 md:w-full h-full flex-wrap">
                        <div
                            className="h-96  overflow-none rounded-lg shadow-lg md:mx-2 w-full md:w-5/12 "
                            style={{ border: '1px solid rgba(31, 41, 55,1)' }}
                        >
                            {/* <ResponsiveAreaBump
                        data={data2}
                        margin={{ top: 40, right: 80, bottom: 40, left: 40 }}
                        spacing={8}
                        colors={{ scheme: 'nivo' }}
                    /> */}
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
                        <div className="flex flex-col items-center justify-between h-96  md:mx-2 w-full md:w-5/12 my-2 md:my-none">
                            <div
                                className="w-full mb-1 rounded-lg shadow-lg"
                                style={{
                                    border: '1px solid rgba(31, 41, 55,1)',
                                    height: '49%',
                                }}
                            >
                                <ResponsivePie
                                    margin={{ top: 40, bottom: 40 }}
                                    data={data}
                                    innerRadius={0.5}
                                />
                            </div>
                            <div
                                className="w-full mt-1 rounded-lg shadow-lg"
                                style={{
                                    border: '1px solid rgba(31, 41, 55,1)',
                                    height: '49%',
                                }}
                            >
                                <ResponsivePie
                                    margin={{ top: 40, bottom: 40 }}
                                    data={data}
                                    innerRadius={0.5}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-12 w-full h-auto">
                        <h1 className="text-center text-3xl text-gray-800 mx-auto my-4">
                            Materias
                        </h1>
                        {['Ingles', 'Matematicas', 'Español'].map((value) => (
                            <ItemMaterias
                                titulo={`${value}`}
                                width="w-11/12"
                                clases={['1.Programacion', '2.Diagramas']}
                            ></ItemMaterias>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center items-center w-11/12 ">
                        <h1 className="text-center text-3xl mx-auto my-4 w-auto border-red-500 text-gray-800 p-3 rounded shadow border-t-2">
                            Aprendices en estado critico.
                        </h1>
                        <div className="flex flex-row items-center justify-center flex-wrap w-full">
                            {[1, 2, 3, 4, 5].map(() => (
                                <ItemPersonaAsistencia></ItemPersonaAsistencia>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 col-span-4 bg-gray-200 shadow-lg h-auto w-full flex flex-col items-center overflow-y-visible xl:overflow-y-auto">
                    <h1 className="text-gray-800 text-2xl my-4 text-center font-semibold">
                        Personas
                    </h1>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <ItemLista></ItemLista>
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(Ficha);
