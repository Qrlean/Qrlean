import React from 'react'
import Plx from "react-plx";
import {motion} from 'framer-motion'
const Features = ({children,...rest}) => {
    return (
        <Plx {...rest} className="relative w-full lg:w-1/4 m-12 " >
            <div className="absolute bg-white rounded-lg  h-80 flex flex-col items-center p-6 w-full" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -21px",zIndex:999}}>
                {children}
            </div>
            <motion.div initial={{rotate:-8}} className="shadow-lg absolute h-80 bg-orange-500 w-full rounded-lg"></motion.div>
            <motion.div initial={{rotate:5}} className="shadow-lg h-80 bg-darkorange-300 w-full rounded-lg"></motion.div>
        </Plx>
    );
}
 
export default Features;