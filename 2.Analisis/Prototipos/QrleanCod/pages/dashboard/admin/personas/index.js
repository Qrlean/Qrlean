import React,{useState,} from 'react';

import {useRouter} from 'next/router'

import Item from '../../../../components/layout/personas/Item'
import Modal from '../../../../components/utils/Modal'
import Dashboard from '../../../../components/utils/Dashboard'
import DashboardAdminHelp from '../../../../svg/dashboardAdminHelp.svg'

import Loader from 'react-loader-spinner'

import {motion } from 'framer-motion'


const infoVariants={
    hover:{
        rotate:-10,
        scale:1
    }
}

const ManagerUsuarios = () => {

    const instructores = [
        {_id:1,nombre:'Graciela',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},
        {_id:2,nombre:'Camilo Garcia',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},
        {_id:3,nombre:'Camilo Garcia',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},
        {_id:4,nombre:'Camilo Garcia',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},
        {_id:5,nombre:'Camilo Garcia',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},
        {_id:6,nombre:'Camilo Garcia',documento:'12341234',tipo_documento:'CC',direccion:'crra 5 abis #48 r 08',email:'cgarcia369@misena.edu.co',telefono:'3193617146',rol:'Instructor'},

    ];
    const router = useRouter();


    const error = false;
    const loader = false;
    const [item,setItem]=useState(null)
    const [help,setHelp] = useState(false)
    return (
            <Dashboard>
                <Modal state={help} setState={setHelp} titulo="Ayuda">
                    <DashboardAdminHelp className="transform rotate-90 sm:rotate-0"></DashboardAdminHelp>
                </Modal>
                <div className="h-2/12 relative w-full bg-gray-300 shadow-lg flex flex-row justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>router.push('/dashboard/admin')} className="xl:ml-28 ml-4 h-8/12  fill-current text-gray-800" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-6  px-2 h-8/12 w-10 fill-current text-gray-800 bg-white rounded rounded-r-none" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg>
                    <input type="text" className="text-gray-800 text-xl rounded rounded-l-none p-2 outline-none h-8/12 mr-4 md:w-80 w-40" placeholder="Buscar"/>
                    <div className="flex-1 h-8/12 flex flex-row justify-end xl:mx-28 mx-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className=" px-3 h-full fill-current text-gray-800 " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"/>
                        </svg>
                        <button onClick={()=> router.push('/dashboard/admin/personas/crear')} className="outline-none bg-orange-300 rounded-lg text-xl text-gray-800 px-2 shadow-lg">Registrar nueva persona.</button>

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
                                <h1 className="w-full text-gray-800 text-3xl font-semibold lg:text-4xl text-center my-8">Usuarios</h1>

                                {instructores.map((i)=>(<Item data={i} key={i._id} itemActivo={item} setItem={setItem}/>))}

                            </>
                    }

                </div>
            </Dashboard>
    );
}
 
export default ManagerUsuarios;