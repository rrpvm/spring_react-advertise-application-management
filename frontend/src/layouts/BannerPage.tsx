import { BannerItemLayout } from "../components/BannerItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { IBanner } from "../interfaces/IBanner";


function getNamesFromBannersArray(banners: IBanner[]): string[] {//need to be cached/optimized
    let namesArray: string[] = [];
    banners.forEach(banner => {
        namesArray.push(banner.name);
    })
    return namesArray;
}
export const BannerPage: React.FC = () => {
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
            price: 9.99,
            textField: '',
            category: [],
        },
    ];
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3" style={{minHeight:'768px'}}>
                    <ShowListComponent title="Banners" itemsName={getNamesFromBannersArray(banners)}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{minHeight:'768px'}}>
                    <ShowItemComponent title="Create new banner">
                        <BannerItemLayout></BannerItemLayout>
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );
};