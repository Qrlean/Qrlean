import React,{useState} from 'react'

import {motion,AnimatePresence} from 'framer-motion'
import ItemClases from './ItemClases'
const divAnimate = {
    initial:{
        height:"0px",
        display:"none",
    },
    show:{
        height:"auto",
        borderBottomRightRadius:"8px",
        borderBottomLeftRadius:"8px",
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
const imageAnimate = {
    activate:{
        rotate:180
    },
    noactivate:{
        rotate:0
    }
}
const ItemMaterias = ({titulo,width,clases}) => {
    const [active,setActive] = useState(false)
    return (
        <motion.div className={`${width} mx-auto my-3 `}>
            <div className="cursor-pointer h-16 flex flex-row relative justify-center items-center w-full bg-orange-300 shadow border-orange-600 border-t-2 rounded text-gray-800 p-2 text-xl" onClick={()=> setActive(!active)}>
                {titulo}
                <motion.svg style={{originX: "50%", originY: "50%"}} animate={`${active ? "activate":"noactivate"}`} variants={imageAnimate} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 absolute right-0 mx-2 fill-current text-gray-800" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                </motion.svg>
            </div>
            
            <AnimatePresence>
                {
                    active && 
                    <motion.div initial="initial" animate="show" exit="unshow" variants={divAnimate} className="flex flex-col justify-center items-center overflow-hidden w-full">
                        <div className="flex flex-col justify-center items-center m-4 w-full">
                        {clases.map((value)=>
                            <ItemClases clase={value} width="w-11/12"></ItemClases>
                        )}
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            

        </motion.div>
    );
}
 
export default ItemMaterias;
