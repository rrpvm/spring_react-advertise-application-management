import React from "react";

type ListComponentProps = {
    title: string;
}
export const ShowItemComponent: React.FC<React.PropsWithChildren<ListComponentProps>> = ({ title, children }) => {
    return (
        <div className="card" style={{ width: "100%", height: '100%' }}>
            <h3 className="text-center">{title}</h3>

            <ul className="list-group list-group-flush " style={{ display: 'flex', flexDirection: "column", maxWidth: '100%', overflow: "hidden" }}>
                {children}
            </ul>
            <div style={{ display: "flex", marginTop: "auto", width: "100%", justifyContent: "space-between", alignSelf: "flex-end" }}>
                <button type="button" className="btn btn-primary">save</button>
                <button type="button" className="btn btn-primary">delete</button>

            </div>

        </div>
    );
};