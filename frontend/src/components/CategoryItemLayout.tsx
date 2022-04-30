import { ICategory } from "../interfaces/ICategory";

type CategoryItemLayoutProp = {
    prop : ICategory,
}
export const CategoryItemLayout: React.FC<CategoryItemLayoutProp> = ({prop}) => {
    return (
        <>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Name</div>
                <input className="form-control" value={prop.name} onChange={()=>{}}></input>
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Request ID</div>
                <input className="form-control" value={prop.requestId} onChange={()=>{}}></input>
            </li>
        </>
    );
};