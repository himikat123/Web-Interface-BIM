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
    title: string,
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
    header?: string,
    content: React.ReactNode
}

export interface iFooterButtons {
    buttons: Array<string>
}

export interface iColumnsTemplate {
    navbar?: boolean | false,
    header: Array<string>,
    content: Array<React.ReactNode>,
    buttons?: Array<string>
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
    className?: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void,
    children?: React.ReactNode | undefined
}

export interface iPasswordInput {
    label: string,
    value: string,
    required?: boolean,
    pattern?: [RegExp, boolean/* true: pattern must match / false: pattern must NOT match */],
    tip?: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void
}

export interface iNetworkInput {
    label: string,
    value: string,
    required?: boolean,
    pattern?: [RegExp, boolean/* true: pattern must match / false: pattern must NOT match */],
    tip?: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid?(v: boolean): void
}

export interface iToggle {
    checked: number,
    onChange(): void,
    label: string
}

export interface iButton {
    className?: string | null,
    onClick(): void,
    disabled?: boolean | false,
    label: string
}

export interface iModal {
    header?: string,
    content: React.ReactNode,
    labelConfirm: string,
    labelCancel: string,
    modalClose(): void,
    confirmBtn(): void
}

export interface iModalRestart {
    modalClose(): void
}