import { useSelector } from "react-redux";
import { iMenuItems } from "../../interfaces";
import { iValid } from "../../redux/validTypes";
import MenuItem from "../../atoms/menuItem";
import i18n from '../../i18n/main';
import { MoonStars } from "@phosphor-icons/react";

export default function MenuSleep(props: iMenuItems) {
    const validSleep = useSelector((state: iValid) => state.valid.sleep);

    return <MenuItem link={"/sleep"} 
        current={props.current} 
        title={i18n.t('sleep')} 
        mobile={props.mobile} 
        icon={<MoonStars />} 
        valid={validSleep} 
    />
}