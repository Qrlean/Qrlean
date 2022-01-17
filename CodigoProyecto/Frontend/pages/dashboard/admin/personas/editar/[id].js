import React from 'react';

import Dashboard from '../../../../../components/layout/shared/Dashboard';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';
import WithAuth from '../../../../../components/utils/WithAuth';
import FormArrowBack from '../../../../../components/layout/shared/FormArrowBack';
import CustomInput from '../../../../../components/layout/shared/CustomInput';
import CustomSelect from '../../../../../components/layout/shared/CustomSelect';
import SubmitButton from '../../../../../components/layout/shared/SubmitButton';
import WithEdit from '../../../../../components/utils/WithEdit';
import {
    editarUsuario,
    getUsuarioById,
} from '../../../../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
    nombres_usuario: Yup.string()
        .matches(
            /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/,
            'Los nombres debería solo contener caracteres alfabéticos.',
        )
        .min(4, 'Los nombres debería tener mínimo 4 caracteres.')
        .max(100, 'Los nombres debería tener máximo 100 caracteres.')
        .required('El campo nombres es requerido.'),
    apellidos_usuario: Yup.string()
        .matches(
            /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/,
            'Los apellidos debería solo contener caracteres alfabéticos.',
        )
        .min(4, 'Los apellidos debería tener mínimo 4 caracteres.')
        .max(100, 'Los apellidos debería tener máximo 100 caracteres.')
        .required('El campo apellidos es requerido.'),
    numero_documento: Yup.string()
        .matches(
            /^\d+$/,
            'El documento debería solo contener caracteres numéricos.',
        )
        .min(4, 'El documento debería tener mínimo 4 caracteres.')
        .max(20, 'El documento debería tener máximo 20 caracteres.')
        .required('El campo numero de documento es requerido.'),
    emailInstitucional: Yup.string()
        .email('El email debería tener el formato de un email.')
        .required('El campo email es requerido.'),
    direccion_residencial: Yup.string()
        .min(5, 'La dirección debería tener mínimo 5 caracteres .')
        .max(50, 'La dirección debería tener máximo 50 caracteres .')
        .required('El campo direccion es requerido.'),
    telefono_movil: Yup.number()
        .min(1000000000, 'El minimo de digitos permitidos es de 10 digitos')
        .max(9999999999, 'El maximo de digitos permitidos es de 10 digitos')
        .required('El campo telefono movil es requerido.'),
    id_tipo_documento: Yup.string('Seleccione algun documento.')
        .min(1, 'Seleccione algun documento.')
        .required('El campo tipo de documento es requerido.'),
    id_ciudad: Yup.string('Seleccione alguna ciudad.')
        .min(1, 'Seleccione alguna ciudad.')
        .required('El campo ciudad es requerido.'),
    id_tipo_rol: Yup.string('Seleccione algun documento.')
        .min(1, 'Seleccione algun documento.')
        .required('El campo tipo de rol es requerido.'),
});
const EditarPersona = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const editUserIsLoading = useSelector(
        (store) => store.admin.users.editUser.editingLoading,
    );
    const formik = useFormik({
        initialValues: {
            id_usuario: data.id_usuario,
            nombres_usuario: data.nombres_usuario,
            apellidos_usuario: data.apellidos_usuario,
            numero_documento: data.numero_documento.toString(),
            emailInstitucional: data.emailInstitucional,
            direccion_residencial: data.direccion_residencial,
            telefono_movil: data.telefono_movil.toString(),
            id_tipo_documento: data.id_tipo_documento.toString(),
            id_ciudad: data.id_ciudad.toString(),
            id_tipo_rol: data.id_tipo_rol.toString(),
        },
        onSubmit: (values) => {
            dispatch(editarUsuario(values));
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
                        onClick={() => router.push('/dashboard/admin/personas')}
                    />
                    <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                        Editar registro
                    </h1>
                    <CustomInput
                        title="Nombres"
                        formik={formik}
                        keyName={'nombres_usuario'}
                    />
                    <CustomInput
                        title="Apellidos"
                        formik={formik}
                        keyName={'apellidos_usuario'}
                    />
                    <CustomInput
                        title="Numero documento"
                        formik={formik}
                        keyName={'numero_documento'}
                    />
                    <CustomInput
                        title="Email"
                        formik={formik}
                        keyName={'emailInstitucional'}
                    />
                    <CustomInput
                        title="Telefono"
                        formik={formik}
                        keyName={'telefono_movil'}
                    />
                    <CustomInput
                        title="Direccion"
                        formik={formik}
                        keyName={'direccion_residencial'}
                    />
                    <CustomSelect
                        title="Tipo de documento"
                        formik={formik}
                        keyName={'id_tipo_documento'}
                        options={[
                            {
                                value: '0',
                                name: 'Seleccione su tipo de documento',
                            },
                            {
                                value: '1',
                                name: 'CC Cedula de ciudadanía.',
                            },
                            { value: '2', name: 'TI Tarjeta de identidad.' },
                            { value: '3', name: 'CE Cedula de extranjería.' },
                            { value: '4', name: 'PA Pasaporte.' },
                        ]}
                    />
                    <CustomSelect
                        title="Ciudad"
                        formik={formik}
                        keyName={'id_ciudad'}
                        options={[
                            {
                                value: '0',
                                name: 'Seleccione una ciudad',
                            },
                            {
                                value: '1',
                                name: 'Bogota',
                            },
                            {
                                value: '2',
                                name: 'Medellin',
                            },
                        ]}
                    />
                    <CustomSelect
                        title="Rol"
                        formik={formik}
                        keyName={'id_tipo_rol'}
                        options={[
                            {
                                value: '0',
                                name: 'Seleccione un rol',
                            },
                            {
                                value: '1',
                                name: 'Administrador',
                            },
                            {
                                value: '2',
                                name: 'Instructor',
                            },
                            {
                                value: '3',
                                name: 'Aprendiz',
                            },
                        ]}
                    />
                    <SubmitButton
                        isLoading={editUserIsLoading}
                        title="Editar"
                        formik={formik}
                    />
                </form>
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(
    WithEdit(
        EditarPersona,
        getUsuarioById,
        '/dashboard/admin/personas',
        (store) => store.admin.users.editUser.state,
        (store) => store.admin.users.editUser.data,
    ),
);
