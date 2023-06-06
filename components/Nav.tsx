import Link from "next/link";
import { useRouter } from "next/router";
import { DataType, useDataStore } from "@/config/store";
import { useState, useEffect } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseClient';

export default function Nav() {
    const { userData, userState, clearData, setUserState } = useDataStore();
    const router = useRouter();
    const [user, setUser] = useState("");

    const handleSign = () => {
        if (userState) {
            signOut(auth);
            clearData();
            setUserState();
            router.push("/");
        } else {
            router.push("/sign")
        }
    };

    useEffect(() => {
        if (userState) {
            const email = userData.get(DataType.email)!;
            setUser(email);
        }
    }, [userData, userState]);

    return (
        <>
            <nav className="w-10/12 my-2 p-4 m-auto rounded-2xl bg-sky-300 relative">
                <Link href="/" legacyBehavior>
                    <a className={`${"nav-item"} ${router.pathname === '/' ? 'active' : ''}`}>홈</a>
                </Link>
                <Link href="/data" legacyBehavior >
                    <a className={`${"nav-item"} ${router.pathname === '/data' ? 'active' : ''}`}>데이터 설정</a>
                </Link>
                <Link href="/test" legacyBehavior>
                    <a className={`${"nav-item"} ${router.pathname === '/test' ? 'active' : ''}`}>테스트</a>
                </Link>
                <Link href="/sign" legacyBehavior>
                    <a className={`${"nav-item"} ${router.pathname === '/sign' ? 'active' : ''} ${userState ? "hidden" : ""}`}>로그인 / 회원가입</a>
                </Link>
                <div id="user-section" className="absolute top-1/2 right-10 flex items-end -translate-y-1/2">
                    <span className="px-4 text-gray-600 hover:scale-105 hover:cursor-pointer" style={{
                        fontWeight: "600",
                        transition: "all .2s ease-in",
                    }}>{userState ? "(User)" : null} {userState ? `${user}` : null}</span>
                    <button className="submit-btn text-white bg-amber-300 text-lg font-extrabold border-2 border-yellow-400 hover:text-amber-400 hover:bg-white"
                        onClick={handleSign} style={{
                            transition: "all .2s ease-in",
                        }}>{userState ? '로그아웃' : '로그인'}</button>
                </div>
            </nav>
        </>
    );
}