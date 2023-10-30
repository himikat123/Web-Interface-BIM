export interface iMobileMenuButton {
    open: boolean;
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