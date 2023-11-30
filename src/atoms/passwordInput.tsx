import React, { useState } from 'react';
import TextInput from './textInput';
import { ReactComponent as HideSVG } from '../atoms/icons/en.svg';
import { ReactComponent as ShowSVG } from '../atoms/icons/de.svg';
import { iPasswordInput } from '../interfaces';

const PasswordInput = (props: iPasswordInput) => {
    const [type, setType] = useState<string>('password');

    return <TextInput label={ props.label } 
        type={ type }
        value={ props.value }
        required={ props.required }
        pattern={ props.pattern }
        tip={ props.tip }
        onChange={ props.onChange }
        isValid={ props.isValid }
    >
        <div className="w-8 absolute top-4 right-2 cursor-pointer" 
            onClick={() => setType(type == 'password' ? 'text' : 'password')}
        >
            {type === 'password' ? <HideSVG /> : <ShowSVG />}
        </div>
    </TextInput>
}

export default PasswordInput;