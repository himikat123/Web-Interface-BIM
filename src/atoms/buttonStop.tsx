import React from 'react';
import hostUrl from "../atoms/hostUrl";
import { ReactComponent as StopSVG } from '../atoms/icons/stop.svg';

const ButtonStop = () => {
    const sendStop = () => {
        let url = `${hostUrl()}/esp/mp3stop`;
        fetch(url);
    }

    return <div className="ms-2 hover:scale-110 transition" 
        onClick={() => sendStop()}
    >
        {<StopSVG />}
    </div>
}

export default ButtonStop;