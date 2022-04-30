import { useState } from "react"


/*const arr:Array<string> = [
    "lorem","ipsum","dolar"
];*/
const lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer'
export const MultiSelector: React.FC = () => {
    const [bShowSelect, showSelect] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>(['lorem']);
    function add(str: string): void {
        let mutable = [];//нельзя копировать ссылку на селектИтемс, т.к юзстейт не считает должным обновить состояние прямо в тот момент
        selectedItems.forEach(item => { mutable.push(item) });
        mutable.push(str);
        setSelectedItems(mutable);
    }
    function renderSelectedList(): JSX.Element {
        return (
            <>
                {
                    selectedItems.map(item => {
                        return (
                            <div style={{ padding: "10px 15px", display:"flex", }} key={item} className="hoverable">                            
                                <span style={{fontSize:"24px"}}>{item}</span>
                                <i className="material-icons" style={{transform:"rotateZ(45deg)", fontSize:"24px",display:"flex",alignItems:"center",padding:"8px"}}>add</i>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return (
        <li className="list-group-item" style={{ display: "flex" }}>
            <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Category</div>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ display: "flex", width: "100%", border: "1px solid black", cursor: "pointer", overflow: "hidden" }} onClick={() => { showSelect(!bShowSelect) }}>
                    {renderSelectedList()}
                </div>
                <div hidden={bShowSelect} style={{ cursor: "pointer", borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                    {
                        lorem.split(' ').map(str => {
                            return <option className="multiselect-item" key={str} onClick={() => {
                                add(str);
                            }}>{str}</option>
                        })
                    }
                </div>
            </div>
        </li>
    )
}