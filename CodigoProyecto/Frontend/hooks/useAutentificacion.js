import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const useAutentificacion = () => {
    const usuario = useSelector((store) => store.app.usuario);
    const loaderToken = useSelector((store) => store.app.token.loading);
    const loaderLogin = useSelector((store) => store.app.login.loading);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleRedirection = (rol) => {
            switch (usuario.usuario.rol.id_tipo_rol) {
                case 1:
                    router.push('/dashboard/admin');
                    if (router.pathname === '/dashboard/admin') {
                        setLoading(false);
                    }
                    break;
                case 2:
                    router.push('/dashboard/instructor/fichas');
                    if (router.pathname === '/dashboard/instructor/fichas') {
                        setLoading(false);
                    }
                    break;
                case 3:
                    router.push('/dashboard/aprendiz');
                    if (router.pathname === '/dashboard/aprendiz') {
                        setLoading(false);
                    }
                    break;
                default:
                    break;
            }
        };
        // console.log(usuario, loaderToken, router.pathname, loaderLogin);
        if (loaderToken === false && loaderLogin === false) {
            // console.log('Entre if token');

            const adminRegex = /dashboard\/admin/;
            const instructorRegex = /dashboard\/instructor/;
            const aprendizRegex = /dashboard\/aprendiz/;
            const dashboardRegex = /dashboard/;
            const ruta = router.pathname;
            // console.log('regex adminRegex', adminRegex.test(ruta));
            // console.log('regex instructorRegex', instructorRegex.test(ruta));
            // console.log('regex aprendizRegex', aprendizRegex.test(ruta));
            // console.log('regex dashboardRegex', dashboardRegex.test(ruta));
            if (usuario.isUsuario) {
                // console.log('Entre if usuario');
                if (
                    (adminRegex.test(ruta) &&
                        usuario.usuario.rol.id_tipo_rol !== 1) ||
                    (instructorRegex.test(ruta) &&
                        usuario.usuario.rol.id_tipo_rol !== 2) ||
                    (aprendizRegex.test(ruta) &&
                        usuario.usuario.rol.id_tipo_rol !== 3)
                ) {
                    // console.log('Entre 2 if usuario');
                    console.log('redireccionando');
                    handleRedirection(usuario.usuario.id_tipo_rol);
                } else if (ruta === '/login' || ruta === '/passwordrecover') {
                    console.log('redireccionando 2');
                    handleRedirection(usuario.usuario.id_tipo_rol);
                } else {
                    setLoading(false);
                }
            } else if (dashboardRegex.test(ruta)) {
                console.log('redireccionando');
                // console.log('Entre if else');
                router.push('/login');
                if (router.pathname === '/login') {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
    }, [usuario, loaderToken, router, loaderLogin]);
    return loading;
};

export default useAutentificacion;
