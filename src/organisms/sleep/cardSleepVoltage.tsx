import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import Indication from '../../atoms/indication';
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";
import { iData } from '../../redux/dataTypes';
import { batKChange } from "../../redux/slices/config";
import { validateBatteryADC } from '../../atoms/validateValues';
import * as bat from '../../atoms/indications/battery';

export default function CardSleepVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return <Card content={
        <RangeInput value={config.batK ?? 0}
            label={<div className="mt-4">
                {i18n.t('batteryVoltage')}:
                <Indication error={false} 
                    value={<>
                        {validateBatteryADC(data.adc ?? 0)
                            ? bat.batVoltageStr(data.adc ?? 0, config.batK ?? 0) + " (" 
                                + bat.batPercentStr(data.adc ?? 0, config.batK ?? 0) + ")"
                            : "--"
                        }
                    </>} 
                />
            </div>} 
            min={10}
            max={250}
            limitMin={10}
            limitMax={250}
            step={0.1}
            indication={config.batK?.toFixed(1) ?? ''}
            onChange={val => dispatch(batKChange(val))}
        />
    } />
}