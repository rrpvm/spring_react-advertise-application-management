import AppAPI from "../API/APIRequests";
import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import { MultiSelector } from "../components/MultiSelector";

export const BannerPage: React.FC = (): JSX.Element => {
    const handleSearchEvent = (e: string): void => {

        setDisplayedBanners(allBanners.filter(banner => {
            return banner.name.toLowerCase().indexOf(e) !== -1 //if 0 or bigger -> exist
        }))
    }
    const handleSelectBanner = (bannerSelected: IBanner): void => {
        setSelectedBanner(bannerSelected);
    }
    const saveBanner = () => {
        AppAPI.saveBanner(jwt, selectedBanner);
    }
    const getCategoryNames = (arr: ICategory[] | undefined): string[] => {
        if (arr === undefined) return [];
        let array: string[] = [];
        arr.forEach(element => array.push(element.name));
        return array;
    }
    /*HOOKS */
    const [allBanners, setAllBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> axios
    const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> copy from allBanners
    const [allCategories, setCategories] = useState<ICategory[]>([]);//from storage(will) todo:
    const [selectedBanner, setSelectedBanner] = useState<IBanner>();
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);//authorization header
    useEffect(() => {
        const bannerPromise = AppAPI.getBanners(jwt);
        bannerPromise.then(data => {
            setAllBanners(data.data);
            setDisplayedBanners(data.data);
            try {
                setSelectedBanner(data.data[0]);
            }
            catch (e) {
                console.log(e);
            }
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                console.log("Unauthorized!");
            }
            else console.log(reason.message);
        });
        const categoryPromise = AppAPI.getCategories(jwt);
        categoryPromise.then(data => {
            try {
                setCategories(data.data);
            }
            catch (e) {
                console.log(e);
            }
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                console.log("Unauthorized!");
            }
            else console.log(reason.message);
        });


    }, [jwt]);//didMount()
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
                            onClick={() => { }}>
                            Create new banner
                        </button>
                    </ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <div className="card" style={{ width: "100%", height: '100%' }}>
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
                                                mutableBanner.price = parseFloat(e.target.value);
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
                        <div style={{ display: "flex", marginTop: "auto", width: "100%", justifyContent: "space-between", alignSelf: "flex-end" }}>
                            <button type="button" className="btn btn-primary" onClick={saveBanner}>save</button>
                            <button type="button" className="btn btn-primary">delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}
