import React, { useState } from 'react';
import ItemIndex from './ItemIndex';

export function fetchFromObject(obj, prop) {
    if (typeof obj === 'undefined') return false;
    const _index = prop.indexOf('.');
    if (_index > -1) {
        return fetchFromObject(
            obj[prop.substring(0, _index)],
            prop.substr(_index + 1),
        );
    }
    return obj[prop];
}

const Item = ({
    list,
    openPropierties,
    closePropierties,
    openTitle,
    iconExpand = false,
    editIcon = true,
    trashIcon = true,
    routerDir,
    routerQuery,
    idProperty,
    modalText,
    modalTitle,
    onDelete,
}) => {
    const [item, setItem] = useState(null);
    return (
        <>
            {list.map((i) => (
                <ItemIndex
                    data={i}
                    key={i[idProperty]}
                    item={item}
                    setItem={setItem}
                    openPropierties={openPropierties}
                    closePropierties={closePropierties}
                    openTitle={openTitle}
                    iconExpand={iconExpand}
                    routerDir={routerDir}
                    routerQuery={routerQuery}
                    idProperty={idProperty}
                    modalText={modalText}
                    modalTitle={modalTitle}
                    editIcon={editIcon}
                    trashIcon={trashIcon}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
};

export default Item;
