import React from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsivePie } from '@nivo/pie';

import Dashboard from '../../../components/layout/shared/Dashboard';
import { useRouter } from 'next/router';
import WithAuth from '../../../components/utils/WithAuth';

const Aprendiz = () => {
    const router = useRouter();
    const data = [
        {
            day: '2021-02-27',
            value: 0,
        },
        {
            day: '2021-02-15',
            value: 1,
        },
        {
            day: '2021-02-25',
            value: 2,
        },
    ];
    const data2 = [
        {
            id: 'Asistió',
            label: 'Asistió',
            value: 1,
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            value: 3,
        },
    ];
    return (
        <Dashboard>
            <div className="grid gap-4 grid-cols-2 h-full w-full overflow-y-auto">
                <div
                    className="col-span-2 xl:col-span-1 flex flex-col justify-center items-center border-gray-800 bg-green-100 relative"
                    style={{ border: '1px solid' }}
                >
                    <div className="flex-1 w-full">
                        <ResponsivePie
                            margin={{ top: 40, bottom: 40 }}
                            data={data2}
                            colors={[
                                'rgba(52, 211, 153, 1)',
                                'rgba(248, 113, 113, 1)',
                            ]}
                            borderColor="black"
                            borderWidth={1}
                            innerRadius={0.5}
                        />
                    </div>
                    <h1 className="py-4 text-3xl text-gray-800">Estado</h1>
                    {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="cursor-pointer shadow-xl bg-green-300 rounded bottom-0 right-0 absolute  w-10 h-10 fill-current text-gray-800 m-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                        <circle cx="8" cy="4.5" r="1"/>
                    </motion.svg> */}
                </div>

                <div className="col-span-2 xl:col-span-1 flex flex-col justify-between items-center ">
                    <div
                        className="flex flex-col justify-center items-center w-full h-60 mb-3 border-gray-800 relative"
                        style={{ border: '1px solid' }}
                    >
                        <div className="flex-1 w-full">
                            <ResponsiveCalendar
                                data={data}
                                from="2021-03-01"
                                to="2021-03-30"
                                emptyColor="#eeeeee"
                                colors={[' #FF8D33', '#1FFF00', '#FF0000']}
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
                        {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="cursor-pointer shadow-xl bg-green-300 rounded bottom-0 right-0 absolute  w-10 h-10 fill-current text-gray-800 m-4" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                            <circle cx="8" cy="4.5" r="1"/>
                        </motion.svg> */}
                    </div>

                    <div
                        className="flex flex-row justify-evenly items-center w-full h-60 mt-3 border-gray-800 relative"
                        style={{ border: '1px solid' }}
                    >
                        <div
                            className="flex flex-col justify-center items-center"
                            onClick={() =>
                                router.push('/dashboard/aprendiz/solicitudes/')
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-3 text-gray-800 fill-current h-16 w-16 "
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                            </svg>
                            <h1 className="text-xl text-gray-800 text-center mx-auto">
                                Solicitudes de cambio de asistencia
                            </h1>
                        </div>
                        {/* <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-3 text-gray-800 fill-current h-16 w-16 " viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            <h1 className="text-xl text-gray-800 text-center mx-auto">Historial</h1>
                        </div> */}
                        {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="cursor-pointer shadow-xl bg-green-300 rounded bottom-0 right-0 absolute  w-10 h-10 fill-current text-gray-800 m-4" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                            <circle cx="8" cy="4.5" r="1"/>
                        </motion.svg> */}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [3] })(Aprendiz);
