import React,{useState} from 'react'

import {useRouter} from 'next/router'
import {motion} from 'framer-motion'

import Avatar from 'react-avatar';

const ItemOpen = ({data,closeItem}) => {
    const router = useRouter()
    return (
        <>
            <motion.div layoutId="item-expandible" className="bg-white border-orange-500 border-t-4 rounded-lg w-full lg:w-4/5 h-85 m-3 overflow-x-hidden max-w-full flex flex-col justify-center items-center" style={{boxShadow:"rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"}} >
                <div className='flex flex-row items-center h-full w-full  relative' >
                    <svg xmlns="http://www.w3.org/2000/svg" className="m-6 absolute left-0 top-0 h-10 w-10 fill-current text-gray-800 cursor-pointer" onClick={()=>closeItem()} viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                    <motion.div layoutId="contenido" className="flex flex-col justify-center items-center mx-2 sm:mx-16 h-full py-6 flex-1 w-full"  >
                        <motion.h1 layoutId="ficha" className="capitalize text-base md:text-2xl text-center font-semibold text-gray-800"> 
                            Ficha: {data.ficha}
                        </motion.h1>
                    </motion.div>
                    <motion.div className="flex flex-col justify-center items-end mx-2 sm:mx-16 h-full py-6 " initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-current h-8 w-8 sm:h-12 sm:w-12 my-8 text-gray-800 " viewBox="0 0 16 16" onClick={()=> router.push('/dashboard/instructor/fichas/1234/')}>
                            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </>
        
    );
}
 
export default ItemOpen;