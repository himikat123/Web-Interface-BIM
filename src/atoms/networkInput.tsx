import TextInput from './textInput';
import { List } from '@phosphor-icons/react';
import { iNetworkInput } from '../interfaces';

const NetworkInput = (props: iNetworkInput) => {
    return <TextInput label={props.label} 
        className="pe-9"
        value={props.value}
        maxLength={props.maxLength}
        pattern={props.pattern}
        required={props.required}
        tip={props.tip}
        onChange={props.onChange}
        isValid={props.isValid}
    >
        <div className="w-8 h-8 absolute top-3 right-3 cursor-pointer input-icon" onClick={props.openList}>
            <List size={32} />
        </div>
    </TextInput>
}

export default NetworkInput;