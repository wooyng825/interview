import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";

type Props = {
    key: number,
    index: number,
    data: Post,
}

interface Post {
    title: string,
    contents: (string)[],
}

export default function PostContainer({ index, data }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    };

    const onClick = {
        dataset: () => {
            scrollToTop();
            setTimeout(() => {
                user === null ? toast.error('로그인이 필요합니다.') : router.push("/dataset");
            }, 300);
        },
        practice: () => {
            scrollToTop();
            setTimeout(() => {
                user === null ? toast.error('로그인이 필요합니다.') : router.push("/practice");
            }, 300);
        },
        default: () => {
            scrollToTop();
            setTimeout(() => {
                if (user === null) toast.error('로그인이 필요합니다.');
            }, 300);
        },
    };

    return (
        <>
            <div key={index} id={`${index}`} className="post-box ts w-1/4 p-4 m-4 rounded-lg opacity-70 text-black border-2 border-amber-300 hover:opacity-100 hover:scale-105 hover:cursor-pointer"
                onClick={index === 0 ? onClick.dataset : index === 6 ? onClick.default : onClick.practice}>
                <h2 className="text-lg font-bold my-1">{data.title}</h2>
                <hr />
                <ul>
                    {
                        data.contents.length === 0 ? "-" : data.contents.map((list, index) => {
                            return (
                                <li className="my-2 text-sm" key={index}>- {list}</li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    );
}