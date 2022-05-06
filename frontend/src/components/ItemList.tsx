import React, { PropsWithChildren } from "react";
import { ICategory } from "../interfaces/ICategory";
import IPickable from "../interfaces/IPickable";

interface ItemListProps<Type> {
    items: Type[],
    onPickItem: CallableFunction,//params :  original array
}
export const ItemList: React.FC<PropsWithChildren<ItemListProps<IPickable<ICategory>>>> = ({ items, onPickItem, children }) => {
    return (
        <>
            <ul className="list-group list-group-flush" style={{ width: "100%", display: "flex", height: "768px", padding: "15px", }}>
                <h1 className="text-center">Select categories</h1>
                {
                    items.map((item) => {
                        return (
                            <li
                            style={{padding:"16px"}}
                                className={"list-group-item category-pickable ".concat(item.picked ? ("picked") : (""))}
                                key={item.item.requestId}
                                onClick={() => {
                                    let mutableShit = [...items];
                                    for (let i = 0; i < mutableShit.length; i++) {
                                        if (mutableShit[i].item === item.item) {
                                            mutableShit[i].picked = !mutableShit[i].picked;
                                            break;
                                        }
                                    }
                                    onPickItem(mutableShit,item);
                                }}>{item.item.name}
                            </li>)
                    })
                }
                {children}
            </ul>
        </>
    );
}