import React from "react";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { ItemList } from "../components/ItemList";
import { ICategory } from "../interfaces/ICategory";
import IPickable from "../interfaces/IPickable";

export const HomePage: React.FunctionComponent = () => {
    const [categoriesList, setCategoriesList] = useState<IPickable<ICategory>[]>([]);
    const [currentCategories, setCurrentCategories] = useState<IPickable<ICategory>[]>([]);//pickedCategories
    const [currentListIndex, setCurrentIndex] = useState<number>(1);
    const [currentListIndexes, setListIndex] = useState<number[]>([]);
    let [searchParams, setSearchParams] = useSearchParams();
    const ITEMS_IN_PAGE = 1;
    const calculateListPages = (length: number) => {
        let mutable: number[] = [];
        for (let i = 0; i < length / ITEMS_IN_PAGE; i++) {
            mutable.push(i + 1);
        }
        setListIndex(mutable);
    }
    useEffect(() => {
        console.log('useEffect')
        setCategoriesList([
            {
                item: {
                    id: 1,
                    name: 'firstCategory',
                    requestId: 'firstRequest'
                },
                picked: false
            },
            {
                item: {
                    id: 2,
                    name: 'secondCategory',
                    requestId: 'secondRequest'
                },
                picked: false
            },
            {
                item: {
                    id: 3,
                    name: 'secondCategory1',
                    requestId: 'secondRequest1'
                },
                picked: false
            },
            {
                item: {
                    id: 4,
                    name: 'secondCategory3',
                    requestId: 'secondRequest3'
                },
                picked: false
            },
            {
                item: {
                    id: 5,
                    name: 'secondCategory4',
                    requestId: 'secondRequest4'
                },
                picked: false
            },
            {
                item: {
                    id: 6,
                    name: 'secondCategory5',
                    requestId: 'secondRequest5'
                },
                picked: false
            },
            {
                item: {
                    id: 7,
                    name: 'secondCategory6',
                    requestId: 'secondRequest6'
                },
                picked: false
            },
            {
                item: {
                    id: 8,
                    name: 'secondCategory7',
                    requestId: 'secondRequest7'
                },
                picked: false
            },
            {
                item: {
                    id: 9,
                    name: 'secondCategory9',
                    requestId: 'secondRequest9'
                },
                picked: false
            },
            {
                item: {
                    id: 10,
                    name: 'secondCategory10',
                    requestId: 'secondRequest10'
                },
                picked: false
            },
            {
                item: {
                    id: 11,
                    name: 'secondCategory11',
                    requestId: 'secondRequest11'
                },
                picked: false
            },
            {
                item: {
                    id: 12,
                    name: 'secondCategory12',
                    requestId: 'secondRequest12'
                },
                picked: false
            },
            {
                item: {
                    id: 13,
                    name: 'secondCategory12',
                    requestId: 'secondRequest12'
                },
                picked: false
            },
            {
                item: {
                    id: 14,
                    name: 'secondCategory13',
                    requestId: 'secondRequest13'
                },
                picked: false
            },
        ])
        calculateListPages(categoriesList.length);
    }, [categoriesList.length])//changes categories list -> calculate list pages
    return (
        <>
            <div className="container" style={{ marginTop: "10vh" }}>
                <div className="row" style={{ flexWrap: "nowrap" }}>
                    <ItemList
                        items={categoriesList.filter((item, index) => {
                            return index >= (currentListIndex - 1) * ITEMS_IN_PAGE && index < (currentListIndex) * ITEMS_IN_PAGE;
                        })}
                        onPickItem={
                            (mutable: IPickable<ICategory>[], item: IPickable<ICategory>) => {
                                setCurrentCategories(mutable)//HOW IT WORKS?WHYYYY, WHEN SETCATEGORIESlIST -> BUG, BUT THIS ONE... /// reason : updates state.......
                                let query: URLSearchParams = new URLSearchParams();
                                let prevQueries: string[] = searchParams.getAll('cat');
                                const shouldAdd = (): boolean => {
                                    if (prevQueries.length === 0) return true;
                                    let should: boolean = true;
                                    for (let i = 0; i < prevQueries.length; i++) {
                                        if (item.item.requestId === prevQueries[i]) {
                                            should = false;
                                        }
                                        else query.append('cat', prevQueries[i]);//и рыбку съесть и ....
                                    }
                                    return should;
                                }
                                if (shouldAdd()) query.append('cat', item.item.requestId);
                                setSearchParams(query);
                            }
                        }
                    >
                        <div style={{ display: 'flex', flexDirection: "row", padding: "10px", marginTop: "auto" }}>
                            {
                                currentListIndexes.map((item) => {
                                    return (
                                        <>
                                            <div
                                                style={{ padding: "5px 8px", cursor: "pointer", borderRadius: "3px", borderTop: "1px solid #ec407a", borderBottom: "1px solid #ec407a" }}
                                                className={item === currentListIndex ? "selected-list-page" : ""}
                                                key={item}
                                                onClick={() => setCurrentIndex(item)}>
                                                {item}
                                            </div>
                                        </>)
                                })
                            }
                        </div>
                    </ItemList>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", padding: "15px" }}>
                        <h1 className="text-center">Result</h1>
                        <div style={{ width: "100%", height: "100%", border: "1px solid gray" }}>
                            {/*response */}
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => { }} style={{width:"100%"}}>Get Banner</button>
            </div >
        </>
    )
}