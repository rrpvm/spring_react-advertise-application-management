import { ICategory } from "./ICategory";

export interface IBanner {
    id: number,
    name: string;
    price: number;
    linkedCategories:Array<ICategory>; // нам нужно лишь знать уникальное имя / id категорий, не всю информацию
    textField:string,
}