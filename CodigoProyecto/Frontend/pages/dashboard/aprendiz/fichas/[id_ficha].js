import React from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsivePie } from '@nivo/pie';
import Moment from 'moment';
import Dashboard from '../../../../components/layout/shared/Dashboard';
import { useRouter } from 'next/router';
import WithAuth from '../../../../components/utils/WithAuth';
import WithGetOrRedirect from '../../../../components/utils/WithGetOrRedirect';
import { getInfoFicha } from '../../../../actions/aprendizActions';
import ArrowBack from '../../../../svg/arrowback.svg';

const Aprendiz = ({ data }) => {
    const router = useRouter();
    let dataCalendar;
    if (Object.prototype.hasOwnProperty.call(data, 'asignaturas')) {
        data.asignaturas.map((i) => {
            if (Object.prototype.hasOwnProperty.call(i, 'clases')) {
                dataCalendar = i.clases.map((c) => {
                    return {
                        day: c.dia,
                        color:
                            c.asistencias[0].id_tipo_asistencia === 1
                                ? '#ffdd3e'
                                : c.asistencias[0].id_tipo_asistencia === 2
                                ? '#1FFF00'
                                : c.asistencias[0].id_tipo_asistencia === 3
                                ? '#FF0000'
                                : c.asistencias[0].id_tipo_asistencia === 4
                                ? '#FF8D33'
                                : c.asistencias[0].id_tipo_asistencia === 5 &&
                                  '#ffc3c3',
                        label: 'Por firmar',
                        value: 1,
                    };
                });
            }
            return 1;
        });
    }

    const dataChart = [
        {
            id: 'Asistió con retardo',
            label: 'Asistió con retardo',
            color: '#ffdd3e',
            value: data.asistenciaConRetardo,
        },
        {
            id: 'Asistió',
            label: 'Asistió',
            color: '#1FFF00',
            value: data.asistencia,
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            color: '#FF0000',
            value: data.inasistencia,
        },
        {
            id: 'Por firmar',
            label: 'Por firmar',
            color: '#FF8D33',
            value: data.porFirmar,
        },
        {
            id: 'Inasistencia con excusa',
            label: 'Inasistencia con excusa',
            color: '#ffc3c3',
            value: data.inasistenciaConExcusa,
        },
    ].filter((i) => i.value > 0);
    console.log(dataCalendar);
    return (
        <Dashboard>
            <div className="grid gap-4 grid-cols-2 h-full w-full overflow-y-auto relative">
                <ArrowBack
                    className="cursor-pointer top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                    style={{ zIndex: 999 }}
                    onClick={() => router.push('/dashboard/aprendiz/fichas')}
                />
                <div
                    className={`col-span-2 xl:col-span-1 flex flex-col justify-center items-center border-gray-800 ${
                        data.inasistencia >= 3
                            ? 'bg-red-100'
                            : data.inasistencia <= 2 && data.inasistencia > 0
                            ? 'bg-yellow-100'
                            : data.inasistencia === 0 && 'bg-green-100'
                    } relative`}
                    style={{ border: '1px solid' }}
                >
                    <div className="flex-1 w-full">
                        <ResponsivePie
                            margin={{ top: 40, bottom: 40 }}
                            data={dataChart}
                            borderColor="black"
                            colors={(datum) => {
                                return datum.data.color;
                            }}
                            borderWidth={1}
                            innerRadius={0.5}
                        />
                    </div>
                    <h1 className="py-4 text-3xl text-gray-800">Estado</h1>
                </div>

                <div className="col-span-2 xl:col-span-1 flex flex-col justify-between items-center ">
                    <div
                        className="flex-1 flex flex-col justify-center items-center w-full border-gray-800 relative"
                        style={{ border: '1px solid' }}
                    >
                        <div className="flex-1 w-full">
                            <ResponsiveCalendar
                                data={
                                    dataCalendar !== undefined
                                        ? dataCalendar
                                        : []
                                }
                                from={Moment()
                                    .subtract(6, 'months')
                                    .format('yyyy-MM-DD')}
                                to={Moment()
                                    .add(6, 'months')
                                    .format('yyyy-MM-DD')}
                                emptyColor="#eeeeee"
                                margin={{
                                    top: 40,
                                    right: 40,
                                    bottom: 40,
                                    left: 40,
                                }}
                                yearSpacing={40}
                                monthBorderColor="#ffffff"
                                dayBorderWidth={2}
                                dayBorderColor="#ffffff"
                            />
                        </div>
                        <h1 className="py-2 text-center text-gray-800 text-xl">
                            Calendario
                        </h1>
                    </div>

                    {/* <div */}
                    {/*    className="flex flex-row justify-evenly items-center w-full h-60 mt-3 border-gray-800 relative" */}
                    {/*    style={{ border: '1px solid' }} */}
                    {/* > */}
                    {/*    <div className="flex flex-col justify-center items-center"> */}
                    {/*        <svg */}
                    {/*            xmlns="http://www.w3.org/2000/svg" */}
                    {/*            className="mx-3 text-gray-800 fill-current h-16 w-16 " */}
                    {/*            viewBox="0 0 16 16" */}
                    {/*        > */}
                    {/*            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" /> */}
                    {/*            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" /> */}
                    {/*            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" /> */}
                    {/*        </svg> */}
                    {/*        <h1 className="text-xl text-gray-800 text-center mx-auto"> */}
                    {/*            Historial */}
                    {/*        </h1> */}
                    {/*    </div> */}
                    {/* </div> */}
                </div>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [3] })(
    WithGetOrRedirect(
        Aprendiz,
        getInfoFicha,
        (router) => router.push('/dashboard/aprendiz/fichas'),
        (store) => store.aprendiz.fichaById.state,
        (store) => store.aprendiz.fichaById.data,
        'id_ficha',
    ),
);
