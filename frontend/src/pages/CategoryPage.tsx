import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ShowListComponent } from "../components/ShowListComponent";
import { ICategory } from "../interfaces/ICategory";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import APP from "../API/APIRequests";

export const CategoryPage: React.FC = () => {
    const saveCategory = () =>{
        const responce = APP.saveCategory(jwt, searchParams, selectedCategory);
        responce?.then(() => {
            updateCategoriesData();
        }).catch((exception: AxiosError) => {
            switch (exception.response?.status) {
                case 409: {
                    console.log('category name | request id already exist!');
                    break;
                }
                case 402: {
                    console.log('category name | request id cannot be empty');
                    break;
                }
                default: {
                    console.log(exception.response?.status);
                }
            }
        });
    }
    const deleteCategory = () =>{
        const responce = APP.deleteCategory(jwt, selectedCategory?.id);
        responce?.then(() => {
            updateCategoriesData();
        }).catch((exception: AxiosError) => {
            switch (exception.response?.status) {
                default: {
                    console.log(exception.response?.status);
                }
            }
        });       
    }
    const handleSearchEvent = (e: string): void => {
        setDisplayedCategories(allCategories.filter(category => {
            return category.name.toLowerCase().indexOf(e) !== -1 ;
        }))
    }
    const handleSelectCategory = (categorySelected: ICategory): void => {
        if (categorySelected.id !== -1) {
            setSearchParams({ ['createNew']: 'false' });
        }
        else setSearchParams({ ['createNew']: 'true' });
        setSelectedCategory(categorySelected);
    }
    const categoryTemplateFactory = (): ICategory => {
        return {
            id: -1,
            name : 'new category',
            requestId : 'new request id'
        }
    }
    const handleCreateCategory = (): void => {
        for (let arrIdx in allCategories) {
            if (allCategories[arrIdx].id === -1) return;
        }
        let mutableCategories = [...allCategories, categoryTemplateFactory()];
        setAllCategories(mutableCategories);
        setDisplayedCategories(mutableCategories);
    }
    const updateCategoriesData = () => {
        const categoryPromise = APP.getCategories(jwt);
        categoryPromise.then(data => {
            try {
                setAllCategories(data.data);
                setDisplayedCategories(data.data);
                setSelectedCategory(data.data[0]);
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
    }
    useEffect(()=>{
        updateCategoriesData();
    },[]);
    const [allCategories, setAllCategories] = useState<ICategory[]>([]);
    const [displayedCategories, setDisplayedCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const [searchParams, setSearchParams] = useSearchParams();
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);//authorization header
    return (
        <div className="container" >
            <div className="row" style={{ flexWrap: "nowrap", marginTop: "5vh" }}>
                <div className="col col-lg-3" style={{ minHeight: '768px' }}>
                    <ShowListComponent
                        title="Categories"
                        onSearchNameCallback={handleSearchEvent}
                        itemsList={displayedCategories}
                        onItemClickCallback={handleSelectCategory}
                    >
                        <button className="btn btn-primary" type="button"
                            style={{ backgroundColor: "#f06292", borderColor: "#f06292", marginTop: "auto" }}
                            onClick={handleCreateCategory}>
                            Create new category
                        </button>
                    </ShowListComponent>
                </div>
                <div className="col col-lg-9" style={{ minHeight: '768px' }}>
                    <div className="card" style={{ width: "100%", height: '100%' }}>
                        <h3 className="text-center">Create new category</h3>
                        {
                            selectedCategory !== undefined ? (
                                <ul className="list-group list-group-flush " style={{ display: 'flex', flexDirection: "column", maxWidth: '100%', overflow: "hidden" }} key={selectedCategory.id}>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Name</div>
                                        <input className="form-control" value={selectedCategory.name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            let mutableCategory = Object.assign({}, selectedCategory);  //{...selectedBanner};
                                            mutableCategory.name = e.target.value;
                                            setSelectedCategory(mutableCategory);
                                        }}></input>
                                    </li>
                                    <li className="list-group-item" style={{ display: "flex" }}>
                                        <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Request id</div>
                                        <input className="form-control" value={selectedCategory.requestId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            let mutableCategory = Object.assign({}, selectedCategory);  //{...selectedBanner};
                                            mutableCategory.requestId = e.target.value;
                                            setSelectedCategory(mutableCategory);
                                        }}></input>
                                    </li>                                   
                                </ul>
                            ) : <></>
                        }
                        <div className="alert alert-danger" style={{width:"100%",top:"85%",position:"absolute",display:'none'}}></div>
                        <div style={{ display: "flex", marginTop: "auto", width: "100%", justifyContent: "space-between", alignSelf: "flex-end" }}>
                            <button type="button" className="btn btn-primary" onClick={saveCategory}>save</button>
                            <button type="button" className="btn btn-primary" onClick={deleteCategory}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};