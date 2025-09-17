export function celsiusToFahrenheit(c: number): number {
    return c * 9 / 5 + 32;
}

export function TempLocale(t: number, useFahrenheit: number): string {
    const temp = useFahrenheit 
        ? (celsiusToFahrenheit(t).toFixed(1) + '°F') 
        : (t.toFixed(1) + '°C');
    return temp;
}