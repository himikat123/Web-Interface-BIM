import hostUrl from "../atoms/hostUrl";
import { StopCircle } from "@phosphor-icons/react";

export default function ButtonStop() {
    const sendStop = () => {
        let url = `${hostUrl()}/esp/mp3stop?code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <div className="hover:scale-110 transition" 
        onClick={() => sendStop()}
    >
        {<StopCircle size={60} weight="fill" />}
    </div>
}