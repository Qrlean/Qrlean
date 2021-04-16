import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Dashboard from '../../../../../components/utils/Dashboard';
import AsociarAprendiz from '../../../../../components/layout/fichas/AsociarAprendiz';
import AsociarInstructor from '../../../../../components/layout/fichas/AsociarInstructor';
import Teacher from '../../../../../svg/teacher2.svg';
import Cursos from '../../../../../svg/cursos.svg';
const Asociar = () => {
    const router = useRouter();
    console.log(router.query);
    const [asociarRol, setAsociarRol] = useState(null);
    return (
        <Dashboard>
            <div className="h-full w-full overflow-y-scroll bg-gray-300 flex flex-col py-6 relative">
                {!asociarRol && (
                    <svg
                        onClick={() =>
                            router.push(
                                '/dashboard/admin/fichas/[ficha]',
                                `/dashboard/admin/fichas/${router.query.ficha}`,
                            )
                        }
                        viewBox="0 0 20 20"
                        fill="black"
                        className="cursor-pointer   top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                    >
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                    </svg>
                )}
                {asociarRol === 'INS' ? (
                    <AsociarInstructor
                        setAsociarRol={setAsociarRol}
                    ></AsociarInstructor>
                ) : asociarRol === 'APR' ? (
                    <AsociarAprendiz
                        setAsociarRol={setAsociarRol}
                    ></AsociarAprendiz>
                ) : (
                    !asociarRol && (
                        <div className="grid grid-cols-2 w-full h-full">
                            <div className="col-span-2 lg:col-span-1 flex flex-col justify-center items-center bg-green-200">
                                <Teacher className="h-80 w-80"></Teacher>
                                <button
                                    onClick={() => setAsociarRol('INS')}
                                    className="border-gray-800 text-3xl bg-green-500 rounded p-2 shadow-lg text-gray-800 outline-none"
                                    style={{ border: ' 1px solid' }}
                                >
                                    Asociar instructor.
                                </button>
                            </div>
                            <div className="col-span-2 lg:col-span-1 flex flex-col justify-center items-center bg-orange-200">
                                <Cursos className="h-80 w-80"></Cursos>
                                <button
                                    onClick={() => setAsociarRol('APR')}
                                    className="border-gray-800 text-3xl bg-orange-500 rounded p-2 shadow-lg text-gray-800 outline-none"
                                    style={{ border: ' 1px solid' }}
                                >
                                    Asociar aprendiz.
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Dashboard>
    );
};

export default Asociar;
