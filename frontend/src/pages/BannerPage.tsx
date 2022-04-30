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
    function insertBannerItemLayout(): JSX.Element {
        let mayProp: IBanner = banners.filter(banner => { return banner.name === selectedBanner })[0];//only 1 result cuz possible only 1 select + unique name
        let insertElement: JSX.Element = <></>;
        if (mayProp !== null && mayProp !== undefined) {
            insertElement = <BannerItemLayout prop={mayProp}></BannerItemLayout>
        }
        else {
            //создать новый баннер -> будет поле для заполнения
        }
        return insertElement;
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

    const [selectedBanner, setSelectedBanner] = useState(banners[0].name);
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Banners" floatingButtonName="banner" itemsName={getNamesFromBannersArray(banners)} callback={setSelectedBanner} activeItem={selectedBanner}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title="Create new banner">
                        {insertBannerItemLayout()}
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );
};