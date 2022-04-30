import React from "react"
import { NavigationItem } from "./NavigationItem";

type navigationActiveLinkState = {
    activeLinkId?: number,
};
export class NavigationBar extends React.Component<navigationActiveLinkState> {
    state: navigationActiveLinkState = {
        activeLinkId: 0,
    };
    handleItemClick(index: number): void {
        this.setState((state: navigationActiveLinkState) => ({
            activeLinkId: index,
        }));
    }
    render() {
        return (
            <nav className="nav">
                <div className="nav-wrapper">
                    <ul className="nav-list nav nav-tabs card-header-tabs">
                        <NavigationItem link="/banners" active={this.state.activeLinkId === 0} onClickCallback={() => { this.handleItemClick(0)}}>banners</NavigationItem>
                        <NavigationItem link="/categories" active={this.state.activeLinkId === 1} onClickCallback={() => { this.handleItemClick(1)}}>categories</NavigationItem>
                    </ul>
                </div>
            </nav>
        )
    }

}