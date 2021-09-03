import React, { useState } from 'react';
import ItemIndex from './ItemIndex';

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
    idPropertie,
    modalText,
    modalTitle,
}) => {
    const [item, setItem] = useState(null);
    return (
        <>
            {list.map((i) => (
                <ItemIndex
                    data={i}
                    key={i._id}
                    item={item}
                    setItem={setItem}
                    openPropierties={openPropierties}
                    closePropierties={closePropierties}
                    openTitle={openTitle}
                    iconExpand={iconExpand}
                    routerDir={routerDir}
                    routerQuery={routerQuery}
                    idPropertie={idPropertie}
                    modalText={modalText}
                    modalTitle={modalTitle}
                    editIcon={editIcon}
                    trashIcon={trashIcon}
                />
            ))}
        </>
    );
};

export default Item;
