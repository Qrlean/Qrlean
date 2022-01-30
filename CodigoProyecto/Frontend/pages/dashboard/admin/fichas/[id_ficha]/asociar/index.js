import React, { useEffect } from 'react';
import Dashboard from '../../../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../../../components/utils/WithAuth';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFichaById,
    getUsuariosThatNotAreInFicha,
} from '../../../../../../actions/adminActions';
import AsociarAprendiz from '../../../../../../components/layout/fichas/AsociarAprendiz';
import AsociarInstructor from '../../../../../../components/layout/fichas/AsociarInstructor';
import { useRouter } from 'next/router';
import WithGetOrRedirect from '../../../../../../components/utils/WithGetOrRedirect';

const Asociar = () => {
    const formik = useFormik({
        initialValues: {
            id_tipo_rol: '3',
        },
    });
    const dispatch = useDispatch();
    const usuarios = useSelector(
        (store) => store.admin.users.usersAsociar.data,
    );
    const router = useRouter();
    useEffect(() => {
        dispatch(
            getUsuariosThatNotAreInFicha({
                id_tipo_rol: formik.values.id_tipo_rol,
                id_ficha: router.query.id_ficha,
            }),
        );
    }, [formik.values.id_tipo_rol]);
    return (
        <Dashboard>
            <div className="py-4 bg-gray-300">
                <div className="flex flex-row justify-center items-center w-full lg:w-2/6 mx-auto">
                    <button
                        className="bg-orange-400 w-1/3 p-3 text-xl mx-4 rounded shadow outline-none"
                        onClick={() => formik.setValues({ id_tipo_rol: '3' })}
                    >
                        Aprendiz
                    </button>
                    <button
                        className="bg-orange-400 w-1/3 p-3 text-xl mx-4 rounded shadow outline-none"
                        onClick={() => formik.setValues({ id_tipo_rol: '2' })}
                    >
                        Instructor
                    </button>
                </div>
            </div>
            {formik.values.id_tipo_rol === '2' ? (
                <AsociarInstructor usuarios={usuarios} />
            ) : (
                <AsociarAprendiz usuarios={usuarios} />
            )}
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(
    WithGetOrRedirect(
        Asociar,
        getFichaById,
        (router) => router.push('/dashboard/admin/fichas'),
        (store) => store.admin.fichaById.state,
        (store) => store.admin.fichaById.data,
        'id_ficha',
    ),
);
