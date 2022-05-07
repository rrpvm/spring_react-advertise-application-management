import { useEffect, useState } from "react";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";


type ListComponentProps = {
    title: string;//title of component
    onSearchNameCallback: CallableFunction;//calls parent' filter function on search
    itemsList: IBanner[] | ICategory[],//list of items to show
    onItemClickCallback: CallableFunction,//calls parent' function by click on any showed banner
}
export const ShowListComponent: React.FC<React.PropsWithChildren<ListComponentProps>> = ({ title, onSearchNameCallback, itemsList, onItemClickCallback, children }) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeItem, setActiveItem] = useState<IBanner | ICategory>(itemsList[0]);
    useEffect(()=>{
        setActiveItem(itemsList[0]);
    },[itemsList])//DidMount();
    let processInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(e.target.value);
        onSearchNameCallback(e.target.value.toLocaleLowerCase());
    }
    return (
        <div className="card" style={{ width: "100%", height: '100%' }}>
            <h3 className="text-center">{title}</h3>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={processInput} value={searchValue}></input>
            <ul className="list-group list-group-flush">
                {
                    itemsList.map((item) => {
                        return (
                            <li className={activeItem === item ? "list-group-item active" : "list-group-item hoverable"}
                                style={{ cursor: "pointer", }}
                                key={item.id}
                                onClick={() => { onItemClickCallback(item);setActiveItem(item) }}>{item.name}
                            </li>
                        );
                    })
                }
            </ul>
            {children}
        </div>
    );
};