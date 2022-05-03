import { ChangeEventHandler } from "react";
import { IBanner } from "../interfaces/IBanner";
import { MultiSelector } from "./MultiSelector";

type BannerItemLayoutProp = {
    prop?: IBanner,
}
export const BannerItemLayout: React.FC<BannerItemLayoutProp> = ({ prop }) => {
    const insertItem = (name?: string, callback?: ChangeEventHandler<HTMLInputElement>, prop?: string): JSX.Element => {
        return (
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>{name}</div>
                <input className="form-control" value={prop} onChange={callback}></input>
            </li>
        );
    };
    const getCategoriesArrayName = (): string[] => {
        let arr : string[] = [];
        console.log(prop)
        prop?.linkedCategories?.forEach(category => arr.push(category.name));
        return arr;
    }
    return (
        <>
            {insertItem('Name', () => { }, prop?.name)}
            {insertItem('Price', () => { }, prop?.price.toString())}
            <li className="list-group-item" style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Category</div>
                <MultiSelector uniqueStrings={[]} alreadySelected={getCategoriesArrayName()} ></MultiSelector>
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Text field</div>
                <textarea className="form-control" value={prop?.textField} onChange={() => { }} style={{ minHeight: "12rem" }}></textarea>
            </li>
            
        </>
    );
};