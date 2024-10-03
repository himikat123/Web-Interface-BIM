import i18n from "../../i18n/main";
import CardHistoryTemp from "./cardHistoryTemp";
import CardHistoryHum from "./cardHistoryHum";
import CardHistoryPres from "./cardHistoryPres";
import CardHistoryIaq from "./cardHistoryIaq";
import CardHistoryCO2 from "./cardHistoryCO2";

export default function CardsHistorySensor() {
    return <>
        <CardHistoryTemp type={0} title={i18n.t('temperatureOut')} />
        <CardHistoryHum type={1} title={i18n.t('humidityOut')} />
        <CardHistoryPres type={2} title={i18n.t('pressure')} />
        <CardHistoryTemp type={3} title={i18n.t('temperatureIn')} />
        <CardHistoryHum type={4} title={i18n.t('humidityIn')} />
        <CardHistoryIaq type={5} title={i18n.t('airQuality')} />
        <CardHistoryCO2 type={6} title={i18n.t('CO2Level')} />
    </>
}