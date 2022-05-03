import { useState } from "react";


type ListComponentProps = {
    title: string;
    itemsName: Array<string>;
    floatingButtonName: string,
    activeItem?: string,
    callback: CallableFunction,
    onProcessInput?: CallableFunction,
    createItemCallback: CallableFunction,
}
export const ShowListComponent: React.FC<ListComponentProps> = ({ title, itemsName, floatingButtonName, activeItem, callback, onProcessInput ,createItemCallback}) => {
    const [searchValue, setSearchValue] = useState('');
    function processInput(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value);
        if (onProcessInput !== undefined) {/*ts warnings skip */
            const call = onProcessInput;
            call(e.target.value.toLocaleLowerCase());
        }
    }
    return (
        <div className="card" style={{ width: "100%", height: '100%' }}>
            <h3 className="text-center">{title}</h3>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={processInput} value={searchValue}></input>
            <ul className="list-group list-group-flush">
                {
                    itemsName.map((item) => {
                        return (<li className={activeItem === item ? "list-group-item active" : "list-group-item hoverable"} style={{ cursor: "pointer", }} key={item} onClick={() => { callback(item) }}>{item}</li>);
                    })
                }
            </ul>
            <button className="btn btn-primary" type="button" style={{ backgroundColor: "#f06292", borderColor: "#f06292", marginTop: "auto" }} onClick={()=>{createItemCallback()}}>Create new {floatingButtonName}</button>
        </div>
    );
};