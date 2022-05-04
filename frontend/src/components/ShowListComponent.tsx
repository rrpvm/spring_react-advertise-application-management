import { useState } from "react";
import { IBanner } from "../interfaces/IBanner";


type ListComponentProps = {
    title: string;//title of component
    //actionButtonName: string,//name of 'create button'
    onSearchNameCallback: CallableFunction;//calls parent' filter function on search
    itemsList: IBanner[],//list of items to show
    activeItemId: number,//active item id
    onItemClickCallback: CallableFunction,//calls parent' function by click on any showed banner
}
export const ShowListComponent: React.FC<React.PropsWithChildren<ListComponentProps>> = ({ title, onSearchNameCallback, itemsList, activeItemId, onItemClickCallback, children }) => {
    const [searchValue, setSearchValue] = useState('');
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
                            <li className={activeItemId === item.id ? "list-group-item active" : "list-group-item hoverable"}
                                style={{ cursor: "pointer", }}
                                key={item.id}
                                onClick={() => { onItemClickCallback(item) }}>{item.name}
                            </li>
                        );
                    })
                }
            </ul>
            {children}
        </div>
    );
};