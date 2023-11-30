import React from 'react';
import TextInput from './textInput';
import { ReactComponent as NetsSVG } from '../atoms/icons/en.svg';

const NetworkInput = (props: any) => {
    return <TextInput label={ props.label } 
        value={ props.value }
        pattern={ props.pattern }
        required={ props.required }
        tip={ props.tip }
        onChange={ props.onChange }
        isValid={ props.isValid }
    >
        <div className="w-8 absolute top-4 right-2 cursor-pointer">
            <NetsSVG />
        </div>
    </TextInput>
}

export default NetworkInput;