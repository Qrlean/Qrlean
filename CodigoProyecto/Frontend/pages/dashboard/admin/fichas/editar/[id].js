import React from 'react';

import Dashboard from '../../../../../components/utils/Dashboard';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';
import WithAuth from '../../../../../components/utils/WithAuth';
import FormArrowBack from '../../../../../components/utils/FormArrowBack';
import CustomSelect from '../../../../../components/utils/CustomSelect';
import SubmitButton from '../../../../../components/utils/SubmitButton';

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
const EditarFicha = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            id_ficha: '',
            id_programa: '',
        },
        onSubmit: (values) => {
            router.push('/dashboard/admin/fichas');
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
                        Editar ficha
                    </h1>
                    <CustomSelect
                        formik={formik}
                        keyName="id_programa"
                        title={'Programa'}
                        options={[
                            {
                                value: '0',
                                name: 'Seleccione un programa',
                            },
                            {
                                value: '1',
                                name: 'Programacion',
                            },
                        ]}
                    />
                    <SubmitButton
                        title={'Crear'}
                        formik={formik}
                        isLoading={false}
                    />
                </form>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(EditarFicha);
