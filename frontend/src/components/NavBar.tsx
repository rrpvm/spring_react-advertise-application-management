import React from "react";

export const NavBar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper  pink lighten-2">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="/">Banners</a></li>
                    <li><a href="/">Categories</a></li>                   
                </ul>
            </div>
        </nav>
    );
}