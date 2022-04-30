import { ChangeEventHandler } from "react";
import { IBanner } from "../interfaces/IBanner";
import { MultiSelector } from "./MultiSelector";

type BannerItemLayoutProp = {
    prop: IBanner,
}
export const BannerItemLayout: React.FC<BannerItemLayoutProp> = ({ prop }) => {
    const insertItem = (name: string, callback: ChangeEventHandler<HTMLInputElement>, prop: string): JSX.Element => {
        return (
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>{name}</div>
                <input className="form-control" value={prop} onChange={callback}></input>
            </li>
        );
    };
    return (
        <>
            {insertItem('Name', () => { }, prop.name)}
            {insertItem('Price', () => { }, prop.price.toString())}
            <MultiSelector></MultiSelector>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Text</div>
                <textarea className="form-control" value={prop.textField} onChange={() => { }} style={{ minHeight: "12rem" }}></textarea>
            </li>
        </>
    );
};