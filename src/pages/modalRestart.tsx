import Modal from "../templates/modal";
import i18n from "../i18n/main";
import hostUrl from "../atoms/hostUrl";
import { iModalRestart } from "../interfaces";

export default function ModalRestart(props: iModalRestart) {
    const handleRestart = () => {
        fetch(`${hostUrl()}/esp/restart`);
    }

    return <Modal header={i18n.t('confirmation')}
        confirmBtn={() => handleRestart()}
        modalClose={() => props.modalClose()}
        content={i18n.t('restartConfirmation')}
        labelConfirm={i18n.t('restart')}
        labelCancel={i18n.t('cancel')}
    />
}