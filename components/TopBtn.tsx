import { useEffect, useState } from "react";

export default function TopBtn() {
    const [state, setState] = useState(false);
    const handler = {
        scroll: () => {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            })
        },
        button: () => {
            if (window.scrollY > 10) {
                setState(true);
            } else {
                setState(false);
            }
        },
    };

    useEffect(() => {
        window.addEventListener("scroll", handler.button);

        return () => { window.removeEventListener("scroll", handler.button) };
    });

    return (
        <>
            <div className={`${state ? "" : "hidden "}fixed bottom-10 right-10 p-4 font-extrabold text-lg text-white bg-sky-300 border-sky-500 border-2 rounded-full hover:text-sky-500 hover:bg-white hover:cursor-pointer hover:scale-110}`}
                onClick={handler.scroll} style={{
                    transition: "all .2s ease-in",
                }}>TOP</div>
        </>
    );
}