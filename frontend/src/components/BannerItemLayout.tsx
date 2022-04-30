
export const BannerItemLayout: React.FC = () => {
    return (
        <>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center", }}>Name</div>
                <input className="form-control"></input>
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center",  }}>Price</div>
                <input className="form-control"></input>
            </li>
            <li className="list-group-item" style={{ display: "flex" }}>
                <div style={{ width: "6rem", display: "flex", alignItems: "center", textAlign: "center",  }}>Category</div>
                <input className="form-control"></input>
            </li>
        </>
    );
};