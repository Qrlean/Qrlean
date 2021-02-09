import React,{useState,} from 'react';

import {useRouter} from 'next/router'

import Item from '../../../../../../components/layout/clases/Item'
import Modal from '../../../../../../components/utils/Modal'
import Dashboard from '../../../../../../components/utils/Dashboard'
import DashboardAdminHelp from '../../../../../../svg/dashboardAdminHelp.svg'

import Loader from 'react-loader-spinner'

import {motion } from 'framer-motion'


const infoVariants={
    hover:{
        rotate:-10,
        scale:1
    }
}

const Materia = () => {

    const clases = [
        {_id:1,nombre:'1.Introduccion',fecha:'2003-03-03',hora_inicio:'12:00 PM',hora_fin:'2:50 PM'},
        {_id:2,nombre:'2.Materiales',fecha:'2003-03-03',hora_inicio:'12:00 PM',hora_fin:'2:50 PM'},
        {_id:3,nombre:'3.Verbs',fecha:'2003-03-03',hora_inicio:'12:00 PM',hora_fin:'2:50 PM'},
    ];
    const error = false;
    const loader = false;
    const [item,setItem]=useState(null)
    const [help,setHelp] = useState(false)
    const router = useRouter();
    return (
            <Dashboard>
                <Modal state={help} setState={setHelp} titulo="Ayuda">
                    <DashboardAdminHelp className="transform rotate-90 sm:rotate-0"></DashboardAdminHelp>
                </Modal>
                <div className="h-2/12 relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> router.push('/dashboard/instructor/fichas/[ficha]',`/dashboard/instructor/fichas/${router.query.ficha}`)} className="xl:ml-28 ml-4 h-8/12  fill-current text-gray-800" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <div className="flex-1 h-6/12 flex flex-row justify-end xl:mx-28 mx-4 rounded">
                        <button onClick={()=> router.push('/dashboard/instructor/fichas/[ficha]/[materia]/crear-clase',`/dashboard/instructor/fichas/${router.query.ficha}/${router.query.materia}/crear-clase`)} className="outline-none bg-orange-300 rounded-lg text-xl text-gray-800 px-2 shadow-lg">Nueva clase.</button>

                    </div>
                </div>
                <div className="h-10/12 w-full overflow-x-hidden bg-gray-300 flex justify-center items-center flex-row flex-wrap relative">
                    {
                        loader ? 
                            <div className="flex flex-row justify-center items-center">
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
                            error ? 
                                <h1 className="text-red-500 text-3xl">{error}</h1>
                            :
                            <>
                                {/* <motion.svg  whileHover="hover" variants={infoVariants} viewBox="0 0 16 16" className="left-0 top-0 absolute w-10 h-10 fill-current text-gray-700 m-4" xmlns="http://www.w3.org/2000/svg" onClick={()=>setHelp(true)} style={{zIndex:99}}>
                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                                    <circle cx="8" cy="4.5" r="1"/>
                                </motion.svg> */}
                                <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">Clases de  {router.query.materia}</h1>

                                {clases.map((i)=>(<Item data={i} key={i._id} itemActivo={item} setItem={setItem}/>))}

                            </>
                    }

                </div>
            </Dashboard>
    );
}
 
export default Materia;