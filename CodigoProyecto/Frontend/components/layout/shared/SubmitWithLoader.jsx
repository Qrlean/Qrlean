import * as React from 'react';
import Loader from 'react-loader-spinner';

const SubmitWithLoader = ({ title, loading, className, type, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {loading ? (
                <div className="flex flex-row justify-center items-center">
                    <Loader
                        type="Circles"
                        color="#FFFFFF"
                        height={24}
                        width={24}
                        className="mx-2"
                    />
                    Cargando...
                </div>
            ) : (
                title
            )}
        </button>
    );
};
export default SubmitWithLoader;
