export const ALERTTIME: number = 5000;
type navPair = {
    link: string, name: string
}
export const navigablePaths: navPair[] = [
    { link: "/admin/banners", name: "banners" },
    { link: "/admin/categories", name: "categories" },
    { link: "/home", name: "home" },
    { link: "/admin/login", name: "login" },
];