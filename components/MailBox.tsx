import { Dispatch, SetStateAction, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faClone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { author } from "./Footer";

type Props = {
    showSelect: boolean,
    setShowSelect: Dispatch<SetStateAction<boolean>>
};

const email = `${author}@${author}.dev`;

export default function MailBox({ showSelect, setShowSelect }: Props) {
    const handleClick = () => {
        setShowSelect(false);
    };

    const clipBoard = () => {
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);

        textarea.value = "wooyng825@naver.com";
        textarea.select();

        document.execCommand('copy');
        document.body.removeChild(textarea);

        toast.success('이메일 주소 복사 완료');
    }

    useEffect(() => {
        const mailBox: HTMLElement = document.querySelector('.select-box')!;

        if (showSelect) {
            mailBox.style.top = "50%";
        } else {
            mailBox.style.top = "200%";
        }
    });

    return (
        <>
            <div data-select={`${showSelect}`} className="select-box ts duration-300 flex flex-col justify-center items-center bg-blue-200"
                style={{ top: "200%" }}>
                <div className="py-2 w-full flex justify-around">
                    <span>
                        <span className="font-bold">{"Contact:"}</span>&nbsp;<span>{email}</span>
                    </span>
                    <button type="button" className="ts text-gray-500 hover:text-black hover:scale-125"
                        onClick={clipBoard}>
                        <FontAwesomeIcon icon={faClone} className="fa-xl" /></button>
                </div>
                <a target="blank" href={`https://mail.naver.com/write/popup?srvid=note&to=${email}`} className="select-part ts bg-white">
                    <Image src="/icons/naver.png" width={80} height={80} alt="네이버 로고" />네이버 메일</a>
                <a target="blank" href="https://mail.daum.net" className="select-part ts bg-white">
                    <Image src="/icons/daum.png" width={55} height={55} alt="다음 로고" />다음 메일</a>
                <a target="blank" href="https://mail.kakao.com" className="select-part ts bg-white">
                    <Image src="/icons/kakao.png" width={70} height={70} alt="카카오 로고" />카카오 메일</a>
                <a target="blank" href="https://mail.google.com/mail/u/0/#inbox?compose=new" className="select-part ts bg-white">
                    <Image src="/icons/google.png" width={70} height={70} alt="구글 로고" />구글 Gmail</a>
                <a target="blank" href={`mailto:${email}`} className="select-part ts bg-white">메일 앱</a>
                <button type="button" className="ts mt-5 hover:scale-150"
                    onClick={handleClick}>
                    <FontAwesomeIcon icon={faXmarkCircle} className="fa-xl" /></button>
            </div >
        </>
    );
}