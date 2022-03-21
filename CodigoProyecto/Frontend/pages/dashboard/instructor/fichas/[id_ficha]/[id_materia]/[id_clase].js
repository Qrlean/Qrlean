import React, { useEffect, useState } from 'react';
import Dashboard from '../../../../../../components/layout/shared/Dashboard';
import ItemAprendiz from '../../../../../../components/layout/firmarAsistencia/ItemAprendiz';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import WithAuth from '../../../../../../components/utils/WithAuth';
import {
    createAsistencias,
    getAsignaturaById,
    getAsistenciasClase,
    getFichaById,
} from '../../../../../../actions/teacherActions';
import WithGetOrRedirect from '../../../../../../components/utils/WithGetOrRedirect';
import { useDispatch } from 'react-redux';
const QrCode = require('qrcode');
const FirmarClase = ({ data }) => {
    const [qr, setQr] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            asistencias: data.map((item) => ({
                id_asistencia: item.id_asistencia,
                id_asociacion_usuario_ficha:
                    item.aprendiz.id_asociacion_usuario_ficha,
                id_tipo_asistencia: item.id_tipo_asistencia,
            })),
        },
        onSubmit: (values) => {
            dispatch(
                createAsistencias({
                    id_clase: router.query.id_clase,
                    asistencias: values.asistencias,
                }),
            );
        },
    });
    const handleAllCheckAsistio = () => {
        formik.setValues({
            asistencias: formik.values.asistencias.map((item) => ({
                ...item,
                id_tipo_asistencia: 3,
            })),
        });
    };
    const handleAllCheckNoAsistio = () => {
        formik.setValues({
            asistencias: formik.values.asistencias.map((item) => ({
                ...item,
                id_tipo_asistencia: 2,
            })),
        });
    };
    useEffect(() => {
        const getQr = async () => {
            setQr(
                await QrCode.toDataURL(
                    `https://www.qrlean.software/firmar/${router.query.id_clase}`,
                    { margin: 0 },
                ),
            );
        };
        getQr();
    }, []);

    return (
        <Dashboard>
            <form
                className="w-full md:w-2/3 h-full overflow-y-auto mx-auto my-4"
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
                                `/dashboard/instructor/fichas/${router.query.id_ficha}/${router.query.id_materia}`,
                            )
                        }
                    >
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10" />
                    </svg>
                    <button
                        type="button"
                        className="text-gray-800 text-base md:text-xl text-center underline outline-none mx-1 lg:mx-3"
                        onClick={handleAllCheckAsistio}
                    >
                        Seleccionar todos como asistió
                    </button>
                    <button
                        type="button"
                        className="text-gray-800 text-base md:text-xl text-center underline outline-none mx-1 md:mx-3"
                        onClick={handleAllCheckNoAsistio}
                    >
                        Seleccionar todos como no asistió
                    </button>
                </div>
                {data.map((item) => (
                    <ItemAprendiz
                        formik={formik}
                        data={item}
                        key={item.id_asistencia}
                    />
                ))}
                <button
                    className="outline-none w-full border-gray-800 p-4 text-center text-gray-800 text-xl bg-orange-400 my-2 "
                    style={{ border: '1px solid' }}
                >
                    Guardar
                </button>
                <div className="absolute top-0 right-0 m-4 lg:m-8 hidden lg:block">
                    <img src={qr} className="w-32 h-32" alt="qr" />
                </div>
            </form>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(
    WithGetOrRedirect(
        WithGetOrRedirect(
            WithGetOrRedirect(
                FirmarClase,
                getAsistenciasClase,
                (router) =>
                    router.push(
                        `/dashboard/instructor/fichas/${router.query.id_ficha}/${router.query.id_materia}`,
                    ),
                (store) => store.teacher.getAsistenciasByClase.state,
                (store) => store.teacher.getAsistenciasByClase.data,
                'id_clase',
            ),
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
