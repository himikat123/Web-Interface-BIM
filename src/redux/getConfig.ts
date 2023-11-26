import { changeLanguage } from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from './configTypes';
import { stateChange, setState } from '../redux/slices/config';

const GetConfig = () => {
    const dispatch = useDispatch();
    useSelector((state: iConfig) => state.config.state);

    fetch("./config.json")
    .then(res => res.json())
    .then((result) => {
        dispatch(stateChange('ok'));
        dispatch(setState(result));
        changeLanguage(result.lang);
    },
        (error) => {
            dispatch(stateChange('error'));
            console.error(error);
        }
    )
}

export { GetConfig };