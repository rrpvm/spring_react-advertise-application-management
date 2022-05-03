import { useEffect, useRef, useState } from "react";
import AppAPI from "../API/APIRequests";
import { BannerItemLayout } from "../components/BannerItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";



export const BannerPage: React.FC = () => {
    /*
    CONST MODEL
    */
    const templateBanner: IBanner = {
        id: -1,
        name: 'new banner',
        textField: '',
        price: 0.00,
        linkedCategories: [],
    }
    /**
     * Utilis
     **/
    let getArrayOfNames = (param: IBanner[]): Array<string> => {
        let namesArray: string[] = [];
        param.forEach(banner => {
            namesArray.push(banner.name);
        })
        return namesArray;
    }
    let addBanner = (newBanner: IBanner) => {
        setAllBanners(oldBanners => [...oldBanners, newBanner]);
        console.log(allBanners);
    }
    /*HANDLERS */
    let handleSearchEvent = (e: string): void => {
        setDisplayedBanners(allBanners.filter(banner => {
            return banner.name.toLowerCase().indexOf(e) !== -1 //if 0 or bigger -> exist
        }))
    }
    let handleSelectBanner = (bannerSelectedName: string): void => {
        try {
            let banner = displayedBanners.filter(banner => banner.name === bannerSelectedName)[0];
            setSelectedBanner(banner)//т.к уникальные имена -> только 1 элемент в массиве
            console.log(banner);
            console.log(selectedBanner);
        }
        catch (nullPointerException) {

        }
    }
    let handleBannerCreateClick = (): void => {
        /*this methods will throws exception, but its the fastet method */
        try {
            const existedBanner = allBanners.filter(uniqueBanner => uniqueBanner.id === templateBanner.id)[0];
            setSelectedBanner(existedBanner);
        }
        catch (nullPointerException) { //-> create
            addBanner(templateBanner);
            setSelectedBanner(templateBanner);
        }
    }
    /*HOOKS */
    const [allBanners, setAllBanners] = useState<IBanner[]>([templateBanner]);//for first time -> useEffect -> axios
    const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([templateBanner]);//for first time -> useEffect -> copy from allBanners
    const [selectedBanner, setSelectedBanner] = useState<IBanner>(templateBanner);
    useEffect(() => {
        const promise = AppAPI.getBanners();
        let data: IBanner[] = [];
        promise.then(_data => {
            data = _data.data;
        }).finally(() => {
            setAllBanners(data);
            setDisplayedBanners(data);
        })
    }, []);//2nd argumnet == [] -> only when mount
   /* useEffect(() => {
        console.log(selectedBanner);
    }, [selectedBanner])*/
    return (
        <div className="container" >
            <div className="row" style={{ flexWrap: "nowrap", marginTop: "5vh" }}>
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Banners" floatingButtonName="banner" itemsName={getArrayOfNames(displayedBanners)} callback={handleSelectBanner} activeItem={selectedBanner?.name} onProcessInput={handleSearchEvent} createItemCallback={handleBannerCreateClick}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title={selectedBanner?.name}>
                        <BannerItemLayout prop={selectedBanner} />
                    </ShowItemComponent>

                </div>
            </div>
        </div>
    );
};