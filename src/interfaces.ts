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
    valid: boolean
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
    passChange?: {old: string, new: string}
}

export interface iColumnsTemplate {
    navbar?: boolean | false,
    header: Array<string>,
    content: Array<React.ReactNode>,
    buttons?: Array<string>,
    footer?: React.ReactNode,
    full?: boolean,
    passChange?: {old: string, new: string}
}

export interface iSelectSwitch {
    label: string | React.ReactNode,
    options: Array<string>,
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
    children?: React.ReactNode | undefined
}

export interface iNumberInput {
    value: number,
    min: number,
    max: number,
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
    }]
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
    dot?: boolean
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
    clockpoints: boolean,
    points: boolean, 
    color: string, 
    dispNum: number
}