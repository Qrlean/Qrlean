import React,{useState} from 'react'
import {motion} from 'framer-motion'


import Modal from '../../utils/Modal'
const ItemClose = ({data,openItem}) => {

    const [modal, setModal] = useState(false)
    return (
        <>
        <motion.div layoutId="item-expandible" className="bg-white rounded-lg p-1 w-full lg:w-2/5 h-40 m-3 cursor-pointer flex flex-col justify-center items-center" style={{boxShadow:"rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}} onClick={()=>openItem()}>
            <div className='flex flex-row items-center h-full w-full'>
                <motion.div layoutId="contenido" className="flex flex-col justify-center items-center mx-4 h-full py-6 flex-1">
                    <motion.h1 layoutId="titulo" className="capitalize text-sm font-semibold md:text-xl text-left text-gray-800"> 
                        Nombre: {data.nombre}
                    </motion.h1>
                    <motion.h2 layoutId="fecha" className="text-xs md:text-base text-center text-gray-800"> 
                        Fecha:{data.fecha}
                    </motion.h2>
                    <motion.h2 layoutId="hora_inicio" className="text-xs md:text-base text-center text-gray-800"> 
                        Hora de inicio:{data.hora_inicio}
                    </motion.h2>
                    <motion.h2 layoutId="hora_final" className="text-xs md:text-base text-center text-gray-800"> 
                        Hora de final:{data.hora_final}
                    </motion.h2>
                </motion.div>
            </div>
        </motion.div>
        </>
    );
}
 
export default ItemClose;