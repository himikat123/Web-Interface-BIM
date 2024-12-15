import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortCo2Sound() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sound = config.comfort.co2?.sound ?? 0;

    return <div className="mt-8">
        <Toggle label={i18n.t('soundNotification')}
            checked={sound}
            onChange={() => dispatch(cf.comfortCo2SoundChange(sound ? 0 : 1))}
        />
    </div>
}