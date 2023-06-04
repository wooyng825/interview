import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDataStore } from "@/config/store";

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
    const { userState } = useDataStore();
    const onClick = (e: any) => {
        const currentId = e.currentTarget.id;
        console.log(currentId);
        switch (currentId) {
            case "0":
                router.push("/data");
                break;
            case "6":
                if (userState) {
                    window.scroll({
                        top: 0,
                        behavior: 'smooth',
                    })
                } else {
                    router.push("/sign");
                }
                break;
            default:
                router.push("/test");
                break;
        }
    };

    useEffect(() => {
        const posts = document.querySelectorAll(".post-container");

        posts.forEach((data) => {
            data.addEventListener("click", onClick);
        });

        return () => {
            posts.forEach((data) => {
                data.removeEventListener("click", onClick);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div key={index} id={`${index}`} className="post-container px-4 py-3 my-4 rounded-lg opacity-70 text-black bg-yellow-300 hover:opacity-100 hover:scale-105 hover:cursor-pointer"
                style={{ transition: "all .3s ease-in" }}>
                <h2 className="text-lg font-bold">{data.title}</h2>
                <ul>
                    {
                        data.contents.length === 0 ? "-" : data.contents.map((list, index) => {
                            return (
                                <li key={index}>- {list}</li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    );
}