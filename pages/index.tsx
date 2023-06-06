import PostContainer from '@/components/PostContainer';
import { db } from '@/config/firebaseClient';
import { DataType, useDataStore } from '@/config/store';
import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Post {
    title: string,
    contents: (string)[],
}

export default function Home() {
    const [post, setPost] = useState<Array<Post>>([]);

    useEffect(() => {
        get(ref(db, 'home')).then((snapshot) => {
            if (snapshot.exists()) {
                const results: (Post)[] = [];
                const data = snapshot.val();
                for (let i = 0; i < data.length; i++) {
                    const title = Object.keys(data[i])[0];
                    results.push({
                        title: title,
                        contents: data[i][title],
                    });
                }
                setPost([...post, ...results]);
            }
        }).catch((error) => {
            toast.error(`데이터 불러오기 오류 : ${error}`);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex flex-col px-5 py-10">
                <section className='flex flex-wrap justify-evenly mx-auto'>
                    {
                        post.length === 0 ? null :
                            post.map((data, index) => {
                                return (
                                    <PostContainer key={index} index={index} data={data} />
                                );
                            })
                    }
                </section>
            </div>
        </>
    );
}