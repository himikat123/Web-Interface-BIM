import { useSelector } from 'react-redux';
import Modal from "../templates/modal";
import i18n from "../i18n/main";
import { iData } from "../redux/dataTypes";
import { iModalNetList } from "../interfaces";

export default function ModalNetList(props: iModalNetList) {
    let ssids = Object.values(useSelector((state: iData) => state.data.ssids)).sort(function(a, b) {
        return a[1] - b[1];
    });

    const list = <div>
        {ssids.map(ssid => {
            return <div key={ssid[0]} 
                className="flex justify-between cursor-pointer"
                onClick={() => {
                    props.ssidSelect(ssid[0]);
                    props.modalClose();
                }}
            >
                <div className="overflow-hidden me-2">
                    {ssid[0]}
                </div>
                <div title={`-${ssid[1]}dB`}>
                    <svg viewBox="0 0 494.45 494.45" width="20px" className="icon-svg dark:icon-svg_dark">
                        {ssid[1] < 30 && <path d="M467.925,204.625c-6.8,0-13.5-2.6-18.7-7.8c-111.5-111.4-292.7-111.4-404.1,0c-10.3,10.3-27.1,10.3-37.4,0 s-10.3-27.1,0-37.4c64-64,149-99.2,239.5-99.2s175.5,35.2,239.5,99.2c10.3,10.3,10.3,27.1,0,37.4 C481.425,202.025,474.625,204.625,467.925,204.625z"/>}
                        {ssid[1] < 60 && <path d="M395.225,277.325c-6.8,0-13.5-2.6-18.7-7.8c-71.4-71.3-187.4-71.3-258.8,0c-10.3,10.3-27.1,10.3-37.4,0 s-10.3-27.1,0-37.4c92-92,241.6-92,333.6,0c10.3,10.3,10.3,27.1,0,37.4C408.725,274.725,401.925,277.325,395.225,277.325z"/>}
                        {ssid[1] < 90 && <path d="M323.625,348.825c-6.8,0-13.5-2.6-18.7-7.8c-15.4-15.4-36-23.9-57.8-23.9s-42.4,8.5-57.8,23.9	c-10.3,10.3-27.1,10.3-37.4,0c-10.3-10.3-10.3-27.1,0-37.4c25.4-25.4,59.2-39.4,95.2-39.4s69.8,14,95.2,39.5 c10.3,10.3,10.3,27.1,0,37.4C337.225,346.225,330.425,348.825,323.625,348.825z"/>}
                        <circle cx="247.125" cy="398.925" r="35.3"/>
                    </svg>
                </div>
            </div>
        })}
    </div>;

    return <Modal header={i18n.t('listOfAvailableNetworks')}
        confirmBtn={() => {}}
        modalClose={() => props.modalClose()}
        content={list}
        labelCancel={i18n.t('close')}
    />
}