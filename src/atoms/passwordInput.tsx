import React, { useState } from 'react';
import TextInput from './textInput';
import { ReactComponent as ShowSVG } from '../atoms/icons/show.svg';
import { ReactComponent as HideSVG } from '../atoms/icons/hide.svg';
import { iPasswordInput } from '../interfaces';

const PasswordInput = (props: iPasswordInput) => {
    const [type, setType] = useState<string>('password');

    return <TextInput label={ props.label }
        className="pe-9" 
        type={ type }
        value={ props.value }
        required={ props.required }
        pattern={ props.pattern }
        tip={ props.tip }
        onChange={ props.onChange }
        isValid={ props.isValid }
    >
        <div className="w-8 absolute top-3 right-3 cursor-pointer input-icon" 
            onClick={() => setType(type == 'password' ? 'text' : 'password')}
        >
            {type === 'password' ? <HideSVG /> : <ShowSVG />}
        </div>
    </TextInput>
}

export default PasswordInput;