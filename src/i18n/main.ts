import { I18n } from 'i18n-js';
import en from './lang.en.json';
import de from './lang.de.json';
import ru from './lang.ru.json';
import pl from './lang.pl.json';
import ua from './lang.ua.json'

const i18n = new I18n();

i18n.defaultLocale = 'en';
i18n.locale = 'de';
i18n.enableFallback = true;
i18n.translations = { en, de, ru, pl, ua };

export default i18n;