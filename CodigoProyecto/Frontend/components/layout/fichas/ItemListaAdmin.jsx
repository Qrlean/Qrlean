import React from 'react';
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { desasociarUsuario } from '../../../actions/adminActions';
import DesasoaciarUserIcon from '../../../svg/desasociaruser.svg';

const ItemListaAdmin = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleDesasociar = () => {
        dispatch(
            desasociarUsuario({
                id_ficha: router.query.id_ficha,
                id_usuario: data.usuario.id_usuario,
            }),
        );
    };
    return (
        <div className="w-11/12 bg-gray-100 shadow-lg h-16 py-8 my-2 rounded-lg flex flex-row justify-center items-center border-t-2 border-orange-500">
            <Avatar
                color="#FF914D"
                size="50"
                round={10}
                name={`${data.usuario.nombres_usuario} 
                    ${data.usuario.apellidos_usuario}`}
                className="mx-2"
            />
            <div className="flex flex-col justify-center items-center flex-1">
                <h1 className="text-center text-gray-800 mx-auto flex-1 text-base">
                    {data.usuario.nombres_usuario}{' '}
                    {data.usuario.apellidos_usuario}
                </h1>
                <p className="text-center text-gray-600 text-sm mx-auto">
                    {data.usuario.id_tipo_rol === 2 ? 'Instructor' : 'Aprendiz'}
                </p>
            </div>
            <DesasoaciarUserIcon
                className="h-8 w-8 mx-1 mr-2 fill-current text-gray-800 cursor-pointer"
                onClick={handleDesasociar}
            />
        </div>
    );
};

export default ItemListaAdmin;
