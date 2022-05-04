import { useEffect, useState } from "react"
import { IMultiselectable } from "../interfaces/IMulltiselectable";




export const MultiSelector: React.FC<IMultiselectable> = ({ uniqueStrings, alreadySelected }) => {
    const [bShowSelect, showSelect] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>(alreadySelected);
    const [inAvaliableItems, setAvaliableItems] = useState<string[]>(uniqueStrings);
    function add(str: string): void {
        let mutableSelected: string[] = [];//нельзя копировать ссылку на селектИтемс, т.к юзстейт не считает должным обновить состояние прямо в тот момент
        let mutableAvaliable: string[] = [];//нельзя копировать ссылку на селектИтемс, т.к юзстейт не считает должным обновить состояние прямо в тот момент    
        selectedItems.forEach(item => { mutableSelected.push(item) });//копирование по значению
        inAvaliableItems.forEach(item => { mutableAvaliable.push(item) });
        mutableSelected.push(str);
        setSelectedItems(mutableSelected);//добавляем в выбранные
        mutableAvaliable.splice(inAvaliableItems.indexOf(str), 1);
        setAvaliableItems(mutableAvaliable);//удаляем из доступных к выбору
        mutableAvaliable = [];
        mutableSelected = [];//clear

    }
    function remove(item: string): void {
        let mutableSelected: string[] = [];//нельзя копировать ссылку на селектИтемс, т.к юзстейт не считает должным обновить состояние прямо в тот момент
        let mutableAvaliable: string[] = [];//нельзя копировать ссылку на селектИтемс, т.к юзстейт не считает должным обновить состояние прямо в тот момент    
        selectedItems.forEach(item => { mutableSelected.push(item) });//копирование по значению
        inAvaliableItems.forEach(item => { mutableAvaliable.push(item) });
        mutableSelected.splice(selectedItems.indexOf(item), 1);//fixed bug
        setSelectedItems(mutableSelected);
        mutableAvaliable.push(item)
        setAvaliableItems(mutableAvaliable);
        mutableAvaliable = [];
        mutableSelected = [];//clear
    }
    useEffect(() => {
        setSelectedItems(alreadySelected);
        setAvaliableItems(uniqueStrings);
    }, [alreadySelected, uniqueStrings])//при изменении 1го из параметров -> мы поменяли выбранный баннер
    function renderSelectedList(): JSX.Element {
        return (
            <>
                {
                    selectedItems?.map(item => {
                        return (
                            <div style={{ display: "flex", background: "rgb(230, 230, 230)", alignItems: "center" }} key={item}>
                                <span style={{ fontSize: "1em", padding: "0px 0.2em" }}>{item}</span>
                                <div onClick={() => { remove(item) }} style={{ padding: "0px 0.5em", display: "flex", alignItems: "center", borderRadius: "2px", height: "100%", position: "relative" }} className="hoverable">
                                    <svg style={{ display: "inline-block", lineHeight: "1" }} height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ display: "flex", width: "100%", border: "1px solid #ced4da", borderRadius: "2px" }} >
                <div style={{ display: "flex", width: "95%", overflow: "hidden" }}>
                    {renderSelectedList()}
                </div>
                <div style={{ justifyContent: "flex-end", display: "flex", padding: "5px 10px" }} className="hoverable" onClick={() => { showSelect(!bShowSelect) }}>
                    <svg height="20" width="20" style={{ stroke: "currentcolor", }} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                </div>
            </div>
            <div hidden={!bShowSelect} style={{ cursor: "pointer", borderLeft: "1px solid #ced4da", borderRight: "1px solid #ced4da", borderBottom: "1px solid #ced4da" }}>
                {
                    inAvaliableItems.map(str => {
                        return <option className="multiselect-item" key={str} onClick={() => {
                            add(str);
                        }}>{str}</option>
                    })
                }
            </div>
        </div>
    )
}