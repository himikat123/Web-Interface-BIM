import i18n from '../../i18n/main';

export function hPaToMM(h: number): number {
    return h / 1.33322;
}

export function mmToHPA(h: number): number {
    return h * 1.33322;
}

export function PresLocale(p: number, corr: number, units: number): string {
    const pres = units 
        ? ((p + corr).toFixed(1) + i18n.t('units.hpa')) 
        : ((hPaToMM(p) + corr).toFixed(1) + i18n.t('units.mm'))
    return pres;
}