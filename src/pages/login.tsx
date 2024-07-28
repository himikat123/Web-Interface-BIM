import { useState, useEffect, useCallback } from "react";
import i18n from "../i18n/main";
import { sha512_224 } from 'js-sha512';
import hostUrl from "../atoms/hostUrl";
import OneColumn from "../templates/oneColumn";
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import PasswordInput from "../atoms/passwordInput";
import Button from "../atoms/button";
import { ReactComponent as SpinnerSVG } from '../atoms/icons/spinner.svg';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [resultTxt, setResultTxt] = useState<string>('');
    const [resultType, setResultType] = useState<boolean>(false);
    const [loggingIn, setLoggingIn] = useState<boolean>(false);

    const handleLogIn = useCallback(async () => {
        setLoggingIn(true);
        setResultTxt('');

        let data = new FormData();
        data.append("name", username);
        data.append("pass", sha512_224(password));
        data.append("code", localStorage.getItem('code') || '0');

        try {
            const response = await fetch(`${hostUrl()}/esp/login`, {
                method: "POST",
                body: data
            });
            const res = await response.text();
            const result = res.split(':');
            if(result.length === 2) {
                if(result[0] === 'OK') {
                    setResultTxt(i18n.t('loginToSettings'));
                    setResultType(false);
                    localStorage.setItem('code', result[1]);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    setResultTxt(i18n.t('wrongLoginOrPassword'));
                    setResultType(true);
                    console.error(result);
                }
            }
            setLoggingIn(false);
        } catch (error) {
            setResultTxt(i18n.t('networkError'));
            setResultType(true);
            console.error(error);
            setLoggingIn(false);
        }
    }, [username, password]);

    useEffect(() => {
        function handleUserKeyPress(event: KeyboardEvent) {
            if(event.key === 'Enter') handleLogIn();
        }

        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        }
    }, [handleLogIn]);

    const content = <Card content={<>
        <div className="mt-6">
            <TextInput value={username}
                label={i18n.t('username')}
                onChange={val => setUsername(val.target.value)}
                autoFocus={true}
            />
        </div>
        <div className="mt-8">
            <PasswordInput value={password}
                label={i18n.t('password')}
                maxLength={32}
                onChange={val => setPassword(val.target.value)}
            />
        </div>

        <div className={'mt-8 text-center ' + (resultType ? 'text-red-500' : 'text-blue-500')}>
            <div className="flex justify-center">
                {resultTxt}
                {resultTxt.length > 0 && !resultType && <div className="ms-4 w-6 h-6">
                    <SpinnerSVG />
                </div>}
            </div>
            
            <Button className={`bg-blue-600 hover:bg-blue-700 text-text_dark`}
                label={<div className="flex justify-center">
                    {i18n.t('login')}
                    {loggingIn && <div className="ms-4 w-6 h-6"><SpinnerSVG /></div>}
                </div>}
                onClick={() => handleLogIn()}
            />
        </div>
    </>} />;

    return <OneColumn header={[i18n.t('login')]} 
        content={[content]} 
        navbar={false} 
        buttons={[]} 
    />
}