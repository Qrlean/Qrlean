import React, { useEffect } from 'react';

import Dashboard from '../../../../../components/layout/shared/Dashboard';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import WithAuth from '../../../../../components/utils/WithAuth';
import CustomSelect from '../../../../../components/layout/shared/CustomSelect';
import SubmitButton from '../../../../../components/layout/shared/SubmitButton';
import WithEdit from '../../../../../components/utils/WithEdit';
import {
    editarFicha,
    getFichaById,
    getProgramas,
} from '../../../../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomForm from '../../../../../components/layout/shared/CustomForm';

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
const EditarFicha = ({ data }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProgramas());
    }, []);
    const programas = useSelector((store) => store.admin.programas.data);
    const formik = useFormik({
        initialValues: {
            id_ficha: data.id_ficha,
            id_programa: data.id_programa,
        },
        onSubmit: (values) => {
            dispatch(editarFicha(values));
        },
        validationSchema,
    });
    const fichaEditIsLoading = useSelector(
        (store) => store.admin.fichas.editFicha.editingLoading,
    );

    return (
        <Dashboard>
            <CustomForm
                pathToBack="/dashboard/admin/fichas"
                formik={formik}
                title="Editar ficha"
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
                    title={'Editar'}
                    formik={formik}
                    isLoading={fichaEditIsLoading}
                />
            </CustomForm>
        </Dashboard>
    );
};
export default WithAuth({ rol: [1] })(
    WithEdit(
        EditarFicha,
        getFichaById,
        '/dashboard/admin/fichas',
        (store) => store.admin.fichaById.state,
        (store) => store.admin.fichaById.data,
    ),
);
