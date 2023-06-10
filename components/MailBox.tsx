import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {
    showSelect: boolean,
    setShowSelect: Dispatch<SetStateAction<boolean>>
};

export default function MailBox({ showSelect, setShowSelect }: Props) {
    const handleClick = () => {
        setShowSelect(false);
    };

    return (
        <>
            <div data-select={`${showSelect}`} className="select-box ts flex flex-col justify-center items-center bg-sky-300"
                style={{ top: `${showSelect ? "50%" : "150%"}` }}>
                <span className="py-2">
                    <span className="font-bold">{"Contact:"}</span>&nbsp;{"wooyng825@naver.com"}
                </span>
                <a target="blank" href="https://mail.naver.com/write/popup?srvid=note&to=wooyng825@naver.com" className="select-part ts bg-white">
                    <Image src="/icons/naver.png" width={80} height={80} alt="네이버 로고" />네이버 메일</a>
                <a target="blank" href="https://mail.daum.net" className="select-part ts bg-white">
                    <Image src="/icons/daum.png" width={55} height={55} alt="다음 로고" />다음 메일</a>
                <a target="blank" href="https://mail.kakao.com" className="select-part ts bg-white">
                    <Image src="/icons/kakao.png" width={70} height={70} alt="카카오 로고" />카카오 메일</a>
                <a target="blank" href="https://mail.google.com/mail/u/0/#inbox?compose=new" className="select-part ts bg-white">
                    <Image src="/icons/google.png" width={70} height={70} alt="구글 로고" />구글 Gmail</a>
                <a target="blank" href="mailto:wooyng825@naver.com" className="select-part ts bg-white">
                    <Image src="/icons/microsoft.png" width={100} height={100} alt="MS 로고" />메일 앱</a>
                <button type="button" className="ts mt-5 hover:scale-150"
                    onClick={handleClick}>
                    <FontAwesomeIcon icon={faXmarkCircle} className="fa-xl" /></button>
            </div >
        </>
    );
}