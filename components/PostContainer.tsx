import { useEffect } from "react";
import { useRouter } from "next/router";

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

    const onClick = (e: any) => {
        const currentId = e.currentTarget.id;
        switch (currentId) {
            case "0":
                router.push("/data");
                break;
            case "6":
                window.scroll({
                    top: 0,
                    behavior: 'smooth',
                })
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
            <div key={index} id={`${index}`} className="post-container w-1/4 p-4 m-4 rounded-lg opacity-70 text-black bg-amber-100 border-2 border-amber-300 hover:opacity-100 hover:scale-105 hover:cursor-pointer"
                style={{ transition: "all .3s ease-in" }}>
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