import React from 'react';

import Dashboard from '../../../../../components/utils/Dashboard';

import Loader from 'react-loader-spinner';
import { AnimatePresence, motion } from 'framer-motion';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRouter } from 'next/router';
import WithAuth from '../../../../../components/utils/WithAuth';
import FormArrowBack from '../../../../../components/utils/FormArrowBack';

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
const infoVariants = {
    hover: {
        rotate: -10,
        scale: 1,
    },
};
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
        .max(50, 'La dirección debería tener máximo 50 caracteres .')
        .nullable(),
    telefono: Yup.string()
        .matches(
            /^\d+$/,
            'El teléfono debería solo contener caracteres numéricos.',
        )
        .min(5, 'El teléfono debería tener mínimo 5 caracteres.')
        .max(20, 'El teléfono debería tener máximo 20 caracteres.')
        .nullable(),
});
const EditarPersona = () => {
    const router = useRouter();
    const loader = false;
    const formik = useFormik({
        initialValues: {
            _id: '',
            nombres: '',
            apellidos: '',
            ciudad: '',
            documento: '',
            tipo_doc: '',
            email: '',
            direccion: '',
            telefono: '',
            rol: '',
            __v: '',
            activo: '',
        },
        onSubmit: (values) => {
            router.push('/dasboard/admin/personas');
            // values = _.omit(values,(value,key,object)=>{
            //     if(value === ''){
            //         return true
            //     }
            //     return _.isNull(value)
            // })
            // dispatch(editarInstructor({values,instructor:_.omit(isInstructor,(value,key,object)=>{
            //     return _.isNull(value)
            // })}))
        },
        validationSchema,
    });
    return (
        <Dashboard>
            <div className="h-full w-full overflow-y-scroll bg-gray-300 flex flex-col py-6">
                {/* {loading || isInstructor === null ?
                    <div className="flex flex-row justify-center items-center h-full">
                        <Loader
                            type="Circles"
                            color="#545454"
                            height={80}
                            width={80}
                            className="mx-2"
                        />
                        <h1 className="text-gray-800 text-3xl">Cargando...</h1>
                    </div>
                :
                    success && isInstructor ?
                    */}
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
                        onClick={() => router.push('/dashboard/admin/personas')}
                    />
                    <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                        Editar registro
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
                        Numero de documento
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
                            'Editar'
                        )}
                    </button>
                </form>
                {/* :
                    <div className="h-full mx-auto flex flex-col justify-center">
                        <h1 className="text-red-500 text-center text-2xl mx-auto">Error al intentar establecer el instructor (probablemente no tienes privilegios o el instructor no existe).</h1>
                    </div>
                } */}
            </div>
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(EditarPersona);
