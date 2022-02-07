import React from 'react';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Dashboard from '../../../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../../../components/utils/WithAuth';

import SubmitButton from '../../../../../../components/layout/shared/SubmitButton';
import CustomForm from '../../../../../../components/layout/shared/CustomForm';
import CustomInput from '../../../../../../components/layout/shared/CustomInput';
import CustomDateInput from '../../../../../../components/layout/shared/CustomDateInput';
import CustomSelect from '../../../../../../components/layout/shared/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
    createClase,
    getAsignaturaById,
    getFichaById,
} from '../../../../../../actions/teacherActions';
import WithGetOrRedirect from '../../../../../../components/utils/WithGetOrRedirect';

const validationSchema = Yup.object().shape({
    nombre_clase: Yup.string()
        .matches(
            /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/,
            'El nombre debería solo contener caracteres alfanumericos.',
        )
        .min(4, 'El nombre debería tener mínimo 4 caracteres.')
        .max(100, 'El nombre debería tener máximo 100 caracteres.')
        .required('El campo nombre es requerido.'),
    dia: Yup.string().required('El campo día es requerido.'),
    hora_inicio: Yup.string().required('El campo hora inicial es requerido.'),
    hora_final: Yup.string().required('El campo hora final es requerido.'),
});

const CrearClase = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isLoading = useSelector((store) => store.teacher.crearClase.loading);
    const formik = useFormik({
        initialValues: {
            nombre_clase: '',
            dia: '',
            hora_inicio: '',
            hora_final: '',
            qr_available: 1,
        },
        onSubmit: (values) => {
            dispatch(
                createClase({
                    ...values,
                    id_asociacion_asignatura_ficha: router.query.id_materia,
                }),
            );
        },
        validationSchema,
    });

    return (
        <Dashboard>
            <CustomForm
                pathToBack={`/dashboard/instructor/fichas/${router.query.id_ficha}/${router.query.id_materia}`}
                formik={formik}
                title="Crear clase"
            >
                <CustomInput
                    title="Nombre clase"
                    formik={formik}
                    keyName={'nombre_clase'}
                />
                <CustomDateInput title="Dia" formik={formik} keyName={'dia'}>
                    <DatePicker
                        value={formik.values.dia}
                        dateFormat="yyyy-mm-dd"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                dia: new Moment(e).format('yyyy-MM-DD'),
                            });
                        }}
                        minDate={Moment().toDate()}
                        name="dia"
                        id="dia"
                        withPortal
                        placeholderText="Selecciona una fecha."
                        className="text-gray-800 shadow-xl mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 w-full"
                    />
                </CustomDateInput>
                <CustomDateInput
                    title="Hora inicio"
                    formik={formik}
                    keyName={'hora_inicio'}
                >
                    <DatePicker
                        onChange={(e) =>
                            formik.setValues({
                                ...formik.values,
                                hora_inicio: new Moment(e).format('HH:mm'),
                            })
                        }
                        value={formik.values.hora_inicio}
                        name="hora_inicio"
                        id="hora_inicio"
                        minTime={
                            formik.values.dia === Moment().format('yyyy-MM-DD')
                                ? Date.now()
                                : null
                        }
                        maxTime={
                            formik.values.dia === Moment().format('yyyy-MM-DD')
                                ? setHours(setMinutes(new Date(), 59), 23)
                                : null
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="Time"
                        timeFormat="hh:mm aa"
                        withPortal
                        placeholderText="Selecciona una hora de inicio."
                        className="text-gray-800 shadow-xl mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 w-full"
                    />
                </CustomDateInput>
                <CustomDateInput
                    title="Hora Final"
                    formik={formik}
                    keyName={'hora_final'}
                >
                    <DatePicker
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                hora_final: new Moment(e).format('HH:mm'),
                            });
                        }}
                        value={formik.values.hora_final}
                        name="hora_final"
                        id="hora_final"
                        minTime={
                            formik.values.dia === Moment().format('yyyy-MM-DD')
                                ? Date.now()
                                : null
                        }
                        maxTime={
                            formik.values.dia === Moment().format('yyyy-MM-DD')
                                ? setHours(setMinutes(new Date(), 59), 23)
                                : null
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="Time"
                        timeFormat="hh:mm aa"
                        withPortal
                        placeholderText="Selecciona una hora de inicio."
                        className="text-gray-800 shadow-xl mx-auto outline-none p-2 text-base rounded-t focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent border-b-4 border-orange-500 w-full"
                    />
                </CustomDateInput>
                <CustomSelect
                    formik={formik}
                    keyName="qr_available"
                    title={'Permite asistencia por qr'}
                    wEmptyOption={false}
                    options={[
                        { name: 'Si permite', value: 1 },
                        { name: 'No permite', value: 0 },
                    ]}
                />
                <SubmitButton
                    validationSchema={validationSchema}
                    title={'Crear'}
                    formik={formik}
                    isLoading={isLoading}
                />
            </CustomForm>
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(
    WithGetOrRedirect(
        WithGetOrRedirect(
            CrearClase,
            getAsignaturaById,
            (router) =>
                router.push(
                    `/dashboard/instructor/fichas/${router.query.id_ficha}`,
                ),
            (store) => store.teacher.asignaturaById.state,
            (store) => store.teacher.asignaturaById.data,
            'id_materia',
        ),
        getFichaById,
        (router) => router.push(`/dashboard/instructor/fichas/`),
        (store) => store.teacher.fichaById.state,
        (store) => store.teacher.fichaById.data,
        'id_ficha',
    ),
);
