import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import API from "../API/APIRequests";
import { useSelector } from "react-redux";
import { jwtState } from "../store/reducers/jwtTokenReducer";
import { AxiosError } from "axios";
import { handleNavigationBarExceptions } from "../API/ResponseExceptionHandler";
import { ALERTTIME, navigablePaths } from "../constants";


export const NavigationBar: React.FC = () => {
    /*<-------------HOOKS/*------------->*/
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [activeLinkId, setActiveLink] = useState(location);
    const [alertMessage, setAlertMessage] = useState<string>('');
    useEffect(() => {
        setActiveLink(location);
        const promise = API.refreshToken(jwt);//can we locate on : "*/admin/*" ?
        promise.
            then(data => {
               // console.log(data);
            })
            .catch((exception: AxiosError) => {
                handleNavigationBarExceptions(exception, () => {
                    setAlertMessage("session is incorrect");
                    navigate('login');
                    setTimeout(() => setAlertMessage(''), ALERTTIME);
                });
            });
    }, [location, jwt, navigate]);//did mount
    /*<-------------END OF HOOKS/*------------->*/
    /*<-------------INSERT ELEMENTS /*------------->*/
    const showAlert = (): JSX.Element => {
        return (
            <>
                <div className={alertMessage.length !== 0 ? "alert alert-danger pop-alert" : "alert alert-danger pop-alert-hidden"}>{alertMessage}</div>
            </>
        )
    }
    /*<-------------END OF INSERTION ELEMENTS/*------------->*/
    return (
        <>
            {showAlert()}
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
                                    >
                                        {navPath.name}
                                    </NavigationItem>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
