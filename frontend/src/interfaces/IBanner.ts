export interface IBanner {
    id: number,
    name: string;
    price: number;
    categories:Array<string>; // нам нужно лишь знать уникальное имя / id категорий, не всю информацию
    textField:string,
}