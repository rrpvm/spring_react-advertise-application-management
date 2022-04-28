import React from "react";

export const Banners: React.FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s3 side-left-nav z-depth-1">
                    <h3 className="center-align">Banners</h3>
                    <div className="search-wrapper">
                        <label htmlFor="search"><i className="material-icons">search</i>    </label>
                        <input id="search" className="input-none-border"/>                                 
                    </div>
                    
                </div>
                <div className="col s9">world</div>
            </div>
        </div>
    );
}