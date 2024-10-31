export interface iMenuMobileButton {
    children: React.ReactNode
}

export interface iMenuItem {
    link: string,
    valid: boolean,
    current: string,
    title: string,
    mobile: boolean,
    icon: React.ReactNode,
    children?: React.ReactNode | undefined
}

export interface iMenuItems {
    current: string,
    mobile: boolean
}

export interface iMenuUserItem {
    link: string,
    current: string,
    title: string | React.ReactNode,
    valid: boolean,
    onClick?(): void
}

export interface iMenuUserDropdown {
    current: string
}

export interface iDropdownBox {
    className: string,
    open: boolean,
    children?: React.ReactNode | undefined
}

export interface iCard {
    header?: string | React.ReactNode,
    content: React.ReactNode,
    className?: string
}

export interface iFooterButtons {
    buttons: Array<string>,
    passChange?: {
        old: string, 
        new: string
    },
    alarms?: boolean
}

export interface iColumnsTemplate {
    navbar?: boolean | false,
    header: Array<string> | Array<React.ReactNode>,
    content: Array<React.ReactNode>,
    buttons?: Array<string>,
    footer?: React.ReactNode,
    full?: boolean,
    passChange?: {
        old: string, 
        new: string
    }
    alarms?: boolean
}

export interface iSelectSwitch {
    label: string | React.ReactNode,
    options: Array<string>,
    disabled?: Array<boolean | number>,
    value: number,
    onChange(i: number): void
}

export interface iRadioSwitch {
    id: string,
    name: string,
    checked: boolean,
    onChange(): void,
    label: string,
    icon?: React.ReactNode | null
}

export interface iTextInput {
    type?: string,
    pattern?: [RegExp, boolean/* true: pattern must match / false: pattern must NOT match */],
    required?: boolean,
    value: string,
    tip?: string,
    label: string,
    readonly?: boolean,
    maxLength?: number,
    className?: string,
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void,
    children?: React.ReactNode | undefined,
    autoFocus?: boolean
}

export interface iNumberInput {
    value: number,
    min: number,
    max: number,
    step?: number,
    readonly?: boolean,
    className?: string,
    label: string | React.ReactNode,
    onChange(e: number): void,
    isValid?(v: boolean): void,
    children?: React.ReactNode | undefined
}

export interface iTimeInput {
    value: string,
    step: number,
    label: string,
    onChange(e: string): void
}

export interface iDateTimeInput {
    value: string,
    label: string,
    onChange(e: string): void
}

export interface iColorInput {
    value: string,
    label: string,
    onChange(e: string): void
}

export interface iPasswordInput {
    label: string,
    value: string,
    maxLength: number,
    required?: boolean,
    pattern?: [RegExp, boolean/* true: pattern must match / false: pattern must NOT match */],
    tip?: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void
}

export interface iNetworkInput {
    label: string,
    value: string,
    maxLength: number,
    required?: boolean,
    pattern?: [RegExp, boolean/* true: pattern must match / false: pattern must NOT match */],
    tip?: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void,
    openList(): void
}

export interface iRangeInput {
    label: string | React.ReactNode,
    value: number,
    indication: string,
    min: number,
    max: number,
    step: number,
    limitMin: number,
    limitMax: number,
    onChange(val: number): any,
    className?: string
}

export interface iToggle {
    checked: number,
    onChange(): void,
    label: string | React.ReactNode
}

export interface iButton {
    className?: string | null,
    onClick(): void,
    disabled?: boolean | false,
    label: string | React.ReactNode
}

export interface iModal {
    header?: string,
    content: React.ReactNode,
    labelConfirm?: string,
    labelCancel: string,
    modalClose(): void,
    confirmBtn(): void
}

export interface iModalRestart {
    modalClose(): void
}

export interface iModalNetList {
    ssidSelect(ssid: string): void,
    modalClose(): void
}

export interface iWeather {
    main: {
        temp: number,
        humidity: number,
        pressure: number
    },
    wind: {
        speed: number,
        deg: number
    },
    weather: [{
        description: string
    }],
    name: string,
    sys: {
        country: string
    },
    coord: {
        lat: number,
        lon: number
    },

    data: [{
        temp: number,
        rh: number,
        pres: number,
        wind_spd: number,
        wind_dir: number,
        weather: {
            description: string
        },
        city_name: string,
        country_code: string,
        lat: number,
        lon: number
    }],
    current: {
        relative_humidity_2m: number,
        pressure_msl: number,
        temperature_2m: number,
        weather_code: number,
        wind_direction_10m: number,
        wind_speed_10m: number
    },
    timezone: string,
    latitude: number,
    longitude: number
}

export interface iIndication {
    error: boolean,
    value: string | React.ReactNode
}

export interface iDisplay {
    num: number
}

export interface iDisplayTimeSlot {
    num: number,
    slot: number
}

export interface iAlarm {
    num: number
}

export interface iButtonPlay {
    play(): void
}

export interface iTypesList {
    [key: string]: string
};

export interface iSensor {
    title: string,
    types: string[],
    data: number[]
}

export type iSensors = Array<iSensor>;

export interface iCardSend {
    num: number
}

export interface iFile {
    name: string,
    size?: number | undefined,
    type: string
}

export type iFilelist = Array<iFile>;

export interface iModalFileViewer {
    path: string,
    selected: string,
    modalClose(): void
}

export interface iSelectSensor {
    value: number,
    changeValue(val: number): void,
    indications?: Array<string> | undefined
}

export interface iSensorTypeSequence {
    num: number
}

export interface iWsensTempNum {
    value: number,
    changeValue(val: number): void,
    wSensNum: number
}

export interface iWsensIndications {
    temp: Array<string>,
    hum: string,
    pres: string,
    volt: string,
    light: string,
    hiVoltage: string,
    current: string,
    power: string,
    energy: string,
    frequency: string,
    co2: string
}

export interface iCardThingSend {
    isValid: boolean[], 
    setIsValid(nv: boolean[]): void
}

export interface iCloudSensor {
    num: number, 
    value: number, 
    onChange(val: number): void
}

export interface iCloudSensorType {
    num: number, 
    value: number, 
    sens: number,
    onChange(val: number): void
}

export interface iThingReceiveValid {
    setIsValid(valid: boolean): void
}

export interface iHistoryChart {
    num: number,
    chartColor: string,
    title: string
}

export interface iHistorySensor {
    label: string | React.ReactNode,
    num: number, 
    value: number, 
    onChange(val: number): void   
}

export interface iCardHistory {
    type: number,
    title: string
}

export interface iComfortAirExplicationTable {
    param: string | React.ReactNode,
    min: number,
    max: number
}

export interface iPrevForecast {
    wd: string[],
    tMax: number[],
    tMin: number[],
    wSpeed: number[],
    icon: number[]
}

export interface iSequence {
    descript: string,
    temp: number,
    hum: number,
    slot: number,
    counter: number
}

export interface iSegment {
    symb: number,
    color: string,
    point?: boolean,
    dot?: boolean,
    bg: string
}

export interface iSegState {
    segments: number[],
    colors: string[],
    prevSlot: number,
    clockpoints: boolean,
    points: boolean,
    pointsColor: string,
    slot: number,
    prevSlotMillis: number,
    animMillis: number,
    animSlot: number
}

export interface iSegClockPoints {
    point: string[]
}

export interface iLcdMainState {
    skeleton: boolean,
    sequence: iSequence,
    time: number,
    weekday: string,
    ant: string,
    bat: number,
    volt: string,
    comfort: [string, number],
    icon: number,
    descript: [string, number],
    tempIn: number,
    tempOut: number,
    humIn: number,
    humOut: number,
    presOut: number,
    windSpeed: number,
    windDirection: number,
    updTime: number,
    alarmState: boolean
    forecast: iPrevForecast
}

export interface iLcdNetworkState {
    skeleton: boolean,
    ssid: string,
    rssi: string,
    ip: string,
    mac: string,
    tempESP32: number,
    fw: string
}

export interface iLcdClockState {
    skeleton: boolean,
    points: boolean,
    clockType: string | undefined
}

export interface iLcdCalendarState {
    skeleton: boolean,
    shift: number,
    date: number
}

export interface iHourlyWeather {
    date: number[],
    icon: number[],
    temp: number[],
    hum: number[],
    pres: number[],
    windSpeed: number[],
    windDir: number[],
    prec: number[]
}

export interface iLcdHourlyState {
    skeleton: boolean,
    weather: string,
    shift: number
}

export interface iOpenweathermapHourly {
    list: {
        dt: number,
        dt_txt: string,
        weather: [{
            icon: string
        }],
        main: {
            temp: number,
            pressure: number
        },
        wind: {
            speed: number,
            deg: number
        },
        rain: {
            [key: string]: number
        },
        snow: {
            [key: string]: number
        }
    }[]
}

export interface iOpenMeteoHourly {
    utc_offset_seconds: number,
    hourly: {
        time: number[],
        temperature_2m: number[],
        surface_pressure: number[],
        wind_speed_10m: number[],
        wind_direction_10m: number[],
        precipitation_probability: number[],
        weather_code: number[]
    }
}

export interface iAlarmScreen {
    x: number,
    y: number,
    click: boolean,
    skeleton: boolean,
    alarm: string
}

export interface iSegDoubleDigit {
    shift: number,
    segments: number[],
    colors: string[],
    withDoubleDots: boolean,
    bottomDots: boolean
}