import * as D from './displayTypes';

export function wifiAntennaOrCloseButton(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 320, y: 36 };
        case D.NX4827K043: return { x: 320, y: 36 };
        case D.ILI9341: return { x: 284, y: 25 };
        default: return { x: 0, y: 0 };
    }
}

export function clockMain(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 140, y: 80 };
        case D.NX4827K043: return { x: 140, y: 80 };
        case D.ILI9341: return { x: 140, y: 80 };
        default: return { x: 0, y: 0 };
    }
}

export function clockType(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { y1: 55, y2: 185 };
        case D.NX4827K043: return { y1: 55, y2: 185 };
        case D.ILI9341: return { y1: 55, y2: 185 };
        default: return { y1: 0, y2: 0 };
    }
}

export function calendar(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x1: 145, x2: 180, x3: 40, x4: 300, y1: 33, y2: 36, y3: 180 };
        case D.NX4827K043: return { x1: 145, x2: 180, x3: 40, x4: 300, y1: 33, y2: 36, y3: 180 };
        case D.ILI9341: return { x1: 145, x2: 180, x3: 40, x4: 250, y1: 33, y2: 36, y3: 180 };
        default: return { x1: 0, x2: 0, x3: 0, x4: 0, y1: 0, y2: 0, y3: 0 };
    }
}

export function backButton(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 32, y1: 100, y2: 136 };
        case D.NX4827K043: return { x: 32, y1: 100, y2: 136 };
        case D.ILI9341: return { x: 32, y1: 100, y2: 136 };
        default: return { x: 0, y1: 0, y2: 0 };
    }
}

export function forwardButton(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 320, y1: 100, y2: 136 };
        case D.NX4827K043: return { x: 320, y1: 100, y2: 136 };
        case D.ILI9341: return { x: 286, y1: 100, y2: 136 };
        default: return { x: 0, y1: 0, y2: 0 };
    }
}

export function hourlyForecast(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { y: 162, day1: 90, day2: 176, day3: 264, day4: 362 };
        case D.NX4827K043: return { y: 162, day1: 90, day2: 176, day3: 264, day4: 300 };
        case D.ILI9341: return { y: 162, day1: 106, day2: 208, day3: 320, day4: 330 };
        default: return { y: 0, day1: 0, day2: 0, day3: 0, day4: 0 };
    }
}

export function historyIn(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 145, y1: 33, y2: 80 };
        case D.NX4827K043: return { x: 145, y1: 33, y2: 80 };
        case D.ILI9341: return { x: 145, y1: 33, y2: 80 };
        default: return { x: 0, y1: 0, y2: 0 };
    }
}

export function historyOut(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 320, y1: 81, y2: 160 };
        case D.NX4827K043: return { x: 320, y1: 81, y2: 160 };
        case D.ILI9341: return { x: 284, y1: 81, y2: 160 };
        default: return { x: 0, y1: 0, y2: 0 };
    }
}

export function alarm(model: number) {
    switch(model) {
        case D.NX4832K035:
        case D.NX4832T035: return { x: 328, y1: 130, y2: 162 };
        case D.NX4827K043: return { x: 328, y1: 130, y2: 162 };
        case D.ILI9341: return { x: 284, y1: 130, y2: 162 };
        default: return { x: 0, y1: 0, y2: 0 };
    }
}