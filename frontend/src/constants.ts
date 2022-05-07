export const ALERTTIME: number = 5000;
export const ITEMS_IN_PAGE = 4;
export const PAGES_BUTTON_LENGTH = 4;
type navPair = {
    link: string, name: string
}
export const navigablePaths: navPair[] = [
    { link: "/admin/banners", name: "banners" },
    { link: "/admin/categories", name: "categories" },
    { link: "/home", name: "home" },
    { link: "/admin/login", name: "login" },
];
