import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import ItemOpen from './ItemOpen';
import ItemClose from './ItemClose';

const Item = ({ data, itemActivo, setItem }) => {
    const openItem = () => {
        setItem(data._id);
    };
    const closeItem = () => {
        if (itemActivo === data._id) {
            setItem(null);
        }
    };
    return (
        <AnimateSharedLayout type="crossfade">
            {itemActivo === data._id ? (
                <ItemOpen data={data} closeItem={closeItem} />
            ) : (
                <ItemClose data={data} openItem={openItem} />
            )}
        </AnimateSharedLayout>
    );
};

export default Item;
