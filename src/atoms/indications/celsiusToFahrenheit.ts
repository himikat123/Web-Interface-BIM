import { useSelector } from 'react-redux';
import { iConfig } from '../../redux/configTypes';

export function celsiusToFahrenheit(c: number): number {
    return c * 9 / 5 + 32;
}

export function TempLocale(t: number): string {
    const config = useSelector((state: iConfig) => state.config);
    const temp = config.units.temp 
        ? (celsiusToFahrenheit(t).toFixed(1) + '°F') 
        : (t.toFixed(1) + '°C');
    return temp;
}