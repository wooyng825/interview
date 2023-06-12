import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
    horizontal: boolean,
    setHorizontal: Dispatch<SetStateAction<boolean>>
};

export default function TopBtn({ horizontal, setHorizontal }: Props) {
    const [state, setState] = useState(false);
    const handler = {
        scroll: () => {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            })
        },
        button: () => {
            window.scrollY > 10 ? setState(true) : setState(false);
        },
    };

    useEffect(() => {
        window.addEventListener("scroll", handler.button);

        return () => { window.removeEventListener("scroll", handler.button) };
    });

    return (
        <>
            <div id="top-btn" className={`ts ${state ? '' : "hidden "}fixed bottom-10 right-10 p-4 font-extrabold text-lg text-white bg-sky-300 border-sky-500 border-2 rounded-full hover:text-sky-500 hover:bg-white hover:cursor-pointer hover:scale-110`}
                onClick={handler.scroll}>TOP</div>
        </>
    );
}