import React, { useEffect } from "react"
import Button from "../atoms/button";
import { ReactComponent as CloseSVG } from '../atoms/icons/close.svg';
import { iModal } from "../interfaces";

const Modal = (props: iModal) => {
    useEffect(() => {
        document.querySelector('body')?.classList.add('modal-open');
    }, []);

    return <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center">
        <div className="mx-4 w-full max-w-2xl h-fit mt-4 md:mt-10 bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark border-2 rounded border-menu_light dark:border-menu_dark">
            
            {/* header */}
            <div className="p-4 border-b border-gray-500 flex justify-between items-center">
                <div>{props.header}</div>
                <div onClick={props.modalClose} className="p-1 bg-gray-500 hover:bg-gray-700 cursor-pointer border-2 rounded border-menu_light dark:border-menu_dark text-text_dark">
                    <CloseSVG />
                </div>
            </div>

            {/* body */}
            <div className="p-4 border-b border-gray-500 overflow-auto" style={{maxHeight: 'calc(100vh - 216px)'}}>
                {props.content}
            </div>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row justify-center w-full p-4">
                {props.labelConfirm && <Button className="bg-red-600 hover:bg-red-700 text-text_dark"
                    label={props.labelConfirm}
                    onClick={() => {
                        props.modalClose();
                        props.confirmBtn();
                    }}
                />}

                <Button className="bg-gray-500 hover:bg-gray-700 text-text_dark"
                    label={props.labelCancel}
                    onClick={() => props.modalClose()}
                />
            </div>
        </div>
    </div>
}

export default Modal;