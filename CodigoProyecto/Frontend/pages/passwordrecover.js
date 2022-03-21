import React from 'react';
import Header from '../components/layout/shared/Header';
import WithRedirect from '../components/utils/WithRedirect';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { passwordRecoveryRequest } from '../actions/appActions';
import { useDispatch } from 'react-redux';

const errorVariants = {
    initial: {
        height: '0px',
        display: 'none',
    },
    animate: {
        height: 'auto',
        transition: {
            duration: 0.5,
        },
    },
    unshow: {
        height: '0px',
        transition: {
            duration: 0.5,
        },
    },
};
const validationSchema = Yup.object().shape({
    numero_documento: Yup.string()
        .matches(
            /^\d+$/,
            'El documento debería solo contener caracteres numéricos.',
        )
        .min(3, 'El documento debería tener mínimo 3 caracteres.')
        .max(20, 'El documento debería tener máximo 20 caracteres.')
        .required('El campo documento es requerido.'),
    id_tipo_documento: Yup.string(
        'El tipo de documento debería solo contener caracteres alfanuméricos.',
    )
        .min(
            1,
            'El tipo de documento debería tener mínimo 1 caracteres (selecciona algún documento).',
        )
        .max(
            1,
            'El tipo de documento debería tener máximo 1 caracteres (selecciona algún documento).',
        )
        .required('El campo tipo de documento es requerido.'),
});
const RecuperarContrasena = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            numero_documento: '',
            id_tipo_documento: '',
        },
        onSubmit: (values) => {
            dispatch(passwordRecoveryRequest(values));
        },
        validationSchema,
    });
    return (
        <div className="bg-gray-100 h-full overflow-x-hidden min-h-screen">
            <Header forceBackground={true} />
            <form
                className="mt-40 flex flex-col justify-center items-center w-80 mx-auto"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-xl text-gray-800 text-center">
                    Recuperar contraseña.
                </h1>
                <AnimatePresence>
                    {formik.errors.numero_documento &&
                    formik.touched.numero_documento ? (
                        <motion.p
                            initial="initial"
                            animate="animate"
                            exit="unshow"
                            variants={errorVariants}
                            className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                        >
                            {formik.errors.numero_documento}
                        </motion.p>
                    ) : null}
                </AnimatePresence>
                <input
                    type="text"
                    placeholder="Ingrese un numero de documento"
                    name="numero_documento"
                    onChange={formik.handleChange}
                    value={formik.values.numero_documento}
                    className="outline-none bg-gray-300 p-3  text-gray-800 my-2 w-full"
                />
                {/* Campo tipo documento */}
                <AnimatePresence>
                    {formik.errors.id_tipo_documento &&
                    formik.touched.id_tipo_documento ? (
                        <motion.p
                            initial="initial"
                            animate="animate"
                            exit="unshow"
                            variants={errorVariants}
                            className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                        >
                            {formik.errors.id_tipo_documento}
                        </motion.p>
                    ) : null}
                </AnimatePresence>
                <select
                    name="id_tipo_documento"
                    onChange={formik.handleChange}
                    value={formik.values.id_tipo_documento}
                    className="text-center outline-none bg-gray-300 p-2  text-gray-800 my-2 w-full"
                >
                    <option value="" selected>
                        Tipo de documento.
                    </option>
                    <option value="1">CC Cedula de ciudadanía.</option>
                    <option value="2">TI Tarjeta de identidad.</option>
                    <option value="3">CE Cedula de extranjería.</option>
                    <option value="4">PA Pasaporte.</option>
                </select>
                <button
                    type="submit"
                    className="bg-orange-400 m-4  p-2 outline-none text-gray-800 text-xl  w-full rounded shadow-lg"
                >
                    Enviar correo.
                </button>
            </form>
        </div>
    );
};

export default WithRedirect(RecuperarContrasena);
