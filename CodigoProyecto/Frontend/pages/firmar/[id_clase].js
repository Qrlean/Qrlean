import * as React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signAsistencia } from '../../actions/aprendizActions';
import { toast } from 'react-toastify';
import Header from '../../components/layout/shared/Header';

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
    return (
        <>
            <div className="bg-gray-100 h-full overflow-x-hidden min-h-screen relative">
                <Header forceBackground={true} />
                <h1
                    className="text-3xl text-gray-800 font-bold absolute"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    Cargando ....
                </h1>
            </div>
        </>
    );
};
export default FirmarClase;
