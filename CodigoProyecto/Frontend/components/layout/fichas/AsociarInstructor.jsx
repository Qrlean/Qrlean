import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';
import CustomSelect from '../shared/CustomSelect';
import CustomForm from '../shared/CustomForm';
import { crearAsociacion, getAsignaturas } from '../../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/SubmitButton';

const validationSchema = Yup.object().shape({
    id_usuario: Yup.string()
        .matches(
            /^\d+$/,
            'El id del instructor debería solo contener caracteres numéricos.',
        )
        .required('(Selecciona un instructor).'),
    id_asignatura: Yup.string()
        .matches(
            /^\d+$/,
            'El id de la asignatura debería solo contener caracteres numéricos.',
        )
        .required('(Selecciona una asignatura).'),
});
const AsociarInstructor = ({ usuarios }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAsignaturas());
    }, []);
    const formik = useFormik({
        initialValues: {
            id_usuario: '',
            id_asignatura: '',
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
    const asignaturas = useSelector((store) => store.admin.asignaturas.data);

    return (
        <CustomForm
            formik={formik}
            title="Asociar Instructor"
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
            <CustomSelect
                formik={formik}
                keyName="id_asignatura"
                title={'Asignatura'}
                options={asignaturas.map((x) => ({
                    value: x.id_asignatura.toString(),
                    name: x.nombre_asignatura,
                }))}
            />
            <SubmitButton
                validationSchema={validationSchema}
                title={'Asociar'}
                formik={formik}
                isLoading={false}
            />
        </CustomForm>
    );
};

export default AsociarInstructor;
