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