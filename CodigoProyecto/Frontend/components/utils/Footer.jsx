import React, { useState } from 'react';
import LogoWhite from '../../svg/2.svg';
import Link from 'next/link';
import Modal from './Modal';
import Tyc from '../layout/index/Tyc';
const Footer = () => {
    const [modal, setModal] = useState(false);
    return (
        <>
            <Modal
                titulo="Términos y condiciones"
                state={modal}
                setState={setModal}
            >
                <div className="w-full h-full overflow-x-hidden overflow-y-scroll text-gray-800">
                    <Tyc />
                </div>
            </Modal>
            <div className="h-auto xl:h-85 bg-gray-900 text-gray-200 mt-16 flex flex-col items-center flex-wrap">
                <div className="flex-1 flex flex-row w-full justify-center flex-wrap">
                    <div className="flex flex-col w-full xl:w-1/4 p-2 xl:p-8 justify-center items-center xl:items-start">
                        <LogoWhite className="w-64 h-18 my-4" />
                        <div className="flex flex-row justify-center xl:justify-start items-center m-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="fill-current text-white h-10 w-10"
                            >
                                <path d="M21.593,7.203c-0.23-0.858-0.905-1.535-1.762-1.766C18.265,5.007,12,5,12,5S5.736,4.993,4.169,5.404 c-0.84,0.229-1.534,0.921-1.766,1.778c-0.413,1.566-0.417,4.814-0.417,4.814s-0.004,3.264,0.406,4.814 c0.23,0.857,0.905,1.534,1.763,1.765c1.582,0.43,7.83,0.437,7.83,0.437s6.265,0.007,7.831-0.403c0.856-0.23,1.534-0.906,1.767-1.763 C21.997,15.281,22,12.034,22,12.034S22.02,8.769,21.593,7.203z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z"></path>
                            </svg>
                            <a
                                href="https://youtube.com/?lang=es"
                                target="_blank"
                                className="h-auto text-xl mx-4"
                                rel="noreferrer"
                            >
                                Youtube
                            </a>
                        </div>
                        <div className="flex flex-row justify-center xl:justify-start items-center m-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="fill-current text-white h-10 w-10"
                            >
                                <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"></path>
                            </svg>
                            <a
                                href="https://twitter.com/?lang=es"
                                target="_blank"
                                className="text-xl mx-4"
                                rel="noreferrer"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                    <div className="hidden xl:block h-10/12 my-auto w-px bg-white"></div>
                    <div className="flex flex-col w-1/2 xl:w-1/5 p-4 xl:p-8 justify-center items-end text-right">
                        <h1 className="text-right text-xl my-6">Accesos</h1>
                        <ul className="border-t-2 border-white w-2/3 pt-8 flex-1">
                            <li>
                                <Link href="/">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/login">Iniciar sesión</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="xl:flex flex-col hidden xl:w-1/5 p-8 justify-center items-end text-right">
                        <h1 className="text-right text-xl my-6">
                            Reconocimientos
                        </h1>
                        <ul className="border-t-2 border-white w-2/3 pt-8 flex-1">
                            <li>
                                {' '}
                                <a
                                    href="https://www.freepik.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Freepik
                                </a>{' '}
                            </li>
                            <li>
                                {' '}
                                <a
                                    href="https://undraw.co/illustrations"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Undraw
                                </a>{' '}
                            </li>
                            <li>
                                {' '}
                                <a
                                    href="https://www.framer.com/motion/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Framer motion
                                </a>{' '}
                            </li>
                            <li>
                                {' '}
                                <a
                                    href="https://github.com/Stanko/react-plx"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    React-Plx
                                </a>{' '}
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-1/2 xl:w-1/5 p-4 xl:p-8 justify-center items-end text-right">
                        <h1 className="text-right text-xl my-6">
                            Términos y Condiciones
                        </h1>
                        <ul className="border-t-2 border-white w-2/3 pt-8 flex-1">
                            <li
                                className="cursor-pointer"
                                onClick={() => setModal(true)}
                            >
                                Leer términos y condiciones
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 className="text-sm mt-8">
                    QrLean - admin-qrlean@gmail.com
                </h3>
                <h3 className="text-sm mb-4">Copyright © 2020 QrLean.</h3>
            </div>
        </>
    );
};

export default Footer;
