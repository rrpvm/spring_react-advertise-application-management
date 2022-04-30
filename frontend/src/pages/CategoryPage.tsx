import { useState } from "react";
import { CategoryItemLayout } from "../components/CategoryItemLayout";
import { ShowItemComponent } from "../components/ShowItemComponent";
import { ShowListComponent } from "../components/ShowListComponent";
import { ICategory } from "../interfaces/ICategory";



export const CategoryPage: React.FC = () => {
    function getNamesFromCategoriesArray(categories: ICategory[]): string[] {//need to be cached/optimized
        let namesArray: string[] = [];
        categories.forEach(categories => {
            namesArray.push(categories.name);
        })
        return namesArray;
    }
    function handleCategoryClick(selectedCategoryName: string): void {
        categories.forEach(category => {
            if (category.name === selectedCategoryName) {
                setSelectedCategory(category);
            }
        })
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
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Category" floatingButtonName="categories" itemsName={getNamesFromCategoriesArray(categories)} callback={handleCategoryClick} activeItem={selectedCategory.name}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title="Create new category">
                        <CategoryItemLayout prop={selectedCategory} />
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );
};