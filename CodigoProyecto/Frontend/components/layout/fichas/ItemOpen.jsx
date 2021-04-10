import React,{useState} from 'react'

import {useRouter} from 'next/router'
import {motion} from 'framer-motion'


import Avatar from 'react-avatar';

import Modal from '../../utils/Modal'
const ItemOpen = ({data,closeItem}) => {
    const router = useRouter()
    const [modal, setModal] = useState(false)
    return (
        <>
            <Modal titulo="Eliminar programa" state={modal} setState={setModal}>
                <div className="flex flex-col text-justify w-full h-full">
                    <h2 className="text-center text-3xl text-red-500 font-semibold my-4">Advertencia.</h2>
                    <p className="text-red-400 text-base my-4">Si desactivas el curso automáticamente se desasociaran los usuarios de este , se desactivaran todas las fechas de asistencia que hayan sido creadas y ninguna persona podrá acceder a este.</p>
                    <h2 className="text-center text-2xl text-red-500 font-semibold my-4">¿Esta segur@ de seguir?</h2>
                    <div className="flex-1 flex flex-row justify-center items-center">
                        <button className="bg-orange-500 text-white text-1xl mx-4 p-4 rounded-lg outline-none" onClick={()=> setModal(false)}>No,cancelar operación.</button>
                        <button className="bg-orange-500 text-white text-1xl mx-4 p-4 rounded-lg outline-none" onClick={()=> setModal(false)}>Si,realizar operación.</button>
                    </div>
                </div>
            </Modal>
            <motion.div layoutId="item-expandible" className="bg-white rounded-lg w-full lg:w-4/5 h-85 m-3 overflow-x-hidden max-w-full flex flex-col justify-center items-center" style={{boxShadow:"rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}} >
                <div className='flex flex-row items-center h-full w-full  relative' >
                    <svg xmlns="http://www.w3.org/2000/svg" className="m-6 absolute left-0 top-0 h-10 w-10 fill-current text-gray-800 cursor-pointer" onClick={()=>closeItem()} viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                    <motion.div layoutId="contenido" className="flex flex-col justify-center items-start mx-2 sm:mx-16 h-full py-6 flex-1 w-full"  >
                        <motion.h1 className="text-base md:text-2xl text-center w-full font-semibold text-gray-800 my-6" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}> 
                            Información
                        </motion.h1>
                        <motion.h1 layoutId="titulo" className="capitalize text-sm font-semibold md:text-xl text-left text-gray-800"> 
                            Numero: {data.numero}
                        </motion.h1>
                        <motion.h2 layoutId="id" className="text-xs md:text-base text-left text-gray-800"> 
                            Programa: {data.programa}
                        </motion.h2>
                        <motion.h2 layoutId="cursos" className="text-xs md:text-base text-left text-gray-800"> 
                            Numero de personas asociadas: {data.personas.length}
                        </motion.h2>
                    </motion.div>
                    <motion.div className="flex flex-col justify-center items-end mx-2 sm:mx-16 h-full py-6 " initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
                        <svg onClick={()=> router.push('/dashboard/admin/fichas/editar/1234')} viewBox="0 0 16 16" className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 " xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <svg viewBox="0 0 16 16"  className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 " xmlns="http://www.w3.org/2000/svg" onClick={()=>setModal(true)}>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 " viewBox="0 0 16 16" onClick={()=> router.push('/dashboard/admin/fichas/1234/')}>
                            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </>
        
    );
}
 
export default ItemOpen;