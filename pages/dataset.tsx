import { useForm } from 'react-hook-form';
import { ref, update, get } from 'firebase/database';
import { db } from "@/config/firebaseClient";
import { useEffect, useState } from "react";
import DataContainer from '@/components/DataContainer';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/components/AuthProvider';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { admin } from '@/config/firebaseAdmin';
import { Props } from '.';
import Headmeta from '@/components/Headmeta';
import Ads from '@/components/Ads';

interface HookFormTypes {
    question: string,
    answer: string,
}

interface UserData {
    id: number,
    question: string,
    answer: string,
    time: string,
}

export default function DataSet({ uid }: Props) {
    const { user } = useAuth();
    const [userId, setUserId] = useState<string>();
    const [dataList, setDataList] = useState<Array<UserData>>([]);
    const { register, handleSubmit, reset } = useForm<HookFormTypes>();

    const onValid = (data: HookFormTypes) => {
        const answers: (string)[] = [];
        const questions: (string)[] = [];
        dataList.forEach((value) => {
            answers.push(value.answer);
            questions.push(value.question);
        });
        const newAnswers = [...answers, data.answer];
        const newQuestions = [...questions, data.question];
        handleDB.Save(newAnswers, newQuestions);
        reset();
    }

    // DB handler
    const handleDB = {
        Save: (answers: (string)[], questions: (string)[]) => {
            update(ref(db, `users/${userId ?? uid}`), {
                answers: answers,
                questions: questions,
            }).then(() => {
                toast.success('데이터 저장 성공');
                handleDB.Load();
            }).catch(() => {
                toast.error('데이터 저장 실패');
            });
        },
        Load: () => {
            get(ref(db, `users/${userId ?? uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const answers: (string)[] = data['answers'];
                    const questions: (string)[] = data['questions'];
                    const results: (UserData)[] = [];
                    if (answers !== undefined) {
                        for (let i = 0; i < answers.length; i++) {
                            results.push({
                                id: i,
                                question: questions[i],
                                answer: answers[i],
                                time: '',
                            });
                        }
                        toast.remove();
                        dataList.length === 0 ? toast.success('데이터 불러오기 완료') : null;
                        setDataList([...results]);
                    } else { toast.error('데이터가 존재하지 않습니다.'); }
                } else {
                    toast.error('데이터가 존재하지 않습니다.');
                }
            }).catch((error) => {
                toast.error(`데이터 불러오기 오류 : ${error}`);
            });
        },
    };

    useEffect(() => {
        toast.loading('사용자 정보 불러오는 중..', { duration: 500 });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (user !== null) {
                toast.loading('데이터 불러오는 중 ..');
                setUserId(user.uid);
                handleDB.Load();
            }
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, uid]);

    useEffect(() => {
        const deleteBtn = document.querySelectorAll('.delete-btn');
        const editBtn = document.querySelectorAll('.edit-btn');

        const onRemoveClick = (e: any) => {
            const data = e.currentTarget.parentElement;
            const removeId = data.id;
            const temp = [...dataList];
            const newList = temp.filter((value) => value.id.toString() !== removeId);
            const answers: (string)[] = [];
            const questions: (string)[] = [];
            newList.forEach((value) => {
                answers.push(value.answer);
                questions.push(value.question);
            });
            setDataList([...newList]);
            handleDB.Save(answers, questions);
        }

        const onEditClick = (e: any) => {
            const qInput: HTMLInputElement = document.querySelector('#question')!;
            const aInput: HTMLTextAreaElement = document.querySelector('#answer')!;
            const editParent = e.currentTarget.parentElement;
            const removeId = editParent.id;
            const editQuestion = editParent.firstChild;
            const editAnswer = editParent.lastChild;
            qInput.value = editQuestion.innerText;
            aInput.value = editAnswer.innerText;

            if (editQuestion.innerText === '' || editAnswer.innerText === '') {
                toast.error('데이터 오류');

                return () => {
                    editBtn.forEach((value) => {
                        value.removeEventListener("click", onEditClick);
                    });
                }
            }
            const temp = [...dataList];
            const newList = temp.filter((value) => value.id.toString() !== removeId);
            const answers: (string)[] = [];
            const questions: (string)[] = [];
            newList.forEach((value) => {
                answers.push(value.answer);
                questions.push(value.question);
            });
            setDataList([...newList]);
            handleDB.Save(answers, questions);
        };


        deleteBtn.forEach((value) => {
            value.addEventListener("click", onRemoveClick);
        });
        editBtn.forEach((value) => {
            value.addEventListener("click", onEditClick);
        });

        return () => {
            deleteBtn.forEach((value) => {
                value.removeEventListener("click", onRemoveClick);
            });
            editBtn.forEach((value) => {
                value.removeEventListener("click", onEditClick);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataList])

    return (
        <>
            <Headmeta title={"데이터 설정"} url={"https://interview.bluecoder.dev/dataset"} imageUrl={"/images/abstract-lines.jpg"} />
            <main id="dataset-main" className="m-10">
                <section id="dataset-section" className="m-10">
                    <form id="dataset-form" className="flex flex-col items-center">
                        <div className="flex w-3/4 flex-col m-0">
                            <input id="question" className="input-box" type="text" placeholder="Question" autoFocus
                                {...register("question", { required: true })} />
                            <textarea id="answer" className="input-box h-80" placeholder="Answer"
                                {...register("answer", { required: true })}></textarea>
                        </div>
                        <div className="m-2">
                            <button type="submit" className="submit-btn ts text-white bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white"
                                onClick={handleSubmit(onValid)}>Save</button>
                        </div>
                    </form>
                </section>
                <Ads adUnit='DAN-1jZkZ2cM24p1Eb5Q' adWidth={320} adHeight={50} />
                <div className="m-10">
                    <div className="content-box w-3/4 mx-auto flex flex-col items-center rounded-lg opacity-90">
                        <span className="p-4 italic text-xl">{"Saved Data"}</span>
                        <section className="w-10/12 mx-auto my-10">
                            {
                                dataList.length === 0 ? <div className="no-content font-bold">{'No Data.'}</div> :
                                    dataList.map((value, index) => {
                                        return (
                                            <DataContainer key={index} time={''} index={index.toString()} value={value} />
                                        );
                                    })
                            }
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(context);
        const token = await admin.auth().verifyIdToken(cookies.token);
        const { uid } = token;

        return {
            props: {
                uid: uid,
            }
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};