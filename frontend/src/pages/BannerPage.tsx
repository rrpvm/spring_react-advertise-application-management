import { useState } from "react";
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
            }
        })
    }
    const banners: Array<IBanner> = [
        {
            id: 0,
            name: 'first banner',
            price: 9.99,
            textField: '',
            category: [],
        },
        {
            id: 1,
            name: 'second banner',
            price: 19.99,
            textField: '',
            category: [],
        },
    ];
    const [selectedBanner, setSelectedBanner] = useState(banners[0]);
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Banners" floatingButtonName="banner" itemsName={getNamesFromBannersArray(banners)} callback={handleBannerClick} activeItem={selectedBanner.name}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title={selectedBanner.name}>
                        <BannerItemLayout prop={selectedBanner} />
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );
};