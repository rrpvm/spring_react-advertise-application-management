import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import API from "../API/APIRequests";
import { useSelector } from "react-redux";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import { AxiosError } from "axios";
import { handleNavigationBarExceptions } from "../API/ResponseExceptionHandler";
import { navigablePaths } from "../constants";


export const NavigationBar: React.FC = () => {
    let location = useLocation().pathname;
    const [activeLinkId, setActiveLink] = useState(location);
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);
    const navigate = useNavigate();
    useEffect(() => {
        setActiveLink(location);
        const promise = API.refreshToken(jwt);
        promise.then(data => {
        }).catch((exception: AxiosError) => {
            console.log(handleNavigationBarExceptions(exception));
        });
    }, [location, jwt, navigate]);//did mount
    return (
        <nav className="nav">
            <div className="nav-wrapper">
                <ul className="nav-list nav nav-tabs card-header-tabs">
                    {
                        navigablePaths.map(navPath => {
                            return (
                                <NavigationItem
                                    link={navPath.link}
                                    active={activeLinkId === navPath.link}
                                    key={navPath.link}
                                    onClickCallback={() => { setActiveLink(navPath.link) }}
                                >
                                    {navPath.name}
                                </NavigationItem>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}
