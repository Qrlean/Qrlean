import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import CustomSelect from '../shared/CustomSelect';
import CustomForm from '../shared/CustomForm';
import SubmitButton from '../shared/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { crearAsociacion } from '../../../actions/adminActions';

const validationSchema = Yup.object().shape({
    id_usuario: Yup.string()
        .matches(
            /^\d+$/,
            'El id del instructor debería solo contener caracteres numéricos.',
        )
        .required('(Selecciona un aprendiz).'),
});
const AsociarAprendiz = ({ usuarios }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const asociarIsLoading = useSelector(
        (store) => store.admin.fichas.asociarUsuario.loading,
    );
    const formik = useFormik({
        initialValues: {
            id_usuario: '',
        },
        onSubmit: (values) => {
            dispatch(
                crearAsociacion({
                    ...values,
                    id_ficha: parseInt(router.query.id),
                }),
            );
        },
        validationSchema,
    });
    return (
        <CustomForm
            formik={formik}
            title="Asociar aprendiz"
            pathToBack={`/dashboard/admin/fichas/${router.query.id}`}
        >
            <CustomSelect
                formik={formik}
                keyName="id_usuario"
                title={'Usuarios'}
                options={usuarios.map((x) => ({
                    value: x.id_usuario.toString(),
                    name: x.nombres_usuario + ' ' + x.apellidos_usuario,
                }))}
            />
            <SubmitButton
                validationSchema={validationSchema}
                title={'Asociar'}
                formik={formik}
                isLoading={asociarIsLoading}
            />
        </CustomForm>
    );
};

export default AsociarAprendiz;
