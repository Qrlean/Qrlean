import React from 'react';
const Modal = ({ children, state, setState, titulo }) => {
    return (
        <>
            {state && (
                <>
                    <div
                        className="flex justify-center items-center h-screen w-screen bg-black opacity-75 fixed  inset-0"
                        onClick={() => setState(false)}
                        style={{ zIndex: 999999999 }}
                    ></div>
                    <div
                        className="flex justify-center items-center h-screen w-screen fixed inset-0 overflow-x-hidden"
                        style={{ zIndex: 999999999 }}
                    >
                        <div className="flex flex-col justify-center items-start bg-white w-full h-full xl:w-5/6 xl:h-5/6 xl:rounded-lg p-8">
                            <div className="flex flex-row justify-center items-center w-full overflow-hidden my-4">
                                <h1 className="uppercase text-2xl text-gray-800 font-semibold flex-1 text-center ">
                                    {titulo}
                                </h1>
                                <svg
                                    viewBox="0 0 16 16"
                                    className="fill-current text-gray-800 h-10 w-10 cursor-pointer"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setState(false)}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-row justify-center items-center mx-auto w-full overflow-hidden flex-1">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
