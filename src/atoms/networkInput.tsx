import React from 'react';
import TextInput from './textInput';
import { ReactComponent as ListSVG } from '../atoms/icons/list.svg';

const NetworkInput = (props: any) => {
    return <TextInput label={ props.label } 
        value={ props.value }
        pattern={ props.pattern }
        required={ props.required }
        tip={ props.tip }
        onChange={ props.onChange }
        isValid={ props.isValid }
    >
        <div className="w-8 absolute top-3 right-3 cursor-pointer">
            <ListSVG />
        </div>
    </TextInput>
}

export default NetworkInput;