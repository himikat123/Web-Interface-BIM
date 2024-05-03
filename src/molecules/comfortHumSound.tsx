import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Toggle from "../atoms/toggle";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function ComfortHumSound() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <div className="mt-8">
        <Toggle label={i18n.t('soundNotification')}
            checked={config.comfort.hum.sound}
            onChange={() => dispatch(cf.comfortHumSoundChange(config.comfort.hum.sound ? 0 : 1))}
        />
    </div>
}