import React from "react";
import { CustomInput } from "../components/CustomInput";

export const Categories: React.FC = () => {
    return (
        <div className="row">
            <div className="col s2 side-left-nav z-depth-1">
                <h3 className="center-align">Categories</h3>
                <div className="search-wrapper">
                    <label htmlFor="search"><i className="material-icons">search</i>    </label>
                    <input id="search" className="input-none-border" />
                </div>
                <a className="waves-effect pink lighten-2 btn-large floating-button" href="/">Create new category</a>
            </div>
            <div className="col s9 edit-component z-depth-2" >
                <h3>Create new banner</h3>
                <hr></hr>
                <CustomInput></CustomInput>
                <CustomInput></CustomInput>
                <CustomInput></CustomInput>
                <CustomInput></CustomInput>
                <div className="edit-component-footer">
                    <a className="waves-effect pink lighten-2 btn-large" href="/">save</a>
                    <a className="waves-effect pink lighten-2 btn-large" href="/">delete</a>
                </div>
            </div>
        </div>
    );
}