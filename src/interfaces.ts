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

export interface iColumnsTemplate {
    navbar?: boolean | false,
    header: string,
    content: React.ReactNode
}

export interface iRadioSwitch {
    id: string,
    name: string,
    checked: boolean,
    onChange: any,
    label: string,
    icon?: React.ReactNode | null
}