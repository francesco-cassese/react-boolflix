import { Outlet } from "react-router";
import Header from "../components/Header.jsx";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;