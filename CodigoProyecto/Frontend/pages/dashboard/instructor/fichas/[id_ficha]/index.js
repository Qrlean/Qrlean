import React from 'react';

import Dashboard from '../../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../../components/utils/WithAuth';
import WithGetOrRedirect from '../../../../../components/utils/WithGetOrRedirect';
import { getFichaById } from '../../../../../actions/teacherActions';
import FichaDashboard from '../../../../../components/layout/fichaDashboard/FichaDashboard';

const Ficha = ({ data }) => {
    return (
        <Dashboard>
            <FichaDashboard
                pathToBack="/dashboard/instructor/fichas"
                data={data}
            />
        </Dashboard>
    );
};

export default WithAuth({ rol: [2] })(
    WithGetOrRedirect(
        Ficha,
        getFichaById,
        (router) => router.push(`/dashboard/instructor/fichas/`),
        (store) => store.teacher.fichaById.state,
        (store) => store.teacher.fichaById.data,
        'id_ficha',
    ),
);
