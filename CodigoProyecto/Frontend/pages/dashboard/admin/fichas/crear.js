import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';

import Dashboard from '../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../components/utils/WithAuth';
import FormArrowBack from '../../../../components/layout/shared/FormArrowBack';
import CustomSelect from '../../../../components/layout/shared/CustomSelect';
import SubmitButton from '../../../../components/layout/shared/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { crearFicha, getProgramas } from '../../../../actions/adminActions';

const validationSchema = Yup.object().shape({
    id_programa: Yup.string()
        .matches(
            /^[0-9]*$/,
            'El programa solo debería tener caracteres numéricos (Elige una opción).',
        )
        .min(1, 'El programa debería tener mínimo 1 caracteres.')
        .max(20, 'El programa debería tener máximo 20 caracteres.')
        .required('El campo programa es requerido.'),
});
const CrearFicha = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProgramas());
    }, []);
    const programas = useSelector((store) => store.admin.programas.data);
    const createIsLoading = useSelector(
        (store) => store.admin.fichas.createFicha.loading,
    );
    const formik = useFormik({
        initialValues: {
            id_programa: '0',
        },
        onSubmit: (values) => {
            dispatch(crearFicha(values));
        },
        validationSchema,
    });

    return (
        <Dashboard>
            <div className="h-full w-full overflow-y-scroll bg-gray-300 flex flex-col py-6">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col justify-center w-full lg:w-2/6 mx-auto rounded relative shadow-xl bg-white border-t-4 border-orange-600"
                    autoComplete="off"
                >
                    <FormArrowBack
                        onClick={() => router.push('/dashboard/admin/fichas')}
                    />
                    <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                        Crear ficha.
                    </h1>
                    <CustomSelect
                        formik={formik}
                        keyName="id_programa"
                        title={'Programa'}
                        options={programas.map((x) => ({
                            value: x.id_programa.toString(),
                            name: x.nombre_programa,
                        }))}
                    />
                    <SubmitButton
                        title={'Crear'}
                        formik={formik}
                        isLoading={createIsLoading}
                    />
                </form>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(CrearFicha);
