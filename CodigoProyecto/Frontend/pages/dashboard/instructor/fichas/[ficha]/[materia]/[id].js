import React from 'react';
import Dashboard from '../../../../../../components/utils/Dashboard';
import ItemAprendiz from '../../../../../../components/layout/firmarAsistencia/ItemAprendiz';
// import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
const FirmarClase = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {},
    });
    return (
        <Dashboard>
            <form
                className="w-2/3 h-full overflow-y-auto mx-auto"
                onSubmit={formik.handleSubmit}
            >
                <div
                    className="flex flex-row justify-between items-center rounded border-gray-800 p-4"
                    style={{ border: '1px solid' }}
                >
                    <svg
                        viewBox="0 0 20 20"
                        fill="black"
                        className="cursor-pointer w-10 h-10 fill-current text-gray-800 mx-4"
                        onClick={() =>
                            router.push(
                                '/dashboard/instructor/fichas/[ficha]/[materia]',
                                `/dashboard/instructor/fichas/${router.query.ficha}/${router.query.materia}`,
                            )
                        }
                    >
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                    </svg>
                    <button className="text-gray-800 text-xl text-center underline outline-none mx-3">
                        Seleccionar todos como asistió
                    </button>
                    <button className="text-gray-800 text-xl text-center underline outline-none mx-3">
                        Seleccionar todos como no asistió
                    </button>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <ItemAprendiz></ItemAprendiz>
                ))}
                <button
                    className="outline-none w-full border-gray-800 p-4 text-center text-gray-800 text-xl bg-orange-400"
                    style={{ border: '1px solid' }}
                >
                    Guardar
                </button>
            </form>
        </Dashboard>
    );
};

export default FirmarClase;
