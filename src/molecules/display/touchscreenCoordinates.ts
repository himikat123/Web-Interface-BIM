import * as D from './displayTypes';

export function wifiAntennaOrCloseButton(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 432, y: 48 };
        case D.ILI9341: return { x: 290, y: 32 };
        default: /* NX4832K(T)035 */ return { x: 432, y: 48 };
    }
}

export function clockMain(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 206, y: 86 };
        case D.ILI9341: return { x: 144, y: 78 };
        default: /* NX4832K(T)035 */ return { x: 206, y: 102 };
    }
}

export function clockType(model: number) {
    switch(model) {
        case D.NX4827K043: return { y1: 60, y2: 230 };
        case D.ILI9341: return { y1: 55, y2: 185 };
        default: /* NX4832K(T)035 */ return { y1: 88, y2: 260 };
    }
}

export function calendar(model: number) {
    switch(model) {
        case D.NX4827K043: return { x1: 208, x2: 272, x3: 48, x4: 432, y1: 42, y2: 52, y3: 232 };
        case D.ILI9341: return { x1: 146, x2: 210, x3: 30, x4: 290, y1: 20, y2: 38, y3: 200 };
        default: return { x1: 208, x2: 272, x3: 48, x4: 432, y1: 48, y2: 60, y3: 270 };
    }
}

export function backButton(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 37, y1: 120, y2: 152 };
        case D.ILI9341: return { x: 24, y1: 106, y2: 130 };
        default: /* NX4832K(T)035 */ return { x: 37, y1: 144, y2: 176 };
    }
}

export function forwardButton(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 445, y1: 120, y2: 152 };
        case D.ILI9341: return { x: 295, y1: 106, y2: 130 };
        default: /* NX4832K(T)035 */ return { x: 445, y1: 144, y2: 176 };
    }
}

export function hourlyForecast(model: number) {
    switch(model) {
        case D.NX4827K043: return { y: 182, day1: 96, day2: 192, day3: 288, day4: 384 };
        case D.ILI9341: return { y: 165, day1: 106, day2: 212, day3: 320, day4: 999 };
        default: /* NX4832K(T)035 */ return { y: 222, day1: 120, day2: 240, day3: 360, day4: 999 };
    }
}

export function historyIn(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 209, y1: 44, y2: 92 };
        case D.ILI9341: return { x: 145, y1: 33, y2: 80 };
        default: /* NX4832K(T)035 */ return { x: 209, y1: 55, y2: 107 };
    }
}

export function historyOut(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 440, y1: 92, y2: 180 };
        case D.ILI9341: return { x: 284, y1: 81, y2: 160 };
        default: /* NX4832K(T)035 */ return { x: 440, y1: 105, y2: 222 };
    }
}

export function alarm(model: number) {
    switch(model) {
        case D.NX4827K043: return { x: 448, y1: 153, y2: 180 };
        case D.ILI9341: return { x: 284, y1: 130, y2: 162 };
        default: return /* NX4832K(T)035 */ { x: 443, y1: 190, y2: 222 };
    }
}