import React from 'react';

import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import Dashboard from '../../../../components/utils/Dashboard';

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
// const infoVariants = {
//     hover: {
//         rotate: -10,
//         scale: 1,
//     },
// };
const validationSchema = Yup.object().shape({
    nombres: Yup.string()
        .matches(
            /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/,
            'Los nombres debería solo contener caracteres alfabéticos.',
        )
        .min(4, 'Los nombres debería tener mínimo 4 caracteres.')
        .max(100, 'Los nombres debería tener máximo 100 caracteres.')
        .required('El campo nombres es requerido.'),
    apellidos: Yup.string()
        .matches(
            /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/,
            'Los apellidos debería solo contener caracteres alfabéticos.',
        )
        .min(4, 'Los apellidos debería tener mínimo 4 caracteres.')
        .max(100, 'Los apellidos debería tener máximo 100 caracteres.')
        .required('El campo apellidos es requerido.'),
    documento: Yup.string()
        .matches(
            /^\d+$/,
            'El documento debería solo contener caracteres numéricos.',
        )
        .min(4, 'El documento debería tener mínimo 4 caracteres.')
        .max(20, 'El documento debería tener máximo 20 caracteres.')
        .required('El campo documento es requerido.'),
    tipo_doc: Yup.string(
        'El tipo de documento debería solo contener caracteres alfanuméricos.',
    )
        .min(
            2,
            'El tipo de documento debería tener mínimo 2 caracteres (selecciona algún documento).',
        )
        .max(
            2,
            'El tipo de documento debería tener máximo 2 caracteres (selecciona algún documento).',
        )
        .required('El campo tipo de documento es requerido.'),
    ciudad: Yup.string(
        'La ciudad debería solo contener caracteres alfanuméricos.',
    )
        .min(
            1,
            'La ciudad debería tener mínimo 2 caracteres (selecciona alguna ciudad).',
        )
        .max(
            1,
            'La ciudad debería tener máximo 2 caracteres (selecciona alguna ciudad).',
        )
        .required('El campo ciudad es requerido.'),
    rol: Yup.string(
        'El tipo de rol debería solo contener caracteres alfanuméricos.',
    )
        .min(
            3,
            'El tipo de rol debería tener mínimo 3 caracteres (selecciona algún rol).',
        )
        .max(
            3,
            'El tipo de rol debería tener máximo 3 caracteres (selecciona algún rol).',
        )
        .required('El campo tipo de rol es requerido.'),
    email: Yup.string()
        .email('El email debería tener el formato de un email.')
        .required('El campo email es requerido.'),
    direccion: Yup.string()
        .min(5, 'La dirección debería tener mínimo 5 caracteres .')
        .max(50, 'La dirección debería tener máximo 50 caracteres .'),
    telefono: Yup.string()
        .matches(
            /^\d+$/,
            'El teléfono debería solo contener caracteres numéricos.',
        )
        .min(5, 'El teléfono debería tener mínimo 5 caracteres.')
        .max(20, 'El teléfono debería tener máximo 20 caracteres.'),
});
const CrearUsuario = () => {
    const router = useRouter();
    const loader = false;
    const formik = useFormik({
        initialValues: {
            nombres: '',
            apellidos: '',
            ciudad: '',
            documento: '',
            tipo_doc: '',
            email: '',
            direccion: '',
            telefono: '',
            rol: '',
        },
        onSubmit: (values) => {
            router.push('/dashboard/admin/personas');
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
                    <svg
                        viewBox="0 0 20 20"
                        fill="black"
                        className="cursor-pointer   top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                        onClick={() => router.push('/dashboard/admin/personas')}
                    >
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                    </svg>
                    <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                        Registrar persona.
                    </h1>
                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="nombres"
                    >
                        Nombres
                    </label>
                    <AnimatePresence>
                        {formik.errors.nombres && formik.touched.nombres ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.nombres}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4 "
                        type="text"
                        id="nombres"
                        name="nombres"
                        placeholder="Ingrese los nombres."
                        onChange={formik.handleChange}
                        value={formik.values.nombres}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="apellidos"
                    >
                        Apellidos
                    </label>
                    <AnimatePresence>
                        {formik.errors.apellidos && formik.touched.apellidos ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.apellidos}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4 "
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        placeholder="Ingrese los apellidos."
                        onChange={formik.handleChange}
                        value={formik.values.apellidos}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="documento"
                    >
                        Documento
                    </label>
                    <AnimatePresence>
                        {formik.errors.documento && formik.touched.documento ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.documento}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        type="text"
                        id="documento"
                        name="documento"
                        placeholder="Ingrese un documento."
                        onChange={formik.handleChange}
                        value={formik.values.documento}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="tipo_doc"
                    >
                        Tipo de documento.
                    </label>
                    <AnimatePresence>
                        {formik.errors.tipo_doc && formik.touched.tipo_doc ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.tipo_doc}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <select
                        id="tipo_doc"
                        className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        name="tipo_doc"
                        onChange={formik.handleChange}
                        value={formik.values.tipo_doc}
                    >
                        <option value="" selected>
                            -Seleccione una opción-
                        </option>
                        <option value="CC">CC Cedula de ciudadanía.</option>
                        <option value="TI">TI Tarjeta de identidad.</option>
                        <option value="CE">CE Cedula de extranjería.</option>
                        <option value="PA">PA Pasaporte.</option>
                    </select>

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="tipo_doc"
                    >
                        Ciudad.
                    </label>
                    <AnimatePresence>
                        {formik.errors.ciudad && formik.touched.ciudad ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.ciudad}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <select
                        id="ciudad"
                        className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        name="ciudad"
                        onChange={formik.handleChange}
                        value={formik.values.ciudad}
                    >
                        <option value="" selected>
                            -Seleccione una opción-
                        </option>
                        <option value="1">Bogotá.</option>
                        <option value="2">Calí.</option>
                    </select>

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="rol"
                    >
                        Rol.
                    </label>
                    <AnimatePresence>
                        {formik.errors.rol && formik.touched.rol ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.rol}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <select
                        id="rol"
                        className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        name="rol"
                        onChange={formik.handleChange}
                        value={formik.values.rol}
                    >
                        <option value="" selected>
                            -Seleccione una opción-
                        </option>
                        <option value="INS">Instructor</option>
                        <option value="APR">Aprendiz</option>
                    </select>

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <AnimatePresence>
                        {formik.errors.email && formik.touched.email ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.email}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Ingrese un email."
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="direccion"
                    >
                        Dirección
                    </label>
                    <AnimatePresence>
                        {formik.errors.direccion && formik.touched.direccion ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.direccion}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        type="text"
                        id="direccion"
                        name="direccion"
                        placeholder="Ingrese un dirección."
                        onChange={formik.handleChange}
                        value={formik.values.direccion}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="telefono"
                    >
                        Teléfono
                    </label>
                    <AnimatePresence>
                        {formik.errors.telefono && formik.touched.telefono ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.telefono}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        tpe="text"
                        id="telefono"
                        name="telefono"
                        placeholder="Ingrese un teléfono."
                        onChange={formik.handleChange}
                        value={formik.values.telefono}
                    />

                    <button
                        className={
                            formik.isValid &&
                            formik.values.nombres !== '' &&
                            formik.values.apellidos !== '' &&
                            formik.values.ciudad !== '' &&
                            formik.values.documento !== '' &&
                            formik.values.tipo_doc !== '' &&
                            formik.values.email !== '' &&
                            formik.values.rol !== ''
                                ? 'bg-red-500 rounded w-11/12 outline-none p-3 text-white text-base font-extrabold mx-auto my-6 '
                                : 'bg-red-300 rounded w-11/12 mx-auto outline-none p-3 text-white text-base font-extrabold my-6 cursor-not-allowed'
                        }
                        type={formik.isValid && 'submit'}
                    >
                        {loader ? (
                            <div className="flex flex-row justify-center items-center">
                                <Loader
                                    type="Circles"
                                    color="#FFFFFF"
                                    height={24}
                                    width={24}
                                    className="mx-2"
                                />
                                Cargando...
                            </div>
                        ) : (
                            'Crear'
                        )}
                    </button>
                </form>
            </div>
        </Dashboard>
    );
};

export default CrearUsuario;
