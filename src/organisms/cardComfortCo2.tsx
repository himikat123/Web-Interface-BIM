import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import Toggle from "../atoms/toggle";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";
import "./cardComfort.scss";

export default function CardComfortCo2() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular')
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validateCO2(data.wsensor.co2.data[i]) 
            ? ((data.wsensor.co2.data[i] + config.wsensor.co2.corr[i]).toFixed(2) + 'ppm') 
            : '--' 
        : i18n.t('dataExpired')})`);

    let co2 = -40400;
    if(config.comfort.co2.source === 1) { // CO2 from Wireless sensor
        co2 = data.wsensor.co2.data[config.comfort.co2.wsensNum] + config.wsensor.co2.corr[config.comfort.co2.wsensNum];
    }

    let comfort = i18n.t('cleanAir');
    if(vl.validateIaq(co2)) {
        if(co2 >= 800) comfort = i18n.t('polutedAir');
        if(co2 >= 1400) comfort = i18n.t('havilyPolutedAir');
    }
    else comfort = '--';

    return <Card header={<div dangerouslySetInnerHTML={{ __html: i18n.t('CO2Level') }} />}
        content={<>
            {/* Sensor type */}
            <SelectSwitch label={i18n.t('dataSource.singular')}
                options={sensors}
                value={config.comfort.co2.source}
                onChange={val => dispatch(cf.comfortCo2SourceChange(val))}
            />

            {config.comfort.co2.source > 0 && <div className="mt-8">
                <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                    options={wsensors}
                    value={config.comfort.co2.wsensNum}
                    onChange={val => dispatch(cf.comfortCo2WsensNumChange(val))}
                />
            </div>}
                
            {<div className={'card-comfort ' + (config.comfort.co2.source > 0 ? 'show' : 'hide')}>
                <div className="mt-6"><Indication error={false} value={comfort} /></div>

                <div className="mt-8">
                    <Toggle label={i18n.t('soundNotification')}
                        checked={config.comfort.co2.sound}
                        onChange={() => dispatch(cf.comfortCo2SoundChange(config.comfort.co2.sound ? 0 : 1))}
                    />
                </div>

                <table className="table-auto w-full mt-8">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-600">
                            <th><div dangerouslySetInnerHTML={{ __html: i18n.t('CO2Level') }} /></th>
                            <th>{i18n.t('airQuality')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-black">
                        <tr className="bg-green-200">
                            <td>&lt; 800</td>
                            <td>{i18n.t('cleanAir')}</td>
                        </tr>
                        <tr className="bg-yellow-200">
                            <td>800 - 1400</td>
                            <td>{i18n.t('polutedAir')}</td>
                        </tr>
                        <tr className="bg-red-300">
                            <td>&gt; 1400</td>
                            <td>{i18n.t('havilyPolutedAir')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </>} 
    />
}