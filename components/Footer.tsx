import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Dispatch, SetStateAction } from "react";
import Ads from "./Ads";

export const author = 'bluecoder';
const now = new Date(Date.now()).getFullYear();
const times = now === 2023 ? `${now}` : `${2023 - now}`;

type Props = {
    setShowSelect: Dispatch<SetStateAction<boolean>>
};

export default function Footer({ setShowSelect }: Props) {

    const handleClick = () => {
        setShowSelect((state) => !state);
    };

    return (
        <>
            <footer className="bg-blue-400 rounded-t-lg flex">
                <p className="flex flex-col"><span>{`ⓒ${times} ${author}`}</span><span>{"All rights reversed."}</span></p>
                    <div className="flex flex-col items-end">
                        <a target="blank" href="https://github.com/wooyng825" className="ts hover:underline hover:scale-105">
                            <FontAwesomeIcon icon={faGithub} className="fa-lg" />&nbsp;
                            <span className="font-bold">{"Github:"}</span>&nbsp;
                            {author}</a>
                        <span onClick={handleClick} className="ts hover:underline hover:scale-105 hover:cursor-pointer">
                            <FontAwesomeIcon icon={faEnvelope} className="fa-lg" />&nbsp;
                            <span className="font-bold">{"Contact:"}</span>&nbsp;
                            {`${author}@${author}.dev`}</span>
                    </div>
            </footer>
        </>
    );
}