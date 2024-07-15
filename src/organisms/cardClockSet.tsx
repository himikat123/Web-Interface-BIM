import { useState } from "react";
import i18n from "../i18n/main";
import moment from "moment";
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import Indication from "../atoms/indication";
import Button from "../atoms/button";
import DateTimeInput from "../atoms/dateTimeInput";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

export default function CardClockSet() {
    const [send, setSend] = useState<string>('...');
    const [receive, setReceive] = useState<string>('...');
    const [manualDateTime, setManualDateTime] = useState<string>('');
    const [spinnerNTP, setSpinnerNTP] = useState<boolean>(false);
    const [spinnerPC, setSpinnerPC] = useState<boolean>(false);
    const [spinnerManual, setSpinnerManual] = useState<boolean>(false);

    /**
     * Clock sync with NTP server
     * send request
     */
    const clockSyncNTP = () => {
        let sync = 0;

        // show spinner and synchronizing message
        setSpinnerNTP(true);
        setSend(i18n.t('synchronizingNTP'));
        setReceive(''); 
        
        // send NTP sync command to the host
        fetch(`${hostUrl()}/esp/syncClock?ntp=1&code=${localStorage.getItem('code') || '0'}`);

        /*
        * checking the status of synchronization with NTP
        */
        const syncdialog = setInterval(() => {
            sync++;

            // if more than 10 attempts stop the synchronization process
            // and show error message
            if(sync > 10){
                setSpinnerNTP(false);
                setReceive(i18n.t('ntpSyncError')); 

                clearInterval(syncdialog);
            }

            // requesting synchronization status
            fetch(`${hostUrl()}/esp/syncdialog&code=${localStorage.getItem('code') || '0'}`)
            .then(response => response.text())
            .then(result => {
                if(result === '.') setSend(send + '.' );
                else {
                    setSpinnerNTP(false);
                    setReceive(i18n.t('synchronized') + ' ' + result); 

                    clearInterval(syncdialog);
                }
            });
        }, 1000);
    }

    /**
     * Clock sync with PC
     * sends request and data
     */
    const clockSyncPC = () => {
        // show spinner and current time
        setSpinnerPC(true);
        setSend(moment().format("HH:mm:ss DD.MM.YYYY")); 

        // send browser time to host 
        fetch(`${hostUrl()}/esp/syncClock?y=${moment().year()}&m=${moment().month()+1}&d=${moment().date()}&h=${moment().hours()}&i=${moment().minutes()}&s=${moment().seconds()}&code=${localStorage.getItem('code') || '0'}`)
        .then(response => response.text())
        .then(result => {
            setReceive(result); 
            setSpinnerPC(false); 
        });
    }

    /**
     * Clock set manual
     * sends request and data
     */
    const clockSyncManually = () => {
        // show spinner and desired time
        setSpinnerManual(true);
        setSend(moment(manualDateTime).format("HH:mm:ss DD.MM.YYYY"));

        // send desired time to host 
        fetch(`${hostUrl()}/esp/syncClock?y=${moment(manualDateTime).year()}&m=${moment(manualDateTime).month()+1}&d=${moment(manualDateTime).date()}&h=${moment(manualDateTime).hours()}&i=${moment(manualDateTime).minutes()}&s=${moment(manualDateTime).seconds()}&code=${localStorage.getItem('code') || '0'}`)
        .then(response => response.text())
        .then(result => {
            setReceive(result); 
            setSpinnerManual(false); 
        });
    }

    return <Card content={<>
        <div>⇒ <Indication error={false} value={send} /></div>
        <div>⇐ <Indication error={false} value={receive} /></div>
        <hr className="mt-4 border-menu_light dark:border-menu_dark" />

        <div className="text-center mt-4">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                label={<div className="flex justify-center">
                    {i18n.t('syncNtp')} 
                    {spinnerNTP && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => clockSyncNTP()}
            />
            <div className="mt-2">
                <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                    label={<div className="flex justify-center">
                        {i18n.t('syncPc')}
                        {spinnerPC && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                    </div>}
                    onClick={() => clockSyncPC()}
                />
            </div>
        </div>
        <hr className="mt-4 border-menu_light dark:border-menu_dark" />

        <div className="mt-8">
            <DateTimeInput label={i18n.t('setTimeManually')}
                value={manualDateTime}
                onChange={val => setManualDateTime(val)}
            />
        </div>
        <div className="text-center mt-4">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                label={<div className="flex justify-center">
                    {i18n.t('set')}
                    {spinnerManual && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => clockSyncManually()}
            />
        </div>
    </>} />
}