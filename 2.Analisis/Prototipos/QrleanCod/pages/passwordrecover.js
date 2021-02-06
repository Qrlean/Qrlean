import React from 'react'
import Header from '../components/utils/Header'
const RecuperarContraseña = () => {
    return (
        <div className="bg-gray-100 h-full overflow-x-hidden min-h-screen">
            <Header forceBackground={true}></Header>
            <form className="mt-40 flex flex-col justify-center items-center" onSubmit={(e)=> e.preventDefault}>
                <label htmlFor="" className="text-xl text-gray-800 text-center">Correo electrónico de la cuenta.</label>
                <input type="text" className="outline-none p-2 text-center my-4 text-xl text-gray-800 ring-2 ring-orange-400 w-80 rounded shadow-lg"/>
                <button className="bg-orange-400 m-4  p-2 outline-none text-gray-800 text-xl  w-80 rounded shadow-lg">Enviar correo.</button>
            </form>
        </div>
    );
}
 
export default RecuperarContraseña;