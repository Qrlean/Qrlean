import React from 'react';

const ItemAprendiz = ({ data, formik }) => {
    const handleChange = (e) => {
        formik.setValues({
            ...formik.values,
            asistencias: formik.values.asistencias.map((val) =>
                val.id_asistencia === data.id_asistencia
                    ? {
                          id_asistencia: data.id_asistencia,
                          id_tipo_asistencia: parseInt(e.target.value),
                          id_asociacion_usuario_ficha:
                              data.aprendiz.id_asociacion_usuario_ficha,
                      }
                    : val,
            ),
        });
    };
    return (
        <>
            <div
                className="h-20 flex flex-row justify-center items-center text-xl text-gray-800 border-gray-800 my-4 rounded shadow-lg"
                style={{ border: '1px solid' }}
            >
                <h1 className="flex-1 text-left ml-8">{`${data.aprendiz.usuario.nombres_usuario} ${data.aprendiz.usuario.apellidos_usuario}`}</h1>
                <select
                    onChange={handleChange}
                    id={data.id_asistencia}
                    className="mx-8 rounded outline-none text-center"
                    style={{ WebkitAppearance: 'none' }}
                    value={
                        formik.values.asistencias.find(
                            (i) => i.id_asistencia === data.id_asistencia,
                        ).id_tipo_asistencia
                    }
                >
                    <option value={1} className="text-center">
                        Por firmar
                    </option>
                    <option value={2} className="text-center">
                        Inasistencia
                    </option>
                    <option value={3} className="text-center">
                        Asistencia
                    </option>
                    <option value={4} className="text-center">
                        Asistencia con retardo
                    </option>
                    <option value={5} className="text-center">
                        Inasistencia con excusa
                    </option>
                </select>
            </div>
        </>
    );
};

export default ItemAprendiz;
