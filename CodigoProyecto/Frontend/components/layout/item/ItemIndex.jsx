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
    idPropertie,
    modalText,
    modalTitle,
    editIcon,
    trashIcon,
}) => {
    const router = useRouter();

    const openItem = () => {
        setItem(data[idPropertie]);
        router.push(
            `${routerDir}/?${routerQuery}=[${routerQuery}]`,
            `${routerDir}/?${routerQuery}=${data[idPropertie]}`,
            { shallow: true },
        );
    };
    const closeItem = () => {
        if (item === data[idPropertie]) {
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
            {item === data[idPropertie] ? (
                <ItemOpen
                    data={data}
                    closeItem={closeItem}
                    openPropierties={openPropierties}
                    openTitle={openTitle}
                    iconExpand={iconExpand}
                    routerDir={routerDir}
                    idPropertie={idPropertie}
                    modalText={modalText}
                    modalTitle={modalTitle}
                    editIcon={editIcon}
                    trashIcon={trashIcon}
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
