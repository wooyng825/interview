import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseClient';
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";

export default function Nav() {
    const router = useRouter();
    const { user } = useAuth();
    const [email, setEmail] = useState<string>();

    const handleSign = () => {
        if (user !== null) {
            signOut(auth);
        }
        router.pathname === "/" ? router.reload() : router.push("/");
    };

    const checkAuth = () => {
        if (user === null) {
            toast.error('로그인이 필요합니다.');
        }
    };

    useEffect(() => {
        user !== null ? setEmail(user.email!) : setEmail(undefined);
    }, [user]);

    return (
        <>
            <nav className="main-nav relative flex flex-wrap">
                <Link href="/" legacyBehavior>
                    <a className={`${"nav-item"} ${router.pathname === '/' ? 'active' : ''}`}>홈</a>
                </Link>
                <Link href="/dataset" legacyBehavior >
                    <a onClick={checkAuth} className={`${"nav-item"} ${router.pathname === '/dataset' ? 'active' : ''}`}>데이터 설정</a>
                </Link>
                <Link href="/practice" legacyBehavior>
                    <a onClick={checkAuth} className={`${"nav-item"} ${router.pathname === '/practice' ? 'active' : ''}`}>연습실</a>
                </Link>
                <div id="user-section">
                    <span className="ts px-4 text-gray-600 hover:scale-105 hover:cursor-pointer" style={{
                        fontWeight: "600",
                    }}>{email !== undefined ? `(User) ${email}` : null}</span>
                    <button id="sign-btn" className="ts submit-btn text-white bg-amber-400 text-xl font-extrabold border-2 border-amber-500 hover:text-amber-400 hover:bg-white"
                        onClick={handleSign}>{email !== undefined ? '로그아웃' : '로그인'}</button>
                </div>
            </nav>
        </>
    );
}