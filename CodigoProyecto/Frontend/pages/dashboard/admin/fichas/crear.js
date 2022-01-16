import React from 'react';

import Loader from 'react-loader-spinner';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { AnimatePresence, motion } from 'framer-motion';

import { useRouter } from 'next/router';

import Dashboard from '../../../../components/utils/Dashboard';
import WithAuth from '../../../../components/utils/WithAuth';

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
    numero: Yup.string()
        .matches(
            /^[0-9]*$/,
            'El numero de ficha solo debería tener caracteres numéricos.',
        )
        .min(4, 'El numero debería tener mínimo 4 caracteres.')
        .max(100, 'El numero debería tener máximo 100 caracteres.')
        .required('El campo numero es requerido.'),
    programa: Yup.string()
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
    const loader = false;
    const formik = useFormik({
        initialValues: {
            numero: '',
            programa: '',
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
                    <svg
                        viewBox="0 0 20 20"
                        fill="black"
                        className="cursor-pointer   top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                        onClick={() => router.push('/dashboard/admin/fichas')}
                    >
                        <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                    </svg>
                    <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">
                        Crear ficha.
                    </h1>
                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="numero"
                    >
                        Numero
                    </label>
                    <AnimatePresence>
                        {formik.errors.numero && formik.touched.numero ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.numero}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <input
                        className="text-gray-800 shadow-xl w-11/12 mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4 "
                        type="text"
                        id="numero"
                        name="numero"
                        placeholder="Ingrese un numero."
                        onChange={formik.handleChange}
                        value={formik.values.numero}
                    />

                    <label
                        className="text-gray-800 text-xl mx-auto mt-4 w-11/12"
                        htmlFor="programa"
                    >
                        Programa.
                    </label>
                    <AnimatePresence>
                        {formik.errors.programa && formik.touched.programa ? (
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="unshow"
                                variants={errorVariants}
                                className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                            >
                                {formik.errors.programa}
                            </motion.p>
                        ) : null}
                    </AnimatePresence>
                    <select
                        id="programa"
                        className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4"
                        name="programa"
                        onChange={formik.handleChange}
                        value={formik.values.programa}
                    >
                        <option value="" selected>
                            -Seleccione una opción-
                        </option>
                        <option value="111111">
                            Administración de empresas.
                        </option>
                        <option value="222222">
                            Programación de software.
                        </option>
                        <option value="333333">Cocina.</option>
                        <option value="444444">Turismo y hostelería.</option>
                    </select>

                    <button
                        className={
                            formik.isValid &&
                            formik.values.numero !== '' &&
                            formik.values.programa !== ''
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

export default WithAuth({ rol: [1] })(CrearFicha);
