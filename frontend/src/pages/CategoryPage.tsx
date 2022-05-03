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
    function handleSearchEvent(e: string) : void {
        //axios categories;
        filterCategories(categories.filter(category => {
            return category.name.toLowerCase().indexOf(e) !== -1
        }))
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
    const [avaliableCategories, filterCategories] = useState(categories);
  /*  return (
        <div className="container">
           <div className="row" style={{ flexWrap: "nowrap",marginTop:"5vh"  }}>
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent title="Category" floatingButtonName="categories" itemsName={getNamesFromCategoriesArray(avaliableCategories)} callback={handleCategoryClick} onProcessInput={handleSearchEvent} activeItem={selectedCategory.name}></ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <ShowItemComponent title="Create new category">
                        <CategoryItemLayout prop={selectedCategory} />
                    </ShowItemComponent>
                </div>
            </div>
        </div>
    );*/
    return(<>
    </>)
};