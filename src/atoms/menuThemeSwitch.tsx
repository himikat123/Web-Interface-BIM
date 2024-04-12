import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import i18n from '../i18n/main';

export default function MenuThemeSwitch() {
    const [darkSide, setDarkSide] = useState<boolean>(false);

    const applyDarkMode = (checked: boolean) => {
        const root = window.document.documentElement;
        if(checked) root.classList.add('dark');
        else root.classList.remove('dark');
        setDarkSide(checked);
    }

    const toggleDarkMode = (checked: boolean) => {
        localStorage.setItem('theme', checked ? 'dark' : 'light');
        setDarkSide(checked);
        applyDarkMode(checked);
    };

    useEffect(() => {
        const theme = (localStorage.hasOwnProperty('theme')) ?
            (localStorage.theme === 'dark' ? true : false) : 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false);
        applyDarkMode(theme);
    }, [darkSide]);

    return <div className="hover:scale-110 transition bg-menu_light dark:bg-menu_dark" title={i18n.t('theme')}>
        <DarkModeSwitch
            sunColor="white"
            moonColor="white"
            checked={darkSide ? true : false }
            onChange={toggleDarkMode}
            size={32}
        />
    </div>
}