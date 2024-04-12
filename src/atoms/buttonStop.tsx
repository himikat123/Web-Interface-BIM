import hostUrl from "../atoms/hostUrl";
import { StopCircle } from "@phosphor-icons/react";

const ButtonStop = () => {
    const sendStop = () => {
        let url = `${hostUrl()}/esp/mp3stop`;
        fetch(url);
    }

    return <div className="hover:scale-110 transition" 
        onClick={() => sendStop()}
    >
        {<StopCircle size={60} weight="fill" />}
    </div>
}

export default ButtonStop;