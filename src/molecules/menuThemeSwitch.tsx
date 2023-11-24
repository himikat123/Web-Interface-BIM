import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import i18n from '../i18n/main';

const MenuThemeSwitch = () => {
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

    return ( 
        <div className="bg-menu_light dark:bg-menu_dark" title={i18n.t('theme')}>
            <DarkModeSwitch
                checked={darkSide ? true : false }
                onChange={toggleDarkMode}
                size={32}
            />
        </div>
    )
}

export default MenuThemeSwitch;