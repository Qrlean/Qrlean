import React, { useEffect } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import ItemOpen from './ItemOpen';
import ItemClose from './ItemClose';
import { useRouter } from 'next/router';

const ItemIndex = ({
    data,
    item,
    setItem,
    openPropierties,
    closePropierties,
    openTitle,
    iconExpand,
    routerDir,
    routerQuery,
    idProperty,
    modalText,
    modalTitle,
    editIcon,
    trashIcon,
    onDelete,
    fnSelectorLoading,
}) => {
    const router = useRouter();

    const openItem = () => {
        setItem(data[idProperty]);
        router.push(
            `${routerDir}/?${routerQuery}=[${routerQuery}]`,
            `${routerDir}/?${routerQuery}=${data[idProperty]}`,
            { shallow: true },
        );
    };
    const closeItem = () => {
        if (item === data[idProperty]) {
            setItem(null);
        }
        router.push(`${routerDir}/`, undefined, { shallow: true });
    };
    useEffect(() => {
        if (
            !isNaN(router.query[routerQuery]) &&
            item !== router.query[routerQuery]
        ) {
            setItem(parseInt(router.query[routerQuery]));
        }
    }, [router.query[routerQuery]]);

    return (
        <AnimateSharedLayout type="crossfade" className="relative">
            {item === data[idProperty] ? (
                <ItemOpen
                    data={data}
                    closeItem={closeItem}
                    openPropierties={openPropierties}
                    openTitle={openTitle}
                    iconExpand={iconExpand}
                    routerDir={routerDir}
                    idProperty={idProperty}
                    modalText={modalText}
                    modalTitle={modalTitle}
                    editIcon={editIcon}
                    trashIcon={trashIcon}
                    onDelete={onDelete}
                    fnSelectorLoading={fnSelectorLoading}
                />
            ) : (
                <ItemClose
                    data={data}
                    openItem={openItem}
                    closePropierties={closePropierties}
                />
            )}
        </AnimateSharedLayout>
    );
};

export default ItemIndex;
