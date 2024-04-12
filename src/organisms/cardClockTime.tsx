import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardClockTime() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card content={<>
        <SelectSwitch label={i18n.t('clockFormat')}
            options={[
                i18n.t('format12'), 
                i18n.t('format24')
            ]}
            value={config.clock.format}
            onChange={val => dispatch(cf.clockFormatChange(val))}
        />

        <div className="mt-8">
            <SelectSwitch label={i18n.t('timezone')}
                options={[...Array(26)].map((x, i) => `GMT ${i > 12 ? '+' : ''}${i - 12}`)}
                value={config.clock.utc + 12}
                onChange={val => dispatch(cf.clockUtcChange(val - 12))}
            />
        </div>

        <div className="mt-8">
            <SelectSwitch label={i18n.t('daylightSavingTime')}
                options={[i18n.t('disabled'), i18n.t('automatically')]}
                value={config.clock.dlst}
                onChange={val => dispatch(cf.clockDlstChange(val))}
            />
        </div>
    </>} />
}