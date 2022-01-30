import React from 'react';
import Dashboard from '../../../../../components/layout/shared/Dashboard';
import WithAuth from '../../../../../components/utils/WithAuth';
import WithGetOrRedirect from '../../../../../components/utils/WithGetOrRedirect';
import { getFichaById } from '../../../../../actions/adminActions';
import FichaDashboard from '../../../../../components/layout/fichaDashboard/FichaDashboard';

const Ficha = ({ data }) => {
    return (
        <Dashboard>
            <FichaDashboard
                data={data}
                isAdmin={true}
                pathToBack="/dashboard/admin/fichas"
            />
        </Dashboard>
    );
};

export default WithAuth({ rol: [1] })(
    WithGetOrRedirect(
        Ficha,
        getFichaById,
        (router) => router.push('/dashboard/admin/fichas'),
        (store) => store.admin.fichaById.state,
        (store) => store.admin.fichaById.data,
        'id_ficha',
    ),
);
