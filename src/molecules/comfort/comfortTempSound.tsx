import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortTempSound() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <div className="mt-8">
        <Toggle label={i18n.t('soundNotification')}
            checked={config.comfort.temp.sound ?? 0}
            onChange={() => dispatch(cf.comfortTempSoundChange(config.comfort.temp.sound ? 0 : 1))}
        />
    </div>
}