import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Dashboard from '../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../components/utils/WithAuth';
import CustomSelect from '../../../../components/layout/shared/CustomSelect';
import SubmitButton from '../../../../components/layout/shared/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { crearFicha, getProgramas } from '../../../../actions/adminActions';
import CustomForm from '../../../../components/layout/shared/CustomForm';

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
            id_programa: '',
        },
        onSubmit: (values) => {
            dispatch(crearFicha(values));
        },
        validationSchema,
    });
    return (
        <Dashboard>
            <CustomForm
                pathToBack="/dashboard/admin/fichas"
                formik={formik}
                title="Crear ficha"
            >
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
                    validationSchema={validationSchema}
                    title={'Crear'}
                    formik={formik}
                    isLoading={createIsLoading}
                />
            </CustomForm>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(CrearFicha);
