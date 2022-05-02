import { useEffect, useRef, useState } from "react";
import AppAPI from "../API/APIRequests";
import { BannerItemLayout } from "../components/BannerItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";



export const BannerPage: React.FC = () => {
    function getNamesFromBannersArray(banners: IBanner[]): string[] {//need to be cached/optimized
        let namesArray: string[] = [];
        banners.forEach(banner => {
            namesArray.push(banner.name);
        })
        return namesArray;
    }
    function handleBannerClick(selectedBannerName: string): void { // получаем в параметре выбранное имя 
        banners.forEach(banner => {
            if (banner.name === selectedBannerName) {
                setSelectedBanner(banner); // находим и устанавливаем выбранный баннер по имени
                /*
                reset multiselector
                3 ways :
                1)chain of callbacks ->
                2)event listener(by events)  
                3)useEffect           ( my choice 4Head)
                */

            }
        })
    }
    function handleSearchEvent(e: string): void {
        //axios banners;
        filterBanners(banners.filter(banner => {
            return banner.name.toLowerCase().indexOf(e) !== -1
        }))
    }
    const banners: Array<IBanner> = [
      /*  {
            id: 0,
            name: 'first banner',
            price: 9.99,
            textField: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            categories: ['music', 'shopping', 'service'],
        },
        {
            id: 1,
            name: 'second banner',
            price: 19.99,
            textField: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            categories: [],
        },*/
    ];
    useEffect(()=>{
        console.log('BannerPage did mount()');
        //bannerContainer.current = AppAPI.getBanners();
       // console.log(bannerContainer.current);
    }, []);
   
    const [selectedBanner, setSelectedBanner] = useState<IBanner>({id:0,textField:"",categories:[],name:'Create new category',price:0});
    const [avaliableBanners, filterBanners] = useState<IBanner[]>(banners);
   // const bannerContainer = useRef<IBanner[]>(banners);
    return (
        <div className="container">
            <div className="row" style={{ flexWrap: "nowrap" }}>
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Banners" floatingButtonName="banner" itemsName={getNamesFromBannersArray(avaliableBanners)} callback={handleBannerClick} activeItem={selectedBanner.name} onProcessInput={handleSearchEvent}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px', margin: "1.5rem" }}>
                    <ShowItemComponent title={selectedBanner.name}>
                        <BannerItemLayout prop={selectedBanner} />                    
                    </ShowItemComponent>

                </div>
            </div>
        </div>
    );
};