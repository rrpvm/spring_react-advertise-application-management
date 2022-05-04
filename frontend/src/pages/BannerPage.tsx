import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppAPI from "../API/APIRequests";
import { BannerItemLayout } from "../components/BannerItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";
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
    let handleSelectBanner = (bannerSelectedName: string): void => {

        try {
            let banner = displayedBanners.filter(banner => banner.name === bannerSelectedName)[0];
            //  setSelectedBanner(banner)//т.к уникальные имена -> только 1 элемент в массиве           
        }
        catch (nullPointerException) {

        }
    }
    /*HOOKS */
    const [allBanners, setAllBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> axios
    const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([]);//for first time -> useEffect -> copy from allBanners
    const [selectedBannerId, setSelectedBannerId] = useState<number>(0);
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);//authorization header
    useEffect(() => {
        const promise = AppAPI.getBanners(jwt);
        promise.then(data => {
            console.log(data);
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                console.log("Unauthorized!");
            }
            else console.log(reason.message);
        });
    }, []);//2nd argumnet == [] -> only when mount
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
                                onClick={() => {  }}>
                                Create new banner
                            </button>
                        </ShowListComponent>
                    }
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    {/*<ShowItemComponent title={selectedBanner.name}>
                        <BannerItemLayout prop={selectedBanner} />
                    </ShowItemComponent>*/
                    }
                </div>
            </div>
        </div >
    );
};