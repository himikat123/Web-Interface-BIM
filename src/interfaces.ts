export interface iMenuMobileButton {
    children: React.ReactNode
}

export interface iMenuItem {
    link: string,
    current: string,
    title: string,
    mobile: boolean
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