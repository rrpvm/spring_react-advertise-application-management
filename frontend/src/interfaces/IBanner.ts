import { ICategory } from "./ICategory";

export interface IBanner {
    id: number,
    name: string;
    price: number;
    category:Array<ICategory>;
    textField:string,
}