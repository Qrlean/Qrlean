import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const WithAuth = (props) => (WrappedComponent) => () => {
    const user = useSelector((store) => store.app.auth.user);
    const state = useSelector((store) => store.app.auth.state);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handleRedirect = async (rol) => {
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
        if (state !== 'loading') {
            if (state === 'unauth') {
                router.push('/login');
            } else if (
                (state === 'auth' &&
                    props.rol &&
                    props.rol.find((x) => x === user.id_tipo_rol)) ||
                (state === 'auth' && !props.rol)
            ) {
                setLoading(false);
            } else {
                handleRedirect(user.id_tipo_rol);
            }
        }
    }, [state, user]);
    if (loading) {
        return null;
    }
    return <WrappedComponent></WrappedComponent>;
};
export default WithAuth;
