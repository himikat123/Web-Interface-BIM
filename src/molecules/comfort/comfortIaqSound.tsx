import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortIaqSound() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sound = config.comfort.iaq?.sound ?? 0;

    return <div className="mt-8">
        <Toggle label={i18n.t('soundNotification')}
            checked={sound}
            onChange={() => dispatch(cf.comfortIaqSoundChange(sound ? 0 : 1))}
        />
    </div>
}