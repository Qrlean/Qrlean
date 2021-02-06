import React from 'react';

import Loader from 'react-loader-spinner'

import * as Yup from 'yup';
import { useFormik } from 'formik';

import {motion,AnimatePresence} from 'framer-motion'

import {useRouter} from 'next/router'



const errorVariants = {
    initial:{
        height:"0px",
        display:"none",
    },
    animate:{
        height:"auto",
        transition:{
            duration:0.5
        }
    },
    unshow:{
        height:"0px",
        transition:{
            duration:0.5
        }
    }
}
const infoVariants={
    hover:{
        rotate:-10,
        scale:1
    }
}
const validationSchema = Yup.object().shape({
    instructor_id: Yup.string()
        .matches(/^\d+$/, "El id del instructor debería solo contener caracteres numéricos.")
        .min(1, 'El id del instructor debería tener mínimo 1 caracteres.')
        .max(20, 'El id del instructor debería tener máximo 20 caracteres.')
        .required('(Selecciona un instructor).'),
    materia_id: Yup.string()
        .matches(/^\d+$/, "El id de la materia debería solo contener caracteres numéricos.")
        .min(1, 'El id de la materia debería tener mínimo 1 caracteres.')
        .max(20, 'El id de la materia debería tener máximo 20 caracteres.')
        .required('(Selecciona una materia).'),
});
const AsociarInstructor = (props) => {
    const router = useRouter()
    const loader = false;
    const formik = useFormik({
        initialValues:{
            instructor_id:'',
            materia_id:'',
            rol:''
        },
        onSubmit: values =>{
            console.log(values)
        },
        validationSchema
    })
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center w-full lg:w-2/6 mx-auto rounded relative shadow-xl bg-white border-t-4 border-orange-600" autocomplete="off">
            <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="cursor-pointer shadow-xl bg-orange-300 rounded top-0 right-0 absolute  w-10 h-10 fill-current text-gray-800 m-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                <circle cx="8" cy="4.5" r="1"/>
            </motion.svg>
            <svg  viewBox="0 0 20 20" fill="black" className="cursor-pointer   top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"  onClick={()=>props.setAsociarRol(null)}>
                <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
            </svg>
            <h1 className="text-3xl text-gray-800 text-center w-full my-4 ">Asociar instructor.</h1>

            <label className="text-gray-800 text-xl mx-auto mt-4 w-11/12" htmlFor="instructor_id">Instructor.</label>
            <AnimatePresence>
                {formik.errors.instructor_id && formik.touched.instructor_id ? <motion.p  initial="initial" animate="animate" exit="unshow" variants={errorVariants} className="rounded-lg overflow-hidden text-center  text-red-600 text-base">{formik.errors.instructor_id}</motion.p>:null}
            </AnimatePresence>
            <select id="instructor_id" className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4" name="instructor_id" onChange={formik.handleChange} value={formik.values.instructor_id} >
                <option value="" selected>-Seleccione una opción-</option>
                <option value="12341234">Camilo García López</option>
                <option value="123412341">Camilo García López</option>
                <option value="123412341234">Camilo García López</option>
                <option value="1234123412">Camilo García López</option>
            </select>

            <label className="text-gray-800 text-xl mx-auto mt-4 w-11/12" htmlFor="materia_id">Materia.</label>
            <AnimatePresence>
                {formik.errors.materia_id && formik.touched.materia_id ? <motion.p  initial="initial" animate="animate" exit="unshow" variants={errorVariants} className="rounded-lg overflow-hidden text-center  text-red-600 text-base">{formik.errors.materia_id}</motion.p>:null}
            </AnimatePresence>
            <select id="materia_id" className="bg-white  text-gray-800 w-11/12 mx-auto outline-none p-1 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 mb-4" name="materia_id" onChange={formik.handleChange} value={formik.values.materia_id} >
                <option value="" selected>-Seleccione una opción-</option>
                <option value="12341234">Ingles</option>
                <option value="123412341">Español</option>
                <option value="123412341234">Biologia</option>
                <option value="1234123412">Programacion</option>
            </select>
            <button className={formik.isValid && formik.values.instructor_id !== '' && formik.values.materia_id !== '' ? "bg-red-500 rounded w-11/12 outline-none p-3 text-white text-base font-extrabold mx-auto my-6 ":"bg-red-300 rounded w-11/12 mx-auto outline-none p-3 text-white text-base font-extrabold my-6 cursor-not-allowed"} type={formik.isValid && "submit"} >
                {
                    loader ?
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
                    :'Crear'
                }
            </button>
        </form>
    );
}
 
export default AsociarInstructor;