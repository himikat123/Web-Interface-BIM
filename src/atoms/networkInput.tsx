import React from 'react';
import TextInput from './textInput';
import { ReactComponent as ListSVG } from '../atoms/icons/list.svg';
import { iNetworkInput } from '../interfaces';

const NetworkInput = (props: iNetworkInput) => {
    return <TextInput label={props.label} 
        className="pe-9"
        value={props.value}
        maxLength={props.maxLength}
        pattern={ props.pattern }
        required={ props.required }
        tip={ props.tip }
        onChange={ props.onChange }
        isValid={ props.isValid }
    >
        <div className="w-8 absolute top-3 right-3 cursor-pointer input-icon">
            <ListSVG />
        </div>
    </TextInput>
}

export default NetworkInput;