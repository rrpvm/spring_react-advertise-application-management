import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppAPI from "../API/APIRequests";
import { BannerItemLayout } from "../components/BannerItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";
import { ICategory } from "../interfaces/ICategory";
import { jwtState } from "../store/reducers/jwtTokenReducer";



export const BannerPage: React.FC = () => {

    /**
     * Utilis
     **/
    /*let addBanner = (newBanner: IBanner) => {
        setAllBanners(oldBanners => [...oldBanners, newBanner]);
        console.log(allBanners);
    }*/
    /*HANDLERS */
    let handleSearchEvent = (e: string): void => {
        setDisplayedBanners(allBanners.filter(banner => {
            return banner.name.toLowerCase().indexOf(e) !== -1 //if 0 or bigger -> exist
        }))
    }
    let handleSelectBanner = (bannerSelectedName: IBanner): void => {
        setSelectedBannerId(bannerSelectedName.id);
    }
    let saveBanner = () =>{
        AppAPI.saveBanner(jwt,displayedBanners.filter(banner => banner.id === selectedBannerId)[0]);
    }
    /*HOOKS */
    const [allBanners, setAllBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> axios
    const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> copy from allBanners
    const [allCategories, setCategories] = useState<ICategory[]>([]);//from storage(will) todo:
    const [selectedBannerId, setSelectedBannerId] = useState<number>(-1);
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);//authorization header
    useEffect(() => {
        const bannerPromise = AppAPI.getBanners(jwt);
        bannerPromise.then(data => {
            setAllBanners(data.data);
            setDisplayedBanners(data.data);
            try {
                setSelectedBannerId(data.data[0]?.id);
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
                    {
                        <ShowListComponent
                            title="Banners"
                            onSearchNameCallback={handleSearchEvent}
                            itemsList={displayedBanners}
                            activeItemId={selectedBannerId}
                            onItemClickCallback={handleSelectBanner}
                        >
                            <button className="btn btn-primary" type="button"
                                style={{ backgroundColor: "#f06292", borderColor: "#f06292", marginTop: "auto" }}
                                onClick={() => { }}>
                                Create new banner
                            </button>
                        </ShowListComponent>
                    }
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    {
                        <ShowItemComponent title={"Create new banner"} onSaveButton={saveBanner}>
                            {
                                <BannerItemLayout
                                    editable_banner={displayedBanners.filter(banner => banner.id === selectedBannerId)[0]}
                                    allCategories={allCategories}
                                ></BannerItemLayout>
                            }
                        </ShowItemComponent>
                    }
                </div>
            </div>
        </div >
    );
};