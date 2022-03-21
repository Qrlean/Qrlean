import * as React from 'react';
import Header from '../components/layout/shared/Header';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../actions/appActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
    password: Yup.string(
        'El password debería solo contener caracteres alfanuméricos.',
    )
        .min(5, 'El password debería tener mínimo 5 caracteres.')
        .max(100, 'El password debería tener máximo 100 caracteres.')
        .required('El campo password es requerido.'),
});
const PasswordRestore = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (!router.query.token && router.isReady) {
            router.push('/login');
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: (values) => {
            dispatch(
                changePassword({
                    password: values.password,
                    token: router.query.token,
                }),
            );
        },
        validationSchema,
    });
    return (
        <div>
            <Header forceBackground={true} />
            <form
                className="mt-40 flex flex-col justify-center items-center w-80 mx-auto"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-xl text-gray-800 text-center">
                    Cambiar password.
                </h1>
                <AnimatePresence>
                    {formik.errors.password && formik.touched.password ? (
                        <motion.p
                            initial="initial"
                            animate="animate"
                            exit="unshow"
                            variants={errorVariants}
                            className="rounded-lg overflow-hidden text-center  text-red-600 text-base"
                        >
                            {formik.errors.password}
                        </motion.p>
                    ) : null}
                </AnimatePresence>
                <input
                    type="password"
                    placeholder="Ingrese una constraseña nueva"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="outline-none bg-gray-300 p-3  text-gray-800 my-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-orange-400 m-4  p-2 outline-none text-gray-800 text-xl  w-full rounded shadow-lg"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
export default PasswordRestore;
