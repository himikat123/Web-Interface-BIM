import store from '../redux/store';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import 'moment/locale/bg';

export function getLocale(): string {
    const config = store.getState().config;
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    return locale;
}