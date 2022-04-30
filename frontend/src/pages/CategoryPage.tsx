import { useState } from "react";
import { CategoryItemLayout } from "../components/CategoryItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { ICategory } from "../interfaces/ICategory";



export const CategoryPage: React.FC = () => {
    function getNamesFromCategoriesArray(banners: ICategory[]): string[] {//need to be cached/optimized
        let namesArray: string[] = [];
        banners.forEach(banner => {
            namesArray.push(banner.name);
        })
        return namesArray;
    }
    function insertCategoryItemLayout(): JSX.Element {
        let mayProp: ICategory = categories.filter(category => { return category.name === selectedCategory })[0];//only 1 result cuz possible only 1 select + unique name
        /*let insertElement: JSX.Element = <></>;
        if (mayProp !== null && mayProp !== undefined) {
            insertElement = <BannerItemLayout prop={mayProp}></BannerItemLayout>
        }
        else {
            //создать новый баннер -> будет поле для заполнения
        }*/
        return (mayProp !== null && mayProp !== undefined) ? <CategoryItemLayout prop={mayProp}></CategoryItemLayout> : <></>;
    }
    const categories: Array<ICategory> = [
        {
            id: 0,
            name: 'first category',
            requestId: "Music",
        },
        {
            id: 1,
            name: 'second cateogry',
            requestId: "Adv",
        },
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Category" floatingButtonName="categories" itemsName={getNamesFromCategoriesArray(categories)} callback={setSelectedCategory} activeItem={selectedCategory}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title="Create new category">
                        {insertCategoryItemLayout()}
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );
};