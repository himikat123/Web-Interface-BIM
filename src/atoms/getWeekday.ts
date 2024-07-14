import i18n from "../i18n/main";
import moment from "moment";

export default function getWeekday(time: number): string {
    const day = moment(time * 1000).day();
    return i18n.t(`weekday.${day}`);
}