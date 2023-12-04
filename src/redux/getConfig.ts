import { changeLanguage } from '../i18n/main';
import { useDispatch } from 'react-redux';
import { stateChange, setState } from '../redux/slices/config';

const GetConfig = () => {
    const dispatch = useDispatch();

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

export default GetConfig;