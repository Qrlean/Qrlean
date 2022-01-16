import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../svg/1.svg';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { login } from '../actions/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import WithRedirect from '../components/utils/WithRedirect';

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
        .min(4, 'El documento debería tener mínimo 3 caracteres.')
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
    password: Yup.string(
        'El password debería solo contener caracteres alfanuméricos.',
    )
        .min(5, 'El password debería tener mínimo 5 caracteres.')
        .max(100, 'El password debería tener máximo 100 caracteres.')
        .required('El campo password es requerido.'),
});

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const loginIsLoading = useSelector((store) => store.app.auth.loginLoading);

    const formik = useFormik({
        initialValues: {
            numero_documento: '',
            id_tipo_documento: '',
            password: '',
        },
        onSubmit: (values) => {
            dispatch(login(values));
        },
        validationSchema,
    });

    return (
        <div
            className="w-full h-screen "
            style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2017/03/27/13/03/book-2178586_960_720.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-full h-full bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center">
                <form
                    onSubmit={formik.handleSubmit}
                    className="w-11/12 lg:w-1/3 xl:w-1/3 bg-white rounded-lg "
                    style={{ height: '95%' }}
                >
                    <div className="flex flex-col justify-center w-10/12 mx-auto h-full overflow-y-scroll md:overflow-y-hidden ">
                        <>
                            <Link href="/">
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="black"
                                    className="cursor-pointer h-12 w-12 lg:absolute lg:z-50 lg:left-0 lg:m-8  lg:top-0"
                                >
                                    <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                                </svg>
                            </Link>
                            <div className="flex flex-row justify-center items-center my-5">
                                <Logo className="mx-3 w-105 h-20 " />
                            </div>
                            {/* Campo numero_documento */}
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
                                className="outline-none bg-gray-300 p-3  text-gray-800 my-2 "
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
                                className="text-center outline-none bg-gray-300 p-2  text-gray-800 my-2 "
                            >
                                <option value="" selected>
                                    Tipo de documento.
                                </option>
                                <option value="1">
                                    CC Cedula de ciudadanía.
                                </option>
                                <option value="2">
                                    TI Tarjeta de identidad.
                                </option>
                                <option value="3">
                                    CE Cedula de extranjería.
                                </option>
                                <option value="4">PA Pasaporte.</option>
                            </select>
                            {/* Campo password */}
                            <AnimatePresence>
                                {formik.errors.password &&
                                formik.touched.password ? (
                                    <motion.p
                                        initial="initial"
                                        animate="animate"
                                        exit="unshow"
                                        variants={errorVariants}
                                        className="rounded-lg overflow-hidden text-center text-red-600 text-base"
                                    >
                                        {formik.errors.password}
                                    </motion.p>
                                ) : null}
                            </AnimatePresence>
                            <input
                                type="password"
                                placeholder="Ingrese una contraseña"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="outline-none bg-gray-300 p-3  text-gray-800 my-2 "
                            />
                            <button
                                type={formik.isValid && 'submit'}
                                className={
                                    formik.isValid &&
                                    formik.values.numero_documento !== '' &&
                                    formik.values.id_tipo_documento !== '' &&
                                    formik.values.password !== ''
                                        ? 'bg-orange-500 outline-none p-3 text-white text-base font-extrabold my-2 flex flex-row justify-center items-center'
                                        : 'bg-gray-600 outline-none p-3 text-white text-base font-extrabold my-2 cursor-not-allowed'
                                }
                            >
                                {loginIsLoading ? (
                                    <>
                                        Cargando
                                        <div className="flex flex-col justify-center items-center my-auto mx-2">
                                            <Loader
                                                type="Circles"
                                                color="#FFFFFF"
                                                height={15}
                                                width={15}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    'Ingresar'
                                )}
                            </button>
                            <p
                                className="text-gray-800 text-base text-right "
                                onClick={() => router.push('/passwordrecover')}
                            >
                                ¿Olvidaste tu contraseña?
                            </p>
                        </>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithRedirect(Login);
