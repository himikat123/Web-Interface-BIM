import React from "react"
import Button from "../atoms/button";
import { ReactComponent as CloseSVG } from '../atoms/icons/close.svg';
import { iModal } from "../interfaces";

const Modal = (props: iModal) => {
    return <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-gray-500 bg-opacity-70 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark border-2 rounded border-menu_light dark:border-menu_dark">
            
            {/* header */}
            <div className="p-8 border-b border-gray-500 flex justify-between">
                <div>{props.header}</div>
                <div onClick={props.modalClose} className="p-1 bg-gray-500 hover:bg-gray-700 cursor-pointer border-2 rounded border-menu_light dark:border-menu_dark">
                    <CloseSVG />
                </div>
            </div>

            {/* body */}
            <div className="p-8 border-b border-gray-500">
                {props.content}
            </div>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row justify-center w-full p-8">
                <Button className="bg-red-600 hover:bg-red-700 text-text_dark"
                    label={props.labelConfirm}
                    onClick={() => {
                        props.modalClose();
                        props.confirmBtn();
                    }}
                />

                <Button className="bg-gray-500 hover:bg-gray-700 text-text_dark "
                    label={props.labelCancel}
                    onClick={() => props.modalClose()}
                />
            </div>
        </div>
    </div>
}

export default Modal;