import PostContainer from '@/components/PostContainer';
import { db } from '@/config/firebaseClient';
import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { auth } from '@/config/firebaseClient';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { GetServerSidePropsContext } from 'next';
import { admin } from '@/config/firebaseAdmin';
import nookies from 'nookies';
import Headmeta from '@/components/Headmeta';
import Ads from '@/components/Ads';

enum Type { signIn, signUp };

export type Props = {
    homePost: (any)[],
    uid: string,
};

interface HookFormTypes {
    email: string,
    pw: string,
};

interface Post {
    title: string,
    contents: (string)[],
};

interface UserData {
    id: number,
    question: string,
    answer: string,
    time: string,
};

export default function Home({ uid, homePost }: Props) {
    const router = useRouter();
    const { user } = useAuth();
    const [post, setPost] = useState<Array<Post>>([]);
    const { register, handleSubmit, reset } = useForm<HookFormTypes>();

    const icons = [
        '❤️','👍','👌','✌️','😀','😃','😄','😁','💪','✨','⭐','🌟','🤩'
    ];

    const greetings = [
        '당신의 꿈과 열정을 응원합니다.',
        '좋은 하루 보내세요!',
        '지금처럼 한 걸음씩 나아가길 바랍니다.',
        '포기하지 않는 한 꿈은 이루어집니다.',
        '노력하는 당신이 이루지 못할 것은 없습니다.',
        '실패에 대한 두려움이 마음에 가득하다면, 성공은 불가능해질 것입니다.'
    ];

    const onValid = {
        signIn: (data: HookFormTypes) => {
            handleAuth.signIn(data);
            reset();
        },
        signUp: (data: HookFormTypes) => {
            handleAuth.signUp(data);
            reset();
        }
    };

    const handleAuth = {
        signIn: async (data: HookFormTypes) => {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.pw,
            ).then((res) => {
                router.reload();
                toast.success('로그인 성공!');
            }).catch((error) => {
                handleAuth.error(error.code, Type.signIn);
            });
        },
        signUp: async (data: HookFormTypes) => {
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.pw,
            ).then((res) => {
                toast.success('회원가입을 완료했습니다.');
            }).catch((error) => {
                handleAuth.error(error.code, Type.signUp);
            });
        },
        error: (code: string, type: Type) => {
            let message;
            if (type === Type.signIn) {
                switch (code) {
                    case 'auth/invalid-email':
                        message = '이메일 형식이 올바르지 않습니다.';
                        break;
                    case 'auth/user-not-found':
                        message = '등록되지 않은 이메일입니다.';
                        break;
                    case 'auth/user-disabled':
                        message = '사용할 수 없는 이메일입니다.';
                        break;
                    case 'auth/wrong-password':
                        message = '비밀번호가 틀렸습니다.';
                        break;
                    case 'auth/too-many-requests':
                        message = '잠시 후 다시 시도해 주세요.';
                        break;
                    case 'auth/network-request-failed':
                        message = '네트워크 연결에 실패하였습니다.';
                        break;
                    default:
                        message = '로그인에 실패하였습니다.\n다시 시도해 주세요.';
                        break;
                }
            } else {
                switch (code) {
                    case 'auth/email-in-use':
                        message = '이미 등록된 이메일입니다.';
                        break;
                    case 'auth/invalid-email':
                        message = '유효하지 않은 이메일입니다.';
                        break;
                    case 'auth/operation-not-allowed':
                        message = '허용되지 않은 문자가 포함되어 있습니다.';
                        break;
                    case 'auth/weak-password':
                        message = '안전하지 않은 비밀번호입니다.';
                        break;
                    default:
                        message = '회원가입에 실패하였습니다.\n다시 시도해 주세요.';
                        break;
                }
            }
            toast.error(message);
        },
    };

    useEffect(() => {
        switch (typeof homePost[0] === typeof {}) {
            case true:
                setPost([...post, ...homePost]);
                break;
            case false:
                toast.error(homePost[0]);
                break;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user && uid) {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            toast.success(randomGreeting, {icon: randomIcon , style: { maxWidth: "max-content", textAlign: "center", fontWeight: "bold" } });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, uid]);

    return (
        <>
            <Headmeta title={"홈"} url={"https://interview.bluecoder.dev"} imageUrl={"/images/interview.jpg"} />
            <Ads adUnit='DAN-1jZkZ2cM24p1Eb5Q' adWidth={320} adHeight={50} />
            <section id="sign-section" className={`${user !== null || uid !== undefined ? "hidden" : ""} py-20 mx-auto my-40 w-1/2 opacity-80 text-center bg-white border-2 border-sky-500 rounded-lg`}>
                <main>
                    <form id="user-form" className="flex flex-wrap justify-center">
                        <div className="flex w-1/2 flex-col m-0">
                            <input id="email" className="input-box" type="email" placeholder="Email" autoFocus
                                {...register("email", { required: true })} />
                            <input id="pw" className="input-box" type="password" placeholder="Password"
                                {...register("pw", { required: true })} />
                        </div>
                        <div className="flex mx-1">
                            <input type="submit" id="sign-in" className="submit-btn bg-yellow-300 hover:scale-105" value="로그인"
                                style={{ transition: "all .2s ease-in" }}
                                onClick={handleSubmit(onValid.signIn)} />
                            <input type="submit" id="sign-up" className="submit-btn bg-white border-2 border-yellow-300 hover:scale-105" value="회원가입"
                                style={{ transition: "all .2s ease-in" }}
                                onClick={handleSubmit(onValid.signUp)} />
                        </div>
                    </form>
                </main>
            </section>
            <div className="flex flex-col px-5 py-10">
                <section className='flex flex-wrap justify-around mx-auto'>
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

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: {} }> {
    const getPost = async () => {
        const postList: (any)[] = [];
        await get(ref(db, 'home')).then((snapshot) => {
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
                postList.push(...results);
            }
        }).catch((error) => {
            postList.push(`${error}`);
        });

        return postList;
    }

    try {
        const cookies = nookies.get(context);
        const token = await admin.auth().verifyIdToken(cookies.token);
        const { uid } = token;

        let homePost: (any)[] = [];
        homePost.push(...await getPost());

        return {
            props: {
                uid: uid,
                homePost: homePost,
            }
        };
    } catch (error) {
        let homePost: (any)[] = [];
        homePost.push(...await getPost());

        return {
            props: {
                homePost: homePost,
            }
        }
    }
}