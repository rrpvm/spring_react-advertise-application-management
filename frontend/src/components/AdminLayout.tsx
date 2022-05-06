import { Route, Routes } from "react-router-dom";
import { BannerPage } from "../pages/BannerPage";
import { CategoryPage } from "../pages/CategoryPage";
import { LoginPage } from "../pages/LoginPage";
import { NavigationBar } from "./NavigationBar";

export const AdminLayout: React.FC = () => {

    return (
        <>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path='banners' element={<BannerPage />}></Route>
                <Route path='categories' element={<CategoryPage />}></Route>
                <Route path='login' element={<LoginPage />}></Route>
            </Routes>
        </>
    );
}