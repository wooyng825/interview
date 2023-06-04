import { useForm } from 'react-hook-form';
import { ref, update, get } from 'firebase/database';
import { db } from "@/config/firebaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataType, useDataStore } from '@/config/store';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import DataContainer from '@/components/DataContainer';
import { toast } from 'react-hot-toast';

enum State { init, load };

interface HookFormTypes {
    question: string,
    answer: string,
}

interface UserData {
    id: number,
    question: string,
    answer: string,
}

export default function Data() {
    const router = useRouter();
    const { userData } = useDataStore();
    const [uid, setUid] = useState("");
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

    const handleDB = {
        Save: async (answers: (string)[], questions: (string)[]) => {
            update(ref(db, `users/${uid}`), {
                answers: answers,
                questions: questions,
            }).then(() => {
                toast.success('데이터 업데이트 완료');
                handleDB.Load(State.load);
            }).catch(() => {
                toast.error('데이터 업데이트 오류');
            });
        },
        Load: (state: State) => {
            const userId = userData.get(DataType.uid);
            if (userId !== undefined) {
                get(ref(db, `users/${userId}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const answers: (string)[] = data['answers'];
                        const questions: (string)[] = data['questions'];
                        const results: (UserData)[] = [];
                        for (let i = 0; i < answers.length; i++) {
                            results.push({
                                id: i,
                                question: questions[i],
                                answer: answers[i],
                            });
                        }
                        setDataList([...results]);
                        state == State.init ? toast.success('데이터 불러오기 완료') : null;
                    } else {
                        state == State.init ? toast.error('데이터가 존재하지 않습니다.') : null;
                    }
                }).catch((error) => {
                    toast.error(`데이터 불러오기 오류 : ${error}`);
                });
            } else {
                toast.error('로그인이 필요합니다.');
            }
        },
    };

    useEffect(() => {
        const userId = userData.get(DataType.uid);
        if (userId !== undefined) {
            setUid(userId);
            handleDB.Load(State.init);
        } else {
            toast.error('로그인이 필요합니다.');
            router.push('/sign');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const deleteBtn = document.querySelectorAll('.delete-btn');
        const onClick = (e: any) => {
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
        deleteBtn.forEach((value) => {
            value.addEventListener("click", onClick);
        });

        return () => {
            deleteBtn.forEach((value) => {
                value.removeEventListener("click", onClick);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataList])

    return (
        <>
            <main className="m-10">
                <section className="m-10">
                    <form className="flex flex-col items-center">
                        <div className="flex w-3/4 flex-col m-0">
                            <input id="question" className="input-box" type="text" placeholder="Question" autoFocus
                                {...register("question", { required: true })} />
                            <textarea id="answer" className="input-box h-80" placeholder="Answer"
                                {...register("answer", { required: true })}></textarea>
                        </div>
                        <div className="m-2">
                            <input type="submit" className="submit-btn text-white bg-sky-500 border-2 border-sky-500 hover:text-sky-500 hover:bg-white" value="저장"
                                onClick={handleSubmit(onValid)}
                                style={{
                                    transition: "all .2s ease-in",
                                }} />
                        </div>
                    </form>
                </section>
                <div className="mx-auto my-10 w-10/12 flex flex-col items-center bg-yellow-300 rounded-lg opacity-90">
                    <section className="w-10/12 mx-auto my-10">
                        {
                            dataList.length === 0 ? <div className="no-content font-bold">{'No Data.'}</div> :
                                dataList.map((value, index) => {
                                    return (
                                        <DataContainer key={index} icon={faDeleteLeft} index={index} value={value} />
                                    );
                                })
                        }
                    </section>
                </div>
            </main>
            <style jsx>{`
                .input-box {
                    opacity: 0.8;
                }
            `}</style>
        </>
    );
}