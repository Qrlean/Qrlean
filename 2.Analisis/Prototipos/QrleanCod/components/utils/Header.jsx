import React,{useState} from 'react';

import { useScrollData } from "scroll-data-hook";
import {motion,AnimatePresence} from 'framer-motion'
import Link from 'next/link'

import HeaderList from './HeaderList'
import LogoBlack from '../../svg/2.svg'

import { useRouter } from 'next/router'

const wordList ={
    initial:{x:"100vw",opacity:0},
    show:{x:0,opacity:1,transition:{duration:1,delayChildren: 0.5,staggerChildren: 0.5,}}
}
const Header = ({forceBackground}) => {
    const router = useRouter()

    const [headerOptions,setHeaderOptions] = useState(false)

    const {
        position,
    } = useScrollData();
    return (
        <>
            <AnimatePresence>
                {headerOptions === true ? <HeaderList setHeaderOptions={setHeaderOptions}></HeaderList>:null}
            </AnimatePresence>
            <motion.div animate={{backgroundColor: position.y > 10 || forceBackground? 'rgba(31, 41, 55, 0.85)':'rgba(31, 41, 55, 0)'}} className="flex flex-row justify-center items-center px-8 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-8 fixed w-screen inset-x-0 top-0" style={{zIndex:999999}}>
                {/* LOGOTIPO */}
                <LogoBlack className="w-64 h-18 cursor-pointer" onClick={()=>router.push('/')}></LogoBlack>

                <svg viewBox="0 0 20 20" className={`w-10 h-10 mx-3 md:hidden lg:hidden xl:hidden fill-current text-white`} onClick={()=>setHeaderOptions(true)}>
                    <path d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298"></path>
                </svg>
                {/* NAVEGACION */}
                <motion.div className="flex-row justify-end items-center flex-1 mx-8 hidden md:flex lg:flex xl:flex " initial="initial" animate="show" variants={wordList}>
                    <Link href="/"><h3 className={`text-white text-xl font-semibold mx-5 cursor-pointer`}>Inicio</h3></Link>
                    <Link href="/login"><h3 className={`text-white text-xl font-semibold mx-5 cursor-pointer`}>Login</h3></Link>
                </motion.div>
            </motion.div>
        </>
    );
}
 
export default Header;