import * as React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signAsistencia } from '../../actions/aprendizActions';
import { toast } from 'react-toastify';

const FirmarClase = () => {
    const router = useRouter();
    const idClase = router.query.id_clase;
    const dispatch = useDispatch();
    const stateUserSign = useSelector((store) => store.app.auth.state);
    const stateSign = useSelector((store) => store.app.signAsistencia.state);
    useEffect(() => {
        if (stateUserSign === 'auth') dispatch(signAsistencia(idClase));
        if (stateUserSign === 'unauth') {
            toast.info('No se puede firmar asistencia sin haber ingresado');
            router.push('/login');
        }
    }, [stateUserSign]);
    useEffect(() => {
        if (stateSign !== 'loading') router.push('/login');
    }, []);
    return <></>;
};
export default FirmarClase;
