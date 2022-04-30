import React from "react";
import { Link } from "react-router-dom";

type navItemProp = {
    active?:boolean;
    link:string;
    onClickCallback?:React.MouseEventHandler;
}
export const NavigationItem: React.FC<React.PropsWithChildren<navItemProp>> = ({ active,link,onClickCallback,children }) => {
    return (
        <li className="nav-item">
            <Link to={link}  className={active ? 'nav-link active' : 'nav-link '} onClick={onClickCallback}>{children}</Link>
        </li>
    );
}