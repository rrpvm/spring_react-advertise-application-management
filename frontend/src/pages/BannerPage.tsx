import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";
import { ShowListComponent } from "../components/ShowListComponent";
import { MultiSelector } from "../components/MultiSelector";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import API from "../API/APIRequests";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { ALERTTIME } from "../constants";
import { deleteBannerResponseException, handleBasicApiStatusCodeResponce, saveBannerResponceExceptions } from "../API/ResponseExceptionHandler";

const bannerTemplateFactory = (): IBanner => {
    return {
        id: -1,
        price: 0,
        textField: ' ',
        name: 'new banner',
        linkedCategories: [],
    }
}
type pair<T, S> = {
    first: T
    second: S;
}
export const BannerPage: React.FC = (): JSX.Element => {
    /*HOOKS */
    const [allBanners, setAllBanners] = useState<IBanner[]>([]);
    const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([]);
    const [allCategories, setCategories] = useState<ICategory[]>([]);
    const [selectedBanner, setSelectedBanner] = useState<IBanner>();
    const [currentMessage, setCurrentMessage] = useState<pair<string, boolean>>({ first: "", second: false }); /* second - isError */
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);

    /*<----------------NETWORK FUNCTIONS------------------>*/
    const saveBanner = (): void => { //2 params : "delete or save"
        let mutableSearchParam = new URLSearchParams();
        if (selectedBanner?.id !== -1) {
            mutableSearchParam.append('createNew', 'false');
        }
        else mutableSearchParam.append('createNew', 'false');
        const responce = API.saveBanner(jwt, mutableSearchParam, selectedBanner);
        responce?.then(() => {
            updateBannersData(() => showMessage('save successed!', false));
        }).catch((exception: AxiosError) => showMessage(saveBannerResponceExceptions(exception), true));
    };
    const deleteBanner = (): void => {
        const responce = API.deleteBanner(jwt, selectedBanner?.id);
        responce?.then(() => {
            updateBannersData(() => showMessage('deleted success!', false));
        }).catch((exception: AxiosError) => showMessage(deleteBannerResponseException(exception), true));
    }
    const updateBannersData = (callbackOnSuccess: CallableFunction) => {
        const bannerPromise = API.getBanners(jwt);
        const categoryPromise = API.getCategories(jwt);
        bannerPromise.then(data => {
            callbackOnSuccess();//must be independent, if banners are updated -> success ( you can show display message)
            setAllBanners(data.data);
            setDisplayedBanners(data.data);
            try {
                setSelectedBanner(data.data[0]);
            }
            catch (e) {
                console.log('banners data is null');
            }
        }).catch((reason: AxiosError) => showMessage(handleBasicApiStatusCodeResponce(reason), true));
        categoryPromise.then(data => {
            try {
                setCategories(data.data);
            }
            catch (e) {
                console.log('categories data is null');
            }
        }).catch((reason: AxiosError) => showMessage(handleBasicApiStatusCodeResponce(reason), true));
    }
    /*<--------------------------END OF NETWORK FUNCTIONS--------------------->*/

    /*<--------------------------NON-SIDE EFFECT(?) FUNCTIONS--------------------->*/
    const getCategoryNames = (arr: ICategory[] | undefined): string[] => {
        if (arr === undefined) return [];
        let array: string[] = []; arr.forEach(element => array.push(element.name));
        return array;
    };
    const showMessage = (msg: string, isError: boolean) => {//side effect but it can be here
        setCurrentMessage({ first: msg, second: isError });
        setTimeout(() => {
            setCurrentMessage({ first: '', second: false });
        }, ALERTTIME);
    }
    /*<--------------------------THE END OF NON-SIDE EFFECT(?) FUNCTIONS--------------------->*/

    /*<--------------------------SIDE EFFECT(?) FUNCTIONS--------------------->*/
    const handleCreateBanner = (): void => {
        for (let arrIdx in allBanners) {
            if (allBanners[arrIdx].id === -1) return;
        }
        let mutableBanners = [...allBanners, bannerTemplateFactory()];
        setAllBanners(mutableBanners);
        setDisplayedBanners(mutableBanners);
    }
    const handleSelectBanner = (bannerSelected: IBanner): void => {
        setSelectedBanner(bannerSelected);
    }
    const handleSearchEvent = (e: string): void => {
        setDisplayedBanners(allBanners.filter(banner => {
            return banner.name.toLowerCase().indexOf(e) !== -1 //if 0 or bigger -> exist
        }))
    }
    useEffect(() => {
        updateBannersData(() => console.log('update data successed'));
    }, [jwt]);//didMount()
    /*<--------------------------END OF SIDE EFFECT(?) FUNCTIONS--------------------->*/
    return (
        <div className="container" >
            <div className="row" style={{ flexWrap: "nowrap", marginTop: "5vh" }}>
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent
                        title="Banners"
                        onSearchNameCallback={handleSearchEvent}
                        itemsList={displayedBanners}
                        onItemClickCallback={handleSelectBanner}
                    >
                        <button className="btn btn-primary" type="button"
                            style={{ backgroundColor: "#f06292", borderColor: "#f06292", marginTop: "auto" }}
                            onClick={handleCreateBanner}>
                            Create new banner
                        </button>
                    </ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <div className="card" style={{ width: "100%", height: '100%', position: "relative" }}>
                        <h3 className="text-center">{"Create a new banner"}</h3>
                        {
                            selectedBanner !== undefined ? (
                                <ul className="list-group list-group-flush " style={{ display: 'flex', flexDirection: "column", maxWidth: '100%', overflow: "hidden" }} key={selectedBanner.id}>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Name</div>
                                        <input className="form-control" value={selectedBanner.name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            let mutableBanner = Object.assign({}, selectedBanner);  //{...selectedBanner};
                                            mutableBanner.name = e.target.value;
                                            setSelectedBanner(mutableBanner);
                                        }}></input>
                                    </li>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Price</div>
                                        <input className="form-control" value={selectedBanner.price} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            let mutableBanner = Object.assign({}, selectedBanner);  //{...selectedBanner};
                                            try {
                                                e.target.value.length === 0 ? mutableBanner.price = 0 : (mutableBanner.price = parseFloat(e.target.value));
                                            }
                                            catch (e) {
                                                console.log(e);
                                            }
                                            setSelectedBanner(mutableBanner);
                                        }}></input>
                                    </li>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <MultiSelector
                                            uniqueStrings={getCategoryNames(allCategories)}
                                            alreadySelected={getCategoryNames(selectedBanner.linkedCategories)}
                                            onItemClick={(selected: string[]) => {
                                                let arr: ICategory[] = [];
                                                for (let item in allCategories) {
                                                    if (selected.indexOf(allCategories[item].name) !== -1) {
                                                        arr.push(allCategories[item]);
                                                    }
                                                }
                                                let mutableBanner = Object.assign({}, selectedBanner);  //{...selectedBanner};
                                                mutableBanner.linkedCategories = arr;
                                                setSelectedBanner(mutableBanner);
                                            }}

                                        ></MultiSelector>
                                    </li>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Text</div>
                                        <textarea className="form-control" value={selectedBanner.textField} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            let mutableBanner = Object.assign({}, selectedBanner);  //{...selectedBanner};
                                            mutableBanner.textField = e.target.value;
                                            setSelectedBanner(mutableBanner);
                                        }}></textarea>
                                    </li>
                                </ul>
                            ) : <></>
                        }
                        <div
                            className={
                                currentMessage.first.length !== 0 ? currentMessage.second === true ? "alert alert-danger show-alert" : "alert alert-success show-alert" : "alert  hidden-alert"
                            }
                            style={{ width: "100%", top: "85%", position: "absolute" }}>
                            {currentMessage.first}
                        </div>
                        <div style={{ display: "flex", marginTop: "auto", width: "100%", justifyContent: "space-between", alignSelf: "flex-end" }}>
                            <button type="button" className="btn btn-primary" onClick={saveBanner}>save</button>
                            <button type="button" className="btn btn-primary" onClick={deleteBanner}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
