import React from 'react';
import {motion} from 'framer-motion'
import Link from 'next/link'

const variants = {
    initial:{opacity:0,clipPath:"circle(0.3% at 0 100%)"},
    show:{opacity:1,clipPath:"circle(141.2% at 0 100%)",transition:{duration:1.5,}},
    exit:{opacity:0,clipPath:"circle(0.3% at 0 100%)",transition:{duration:1.5}}
}
const itemVariants ={
    initial:{x:"100vw",opacity:0},
    show:{x:"0",opacity:1, transition:{duration:1.2}},
}
const divVariants ={
    initial:{opacity:0},
    show:{opacity:1,transition:{when:"beforeChildren", staggerChildren:0.5}}
}

const HeaderList = ({setHeaderOptions}) => {
    return (
        <motion.div initial="initial" animate="show" exit="exit" variants={variants} className="flex flex-col justify-center items-center fixed w-full h-screen bg-gray-800 z-50 overflow-x-hidden">
            <svg viewBox="0 0 20 20" className="h-16 w-16" fill="white" onClick={()=>setHeaderOptions(false)}>
                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
            </svg>
            <motion.div initial="initial" animate="show" variants={divVariants} className="my-8">
                <Link href="/"><motion.h3 variants={itemVariants} className="text-white text-3xl font-semibold mx-5 cursor-pointer">Inicio</motion.h3></Link>
                <Link href="/login"><motion.h3 variants={itemVariants} className="text-white text-3xl font-semibold mx-5 cursor-pointer">Login</motion.h3></Link>
            </motion.div>
        </motion.div>
    );
}
 
export default HeaderList;