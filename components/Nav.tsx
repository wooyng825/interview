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

    const handleClick = () => {
        if (user === null) {
            toast.error('로그인이 필요합니다.');
        }
    };

    useEffect(() => {
        if (user !== null) {
            setEmail(user.email!);
        } else {
            setEmail(undefined);
        }
    }, [user]);

    return (
        <>
            <nav className="w-10/12 my-2 p-4 m-auto rounded-2xl bg-sky-300 relative">
                <Link href="/" legacyBehavior>
                    <a onClick={handleClick} className={`${"nav-item"} ${router.pathname === '/' ? 'active' : ''}`}>홈</a>
                </Link>
                <Link href="/dataset" legacyBehavior >
                    <a onClick={handleClick} className={`${"nav-item"} ${router.pathname === '/dataset' ? 'active' : ''}`}>데이터 설정</a>
                </Link>
                <Link href="/test" legacyBehavior>
                    <a onClick={handleClick} className={`${"nav-item"} ${router.pathname === '/test' ? 'active' : ''}`}>테스트</a>
                </Link>
                <div id="user-section" className="absolute top-1/2 right-10 flex items-end -translate-y-1/2">
                    <span className="px-4 text-gray-600 hover:scale-105 hover:cursor-pointer" style={{
                        fontWeight: "600",
                        transition: "all .2s ease-in",
                    }}>{email !== undefined ? `(User) : ${email}` : null}</span>
                    <button className="submit-btn text-white bg-amber-300 text-lg font-extrabold border-2 border-yellow-400 hover:text-amber-400 hover:bg-white"
                        onClick={handleSign} style={{
                            transition: "all .2s ease-in",
                        }}>{email !== undefined ? '로그아웃' : '로그인'}</button>
                </div>
            </nav>
        </>
    );
}