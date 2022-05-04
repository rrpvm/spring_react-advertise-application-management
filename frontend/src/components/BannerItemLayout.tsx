import React, { ChangeEvent } from "react";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { MultiSelector } from "./MultiSelector";

type BannerItemLayoutProp = {
    editable_banner?: IBanner,
    allCategories? : ICategory[];
}
export const BannerItemLayout: React.FC<BannerItemLayoutProp> = ({ editable_banner,allCategories }) => {
    const insertInput = (property: string): JSX.Element => {
        return <input className="form-control" value={property} onChange={(e: ChangeEvent<HTMLInputElement>) => { }}></input>
    }
    const getCategoryNames = (arr: ICategory[] | undefined): string[] => {
        if (arr === undefined) return [];
        let array: string[] = [];
        arr.forEach(element => array.push(element.name));
        return array;
    }
    return (
        <>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Name</div>
                {
                    editable_banner ? insertInput(editable_banner?.name) : (<></>)
                }
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Price</div>
                {
                    editable_banner ? insertInput(editable_banner?.price?.toString()) : (<></>)
                }
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <MultiSelector uniqueStrings={getCategoryNames(allCategories)} alreadySelected={getCategoryNames(editable_banner?.linkedCategories)}></MultiSelector>
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Text</div>
                {
                    editable_banner ? <textarea className="form-control" value={editable_banner?.textField}  style={{ minHeight: "12rem" }}></textarea> : (<></>)
                }
            </li>
        </>
    );
};