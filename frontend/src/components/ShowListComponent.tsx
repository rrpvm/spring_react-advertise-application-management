type ListComponentProps = {
    title: string;
    itemsName: Array<string>;
    floatingButtonName: string,
    activeItem: string,
    callback :CallableFunction,
}
export const ShowListComponent: React.FC<ListComponentProps> = ({ title, itemsName,floatingButtonName,activeItem,callback }) => {
    return (
        <div className="card" style={{ width: "100%", margin: "1.5rem",height:'100%' }}>
            <h3 className="text-center">{title}</h3>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <ul className="list-group list-group-flush">
                {
                    itemsName.map((item) => {
                        return (<li className={activeItem === item ? "list-group-item active" : "list-group-item"} style={{cursor:"pointer",}} key={item} onClick={()=>{callback(item)}}>{item}</li>);
                    })
                }
            </ul>
            <button className="btn btn-primary" type="submit" style={{backgroundColor:"#f06292",borderColor:"#f06292", marginTop:"auto"}}>Create new {floatingButtonName}</button>
        </div>
    );
};