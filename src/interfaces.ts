export interface iMenuMobileButton {
    children: React.ReactNode
}

export interface iMenuItem {
    link: string,
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
    num: number
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
    content: React.ReactNode
}

export interface iFooterButtons {
    buttons: Array<string>
}

export interface iColumnsTemplate {
    navbar?: boolean | false,
    header: string,
    content: React.ReactNode,
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
    pattern: RegExp,
    required?: boolean,
    value: string,
    title: string,
    id: string,
    label: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void,
    isValid(v: boolean): void
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