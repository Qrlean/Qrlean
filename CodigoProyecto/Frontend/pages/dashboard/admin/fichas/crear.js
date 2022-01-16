import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';

import Dashboard from '../../../../components/utils/Dashboard';
import WithAuth from '../../../../components/utils/WithAuth';
import FormArrowBack from '../../../../components/utils/FormArrowBack';
import CustomSelect from '../../../../components/utils/CustomSelect';
import SubmitButton from '../../../../components/utils/SubmitButton';

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
    const formik = useFormik({
        initialValues: {
            id_programa: '',
        },
        onSubmit: (values) => {
            console.log(values);
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
                    {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="cursor-pointer shadow-xl bg-orange-300 rounded top-0 right-0 absolute  w-10 h-10 fill-current text-gray-800 m-4" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                            <circle cx="8" cy="4.5" r="1"/>
                    </motion.svg> */}
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

export default WithAuth({ rol: [1] })(CrearFicha);
