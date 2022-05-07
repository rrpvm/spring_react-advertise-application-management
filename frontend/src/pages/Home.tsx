import React from "react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { ItemList } from "../components/ItemList";
import { ALERTTIME, ITEMS_IN_PAGE, PAGES_BUTTON_LENGTH } from "../constants";
import { ICategory } from "../interfaces/ICategory";
import IPickable from "../interfaces/IPickable";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import API from "../API/APIRequests";
import { AxiosError } from "axios";

export const HomePage: React.FunctionComponent = () => {
    const [categoriesList, setCategoriesList] = useState<IPickable<ICategory>[]>([]);
    const [currentCategories, setCurrentCategories] = useState<IPickable<ICategory>[]>([]);//pickedCategories
    const [currentListIndex, setCurrentIndex] = useState<number>(1);
    const [currentListIndexes, setListIndex] = useState<number[]>([]);
    const [lastResult, setResult] = useState<string>('');
    const [currentMessage, setCurrentMessage] = useState<string>(''); /* second - isError */
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);
    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();

    const calculateListPages = (length: number) => {
        let mutable: number[] = [];
        for (let i = 0; i < length / ITEMS_IN_PAGE; i++) {
            mutable.push(i + 1);
        }
        setListIndex(mutable);
    }
    const createPickableFromCategory = (categories: ICategory[]): IPickable<ICategory>[] => {
        let mutable: IPickable<ICategory>[] = [];
        categories.forEach((element) => mutable.push({ item: element, picked: false }));
        return mutable;
    }
    const getBannerText = () => {
        const response = API.getBannerByCategories(location);
        response.then((responseState) => {
            setResult(responseState.data);
            if (responseState.status === 204) {
                setCurrentMessage("no banners with selected category to show");
                setTimeout(() => {
                    setCurrentMessage('');
                }, ALERTTIME);
            }
        }).catch((error: AxiosError) => {
            //...
            console.log(error);
        });
    }
    useEffect(() => {
        setSearchParams({});
        const categoryPromise = API.getCategories(jwt);
        categoryPromise.then(data => {
            try {
                setCategoriesList(createPickableFromCategory(data.data));
                calculateListPages(data.data.length);
            }
            catch (e) {
                console.log('categories data is null');
            }
        }).catch((reason: AxiosError) => console.log(reason));
    }, [categoriesList.length, jwt])//changes categories list -> calculate list pages
    return (
        <>
            <div
                className={
                    currentMessage.length !== 0 ? "alert alert-warning show-alert" : "alert  hidden-alert"
                }
                style={{ width: "50%", top: "2%",right:"0%", position: "absolute" }}>
                {currentMessage}
            </div>
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
                                currentListIndexes.filter((elememt) => {
                                    let isInSet = false;
                                    if (PAGES_BUTTON_LENGTH / 2 > currentListIndex) {
                                        isInSet = Math.abs(elememt - currentListIndex) < PAGES_BUTTON_LENGTH;
                                    }
                                    else if (PAGES_BUTTON_LENGTH / 2 > currentListIndexes.length - currentListIndex) {
                                        isInSet = Math.abs(elememt - currentListIndex) < PAGES_BUTTON_LENGTH - (currentListIndexes.length - currentListIndex);
                                    }
                                    else {
                                        isInSet = (elememt - currentListIndex <= PAGES_BUTTON_LENGTH / 2 && elememt - currentListIndex > -((PAGES_BUTTON_LENGTH - 1) / 2));
                                    }
                                    return isInSet;
                                }).map((item) => {
                                    return (
                                        <>
                                            <div
                                                style={{ padding: "12px 8px", cursor: "pointer", borderTop: "1px solid #ec407a", borderBottom: "1px solid #ec407a", width: "100%", textAlign: "center" }}
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
                            {lastResult}
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={getBannerText} style={{ width: "100%" }}>Get Banner</button>
            </div >
        </>
    )
}