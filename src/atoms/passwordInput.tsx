import { useState } from 'react';
import TextInput from './textInput';
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { iPasswordInput } from '../interfaces';

export default function PasswordInput(props: iPasswordInput) {
    const [type, setType] = useState<string>('password');

    return <TextInput label={props.label}
        className="pe-9" 
        type={type}
        maxLength={props.maxLength}
        value={props.value}
        required={props.required}
        pattern={props.pattern}
        tip={props.tip}
        onChange={props.onChange}
        isValid={props.isValid}
    >
        <div className="w-8 h-8 absolute top-3 right-3 cursor-pointer input-icon" 
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
        >
            {type === 'password' ? <EyeSlash size={32} /> : <Eye size={32} />}
        </div>
    </TextInput>
}