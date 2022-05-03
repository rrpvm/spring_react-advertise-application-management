import React, { useState } from "react"
import { useLocation } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
const navigablePaths: Array<string> = [
    "/banners",
    "/categories",
    "/advertisement"
];
export const NavigationBar: React.FC = () => {
    let location = useLocation().pathname;
    const [activeLinkId, setActiveLink] = useState(location);
    return (
        <nav className="nav">
            <div className="nav-wrapper">
                <ul className="nav-list nav nav-tabs card-header-tabs">
                    {
                        navigablePaths.map(navPath => {
                            return (
                                <NavigationItem link={navPath} active={activeLinkId === navPath} key={navPath} onClickCallback={()=>{setActiveLink(navPath)}}>{navPath.substring(1,navPath.length)}</NavigationItem>
                            )
                        })
                    }                   
                </ul>
            </div>
        </nav>
    )
}
