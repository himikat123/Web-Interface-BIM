import React, { useState, useEffect } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import NumberInput from "../atoms/numberInput";
import ColorInput from "../atoms/colorInput";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iDisplayTimeSlot } from "../interfaces";
import { display1ValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

const CardDisplayTimeSlot = (props: iDisplayTimeSlot) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    useEffect(() => {
        dispatch(display1ValidChange(isValid));
    });

    const sendSlotColor = (val: string) => {
        let url = `${hostUrl()}/esp/color`;
        url += `?hex=${val.replace('#', '')}`;
        url += `&slot=${props.slot}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <>
        <Card header={i18n.t('timeSlot') + ' ' + String(props.slot)} 
            content={<>
                <NumberInput value={config.display.timeSlot.period[props.slot][props.num]}
                    min={0}
                    max={99}
                    label={i18n.t('displayDuration')}
                    onChange={val => dispatch(cf.DisplayTimeslotPeriodChange({slot: props.slot, num: props.num, val: val}))}
                    isValid={valid => setIsValid(valid)}
                />

                <div className="mt-8">
                    <ColorInput value={config.display.timeSlot.color[props.slot][props.num]}
                        label={i18n.t('displayColor')} 
                        onChange={val => {
                            dispatch(cf.DisplayTimeslotColorChange({slot: props.slot, num: props.num, val: val}));
                            sendSlotColor(val);
                        }}
                    />
                </div>
            </>}
        />
    </>
}

export default CardDisplayTimeSlot;