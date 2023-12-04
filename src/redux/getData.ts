import { useSelector, useDispatch } from 'react-redux';
import { iData } from './dataTypes';
import { stateChange, setState } from '../redux/slices/data';

const GetData = () => {
    const dispatch = useDispatch();
    useSelector((state: iData) => state.data.state);

    fetch("./data.json")
    .then(res => res.json())
    .then((result) => {
        dispatch(stateChange('ok'));
        dispatch(setState(result));
    },
        (error) => {
            dispatch(stateChange('error'));
            console.error(error);
        }
    )
}

export default GetData;