import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const WithEdit = (
    WrappedComponent,
    fnDispatch,
    path,
    fnSelectorState,
    fnSelectorData,
    routerProperty,
) => () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const state = useSelector(fnSelectorState);
    const data = useSelector(fnSelectorData);
    const [hasBeenStarted, setHasBeenStarted] = useState(false);
    useEffect(() => {
        dispatch(fnDispatch(router.query[routerProperty]));
        setHasBeenStarted(true);
    }, []);
    useEffect(() => {
        if (hasBeenStarted && state === 'error') {
            router.push(path);
        }
    }, [state, hasBeenStarted]);
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
