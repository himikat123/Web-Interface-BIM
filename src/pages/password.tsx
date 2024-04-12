import { useState } from "react";
import i18n from '../i18n/main';
import { sha512_224 } from 'js-sha512';
import PasswordInput from "../atoms/passwordInput";
import OneColumn from "../templates/oneColumn";
import Card from "../atoms/card";

export default function Password() {
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');

    const content = <>
        <Card content={<>
            <PasswordInput label={i18n.t('oldPassword')}
                value={oldPass}
                maxLength={32}
                onChange={e => setOldPass(e.target.value)}
            />

            <div className="mt-8">
                <PasswordInput label={i18n.t('newPassword')}
                    value={newPass}
                    maxLength={32}
                    onChange={e => setNewPass(e.target.value)}
                />
            </div>
        </>} />
    </>

    return <OneColumn navbar={true}
        header={[i18n.t('changePassword')]} 
        content={[content]} 
        buttons={['save', 'reset']}
        passChange={{ old: sha512_224(oldPass), new: sha512_224(newPass)}}
    />
}