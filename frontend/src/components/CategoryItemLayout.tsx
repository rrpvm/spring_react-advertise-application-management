import { ICategory } from "../interfaces/ICategory";

type CategoryItemLayoutProp = {
    prop : ICategory,
}
export const CategoryItemLayout: React.FC<CategoryItemLayoutProp> = ({prop}) => {
    return (
        <>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}></div>
                <input className="form-control" value={prop.name}></input>
            </li>
            
        </>
    );
};