import { PropsWithChildren, useState } from "react";
import Nav from "./Nav";
import TopBtn from "./TopBtn";

export default function Layout({ children }: PropsWithChildren) {
    const [horizontal, setHorizontal] = useState(false);

    return (
        <>
            <Nav />
            <div className="main-wrapper">{children}</div>
            <TopBtn horizontal={horizontal} setHorizontal={setHorizontal} />
        </>
    );
}