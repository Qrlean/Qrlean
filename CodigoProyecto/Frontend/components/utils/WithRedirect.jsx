import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from './Loader';

const WithRedirect = (WrappedComponent) => () => {
    const user = useSelector((store) => store.app.auth.user);
    const state = useSelector((store) => store.app.auth.state);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (state !== 'loading') {
            const handleRedirect = async (rol) => {
                console.log('redirect');
                switch (rol) {
                    case 1:
                        await router.push('/dashboard/admin');
                        break;
                    case 2:
                        await router.push('/dashboard/instructor/fichas');
                        break;
                    case 3:
                        await router.push('/dashboard/aprendiz');
                        break;
                }
                setLoading(false);
            };
            if (state === 'auth') {
                handleRedirect(user.id_tipo_rol);
            }
            if (state === 'unauth') {
                setLoading(false);
            }
        }
    }, [state, user]);
    if (loading) {
        return <Loader />;
    }
    return <WrappedComponent />;
};
export default WithRedirect;
