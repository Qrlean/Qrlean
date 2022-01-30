import * as React from 'react';

import ArrowBack from '../../../svg/arrowback.svg';
import AddPerson from '../../../svg/addperson.svg';
import GestionClasesIcon from '../../../svg/gestionclases.svg';

import { ResponsiveBar } from '@nivo/bar';
import ItemMaterias from '../fichas/ItemMaterias';
import ItemListaAdmin from '../fichas/ItemListaAdmin';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ItemLista from '../fichas/ItemLista';

const FichaDashboard = ({ data, isAdmin = false, pathToBack }) => {
    const router = useRouter();
    const idUser = useSelector((store) => store.app.auth.user.id_usuario);
    const asignaturaInstructor = data.asignaturas.find(
        (x) => x.instructor.id_usuario === idUser,
    );
    const dataAsistencias = [
        {
            id: 'Asistió con retardo',
            label: 'Asistió con retardo',
            value: data.asistenciaConRetardo,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'Asistió',
            label: 'Asistió',
            value: data.asistencia,
            color: 'hsl(151, 70%, 50%)',
        },
        {
            id: 'No asistió',
            label: 'No asistió',
            value: data.inasistencia,
            color: 'hsl(312, 70%, 50%)',
        },
        {
            id: 'Por firmar',
            label: 'Por firmar',
            value: data.porFirmar,
            color: 'hsl(312, 70%, 50%)',
        },
        {
            id: 'Inasistencia con excusa',
            label: 'Inasistencia con excusa',
            value: data.inasistenciaConExcusa,
            color: 'hsl(312, 70%, 50%)',
        },
    ];
    return (
        <>
            <div className="grid grid-cols-4 h-full relative overflow-y-auto">
                <ArrowBack
                    className="cursor-pointer top-0 left-0 absolute  w-10 h-10 fill-current text-gray-800 m-4"
                    style={{ zIndex: 999 }}
                    onClick={() => router.push(pathToBack)}
                />
                <div className="col-span-4 xl:col-span-3 w-full lg:w-auto h-auto flex flex-col flex-start items-center overflow-y-visible xl:overflow-y-auto relative">
                    {isAdmin === true ? (
                        <AddPerson
                            onClick={() =>
                                router.push(
                                    '/dashboard/admin/fichas/[id_ficha]/asociar',
                                    `/dashboard/admin/fichas/${router.query.id_ficha}/asociar`,
                                )
                            }
                            className="cursor-pointer fill-current text-gray-800 absolute right-0 top-0 m-4 h-10 w-10"
                        />
                    ) : (
                        <GestionClasesIcon
                            onClick={() =>
                                router.push(
                                    '/dashboard/instructor/fichas/[ficha]/[materia]',
                                    `/dashboard/instructor/fichas/${router.query.id_ficha}/${asignaturaInstructor.id_asociacion_asignatura_ficha}`,
                                )
                            }
                            className=" cursor-pointer fill-current text-gray-800 absolute right-0 top-0 m-4 h-10 w-10"
                        />
                    )}
                    <h1 className="flex-1 text-center mx-auto text-4xl text-gray-800 my-8  border-b-2 border-orange-500">
                        Ficha 2141041
                    </h1>
                    <h1
                        className="text-left mb-3 text-base text-gray-600"
                        style={{ width: '83.333334%' }}
                    >
                        Gráfica general.
                    </h1>
                    <div className="flex flex-row justify-center items-center w-11/12 md:w-full h-full flex-wrap">
                        <div
                            className="h-96  overflow-none rounded-lg shadow-lg md:mx-2 w-full md:w-11/12 "
                            style={{ border: '1px solid rgba(31, 41, 55,1)' }}
                        >
                            <ResponsiveBar
                                data={dataAsistencias}
                                margin={{
                                    top: 40,
                                    bottom: 40,
                                    left: 40,
                                    right: 40,
                                }}
                                padding={0.3}
                                valueScale={{ type: 'linear' }}
                                indexScale={{ type: 'band', round: true }}
                                colors={{ scheme: 'nivo' }}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                            />
                        </div>
                    </div>
                    <div className="my-12 w-full h-auto">
                        <h1 className="text-center text-3xl text-gray-800 mx-auto my-4">
                            Materias
                        </h1>
                        {data.asignaturas.map((x) => (
                            <ItemMaterias
                                key={x.id_asociacion_asignatura_ficha}
                                titulo={x.asignatura.nombre_asignatura}
                                width="w-11/12"
                                clases={x.clases}
                            />
                        ))}
                    </div>
                </div>

                <div className="xl:col-span-1 col-span-4 bg-gray-200 shadow-lg h-auto w-full flex flex-col items-center overflow-y-visible xl:overflow-y-auto">
                    <h1 className="text-gray-800 text-2xl my-4 text-center font-semibold">
                        Personas
                    </h1>
                    {data.usuarios.map((data) => {
                        if (isAdmin) {
                            return (
                                <ItemListaAdmin
                                    key={data.usuario.id_usuario}
                                    data={data}
                                />
                            );
                        } else {
                            return (
                                <ItemLista
                                    key={data.usuario.id_usuario}
                                    data={data}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
};
export default FichaDashboard;
