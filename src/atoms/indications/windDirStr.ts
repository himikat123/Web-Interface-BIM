import i18n from "../../i18n/main";

export function windDirStr(deg: number) {
    if(deg >= 0 && deg < 360) {
        const keys = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(deg / 45) % 8;
        return i18n.t(`windDirs.${keys[index]}`);
    }
    return '--';
}