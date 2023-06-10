import { PropsWithChildren } from "react";
import Nav from "./Nav";
import TopBtn from "./TopBtn";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Nav />
            <div className="main-wrapper">{children}</div>
            <TopBtn />
        </>
    );
}