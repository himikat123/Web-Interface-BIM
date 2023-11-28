import React from "react"
import Modal from "../templates/modal";
import i18n from "../i18n/main";
import { iModalRestart } from "../interfaces";

const ModalRestart = (props: iModalRestart) => {
    const handleRestart = () => {
        fetch("./esp/restart");
    }

    return <Modal header={i18n.t('confirmation')}
        confirmBtn={() => handleRestart()}
        modalClose={() => props.modalClose()}
        content={i18n.t('restartConfirmation')}
        labelConfirm={i18n.t('restart')}
        labelCancel={i18n.t('cancel')}
    />
}

export default ModalRestart;