import i18n from '../../i18n/main';
import { useSelector } from 'react-redux';
import { iConfig } from '../../redux/configTypes';

export function hPaToMM(h: number): number {
    return h / 1.33322;
}

export function mmToHPA(h: number): number {
    return h * 1.33322;
}

export function PresLocale(p: number, corr: number): string {
    const config = useSelector((state: iConfig) => state.config);
    const pres = config.units.pres 
        ? ((p + corr).toFixed(1) + i18n.t('units.hpa')) 
        : ((hPaToMM(p) + corr).toFixed(1) + i18n.t('units.mm'))
    return pres;
}