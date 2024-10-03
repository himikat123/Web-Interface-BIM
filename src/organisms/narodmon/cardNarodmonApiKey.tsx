import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import TextInput from "../../atoms/textInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardNarodmonApiKey() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<>
        {/* Channel ID */}
        <TextInput label={i18n.t('latitude')}
            value={config.narodmonSend.lat}
            maxLength={10}
            onChange={val => dispatch(cf.narodmonSendLatChange(val.target.value))}
        />

        {/* Write API Key */}
        <div className="mt-8">
            <TextInput label={i18n.t('longitude')}
                value={config.narodmonSend.lon}
                maxLength={10}
                onChange={val => dispatch(cf.narodmonSendLonChange(val.target.value))}
            />
        </div>
    </>} />
}