import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const WithEdit = (
    WrappedComponent,
    fnDispatch,
    path,
    fnSelectorState,
    fnSelectorData,
) => () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const state = useSelector(fnSelectorState);
    const data = useSelector(fnSelectorData);
    useEffect(() => {
        dispatch(fnDispatch(router.query.id));
    }, []);
    useEffect(() => {
        if (state === 'error') {
            router.push(path);
        }
    }, [state]);
    if (state !== 'success') {
        return null;
    }
    return (
        <>
            <WrappedComponent data={data} />
        </>
    );
};
export default WithEdit;
