import i18n from '../../i18n/main';
import store from '../../redux/store';
import comfortTempRating from '../../molecules/comfort/comfortTempRating';
import comfortHumRating from '../../molecules/comfort/comfortHumRating';
import comfortCo2Rating from '../../molecules/comfort/comfortCo2Rating';
import comfortIaqRating from '../../molecules/comfort/comfortIaqRating';

export default function lcdGetComfort(sequence: string): string {
    const config = store.getState().config;
    let descr = '--';

    if(config.display.source.descr === 1) { // Comfort
        const ratings = [
            [i18n.t('comfortable'), i18n.t('tooHumid'), i18n.t('tooDry')],
            [i18n.t('tooHot'), i18n.t('hotAndHumid'), i18n.t('hotAndDry')],
            [i18n.t('tooCold'), i18n.t('coldAndHumid'), i18n.t('coldAndDry')]
        ];
        const airs = [i18n.t('cleanAir'), i18n.t('polutedAir'), i18n.t('havilyPolutedAir')];
        const tempRating = comfortTempRating();
        const humRating = comfortHumRating();
        const co2Rating = comfortCo2Rating();
        const iaqRating = comfortIaqRating();
        if(tempRating >= 0 || humRating >= 0) {
            descr = ratings[Math.max(tempRating, 0)][Math.max(humRating, 0)];
        }
        if(co2Rating >= 0 || iaqRating >= 0) {
            const air = airs[Math.max(co2Rating, iaqRating)];
            if(descr === '--') descr = air;
            else descr = descr + '. ' + air;
        }
    }
    if(config.display.source.descr === 2) { // Sequence
        descr = sequence;
    }

    return descr;
}