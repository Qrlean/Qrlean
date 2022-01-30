import React, { useRef } from 'react';

import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import Plx from 'react-plx';
import Features from '../components/layout/index/Features';

import Header from '../components/layout/shared/Header';
import Jumbotron from '../components/layout/index/Jumbotron';
import Footer from '../components/layout/shared/Footer';

import Facil from '../svg/undraw_building_websites_i78t.svg';
import Seguro from '../svg/undraw_Security_on_ff2u.svg';
import Intuitivo from '../svg/undraw_approve_qwp7.svg';
import Qr from '../svg/undraw_Organizing_projects_0p9a.svg';
import Flexible from '../svg/undraw_verified_re_4io7.svg';
import Plan from '../svg/undraw_quiz_nlyh.svg';
import Analytics from '../svg/undraw_meet_the_team_e5b7.svg';
import Review from '../svg/undraw_Online_page_re_lhgx.svg';
import Newsletter from '../svg/undraw_Newsletter_re_wrob.svg';
import DoubleChuloIcon from '../svg/doublechulo.svg';

const parallaxVideo = [
    {
        start: 'self',
        duration: 250,
        properties: [
            {
                startValue: 0,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];

const parallaxLayout = [
    {
        start: 'self',
        duration: 300,
        properties: [
            {
                startValue: 250,
                endValue: 0,
                property: 'translateX',
            },
        ],
    },
];

const parallaxDivVideo = [
    {
        start: 'self',
        duration: 500,
        properties: [
            {
                startValue: -150,
                endValue: 0,
                property: 'translateY',
            },
            {
                startValue: 0,
                endValue: 1,
                property: 'Scale',
            },
            {
                startValue: 1,
                endValue: 0,
                property: 'blur',
            },
        ],
    },
];

const parallaxItemLeft = [
    {
        start: 'self',
        duration: 450,
        startOffset: -150,
        properties: [
            {
                startValue: -350,
                endValue: 0,
                property: 'translateX',
            },
            {
                startValue: 0.6,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];
const parallaxItemCenter = [
    {
        start: 'self',
        startOffset: -150,
        duration: 550,
        properties: [
            {
                startValue: 250,
                endValue: 0,
                property: 'translateY',
            },
            {
                startValue: 0.6,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];
const parallaxItemRight = [
    {
        start: 'self',
        duration: 450,
        startOffset: -150,
        properties: [
            {
                startValue: 350,
                endValue: 0,
                property: 'translateX',
            },
            {
                startValue: 0.6,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];
const parallaxText = [
    {
        start: 'self',
        duration: 300,
        properties: [
            {
                startValue: 100,
                endValue: 0,
                property: 'translateY',
            },
            {
                startValue: 0.5,
                endValue: 1,
                property: 'scale',
            },
            {
                startValue: 0.8,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];
const IndexContent = () => {
    const divRef = useRef(null);
    return (
        <div className="bg-gray-100">
            {/* Header */}
            <Header />

            {/* VIEWPORT PAGE */}
            <motion.div
                className="jumbotron-image overflow-x-hidden"
                style={{ height: '100vh' }}
            >
                <motion.div
                    className="bg-black bg-opacity-90 overflow-x-hidden"
                    style={{ height: '100vh' }}
                >
                    <div className="h-screen flex flex-col justify-center">
                        {/* CONTENIDO DE PRESENTACION */}
                        {/* Jumbotron */}
                        <Jumbotron divRef={divRef} />

                        {/* CONTENIDO DE PRESENTACION */}
                    </div>
                </motion.div>
            </motion.div>
            <img
                src="https://i.imgur.com/eOt1Hxd.png"
                alt=""
                className="w-screen transform -translate-y-10"
            />
            {/* VIEWPORT PAGE */}

            {/* FEATURES */}

            <div className="flex flex-col items-center  w-full px-3 mb-8 overflow-hidden transform -translate-y-10">
                <Plx parallaxData={parallaxText} className="overflow-hidden">
                    <div>
                        <div className="flex flex-row items-center justify-center">
                            <div className="mx-4">
                                <DoubleChuloIcon className="fill-current text-red-700 w-10 h-10" />
                            </div>
                            <h1 className="text-gray-800 text-4xl text-center w-full font-semibold">
                                Características
                            </h1>
                        </div>

                        <div
                            className="bg-red-500 w-24 my-4 mx-auto"
                            style={{ minHeight: '2px', height: '2px' }}
                        />
                    </div>
                </Plx>

                <div className="flex flex-row justify-center items-center w-full flex-1 flex-wrap my-4">
                    <Features parallaxData={parallaxItemLeft}>
                        <Facil className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Fácil
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            Qrlean posee puntos de ayuda.
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemCenter}>
                        <Seguro className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Seguro
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            Se garantiza que su asistencia no podrá ser
                            cambiada.
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemRight}>
                        <Intuitivo className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Intuitivo
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            QrLean se diseño para que cualquier persona lo pueda
                            usar.
                        </p>
                    </Features>

                    <Features parallaxData={parallaxItemLeft}>
                        <Flexible className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Flexible
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            QrLean se puede usar desde cualquier dispositivo.
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemCenter}>
                        <Qr className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Método QR
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            ¡Puedes tomar tu asistencia con código QR!
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemRight}>
                        <Plan className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Método manual
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            Por si no tienes como tomar código Qr el profesor
                            podrá firmar asistencia por ti.
                        </p>
                    </Features>

                    <Features parallaxData={parallaxItemLeft}>
                        <Analytics className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Util
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            Ahora no solo el instructor podrá ver tu estado de
                            asistencia, tu también.
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemCenter}>
                        <Review className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Notificaciones
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            ¡QrLean te avisa cuando faltes a una clase!
                        </p>
                    </Features>
                    <Features parallaxData={parallaxItemRight}>
                        <Newsletter className="h-64 w-64 mx-4 my-8" />
                        <h1 className="text-2xl text-gray-800 font-extrabold">
                            Envía Solicitudes
                        </h1>
                        <p className="text-gray-700 text-base m-1 text-justify">
                            Puedes enviar solicitudes a los instructores si no
                            pudiste asistir.
                        </p>
                    </Features>
                </div>
            </div>

            {/* FEATURES */}

            {/* VIDEO */}

            <Plx
                parallaxData={parallaxVideo}
                className="overflow-hidden h-screen w-full mx-auto rounded-lg flex flex-col justify-evenly items-center"
            >
                <Plx
                    parallaxData={parallaxLayout}
                    className="bg-orange-500 w-1/3 self-end h-full"
                />
                <Plx
                    parallaxData={parallaxDivVideo}
                    className="h-11/12 w-11/12 mx-auto flex flex-col justify-center items-center absolute"
                >
                    <h1 className="text-5xl text-gray-800 text-center font-semibold">
                        Video
                    </h1>
                    <div
                        className="bg-red-500 w-24 mt-4 mb-8"
                        ref={divRef}
                        style={{ minHeight: '2px', height: '2px' }}
                    />
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=YO8DCG95Fp4&ab_channel=FernandoHerrera"
                        controls={false}
                        className="w-full h-9/12"
                    />
                </Plx>
            </Plx>

            {/* FOOTER */}

            <Footer />
        </div>
    );
};

export default IndexContent;
