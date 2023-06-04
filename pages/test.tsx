import { db } from "@/config/firebaseClient";
import { DataType, useDataStore } from "@/config/store";
import { get, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faChevronCircleLeft, faChevronCircleRight, } from "@fortawesome/free-solid-svg-icons";
import TestContainer from "@/components/TestContainer";
import Controller from "@/components/Controller";
import { toast } from "react-hot-toast";


interface UserData {
    id: number,
    question: string,
    answer: string,
}

export default function Test() {
    const router = useRouter();
    const { userData } = useDataStore();
    const [uid, setUid] = useState("");
    const [count, setCount] = useState(0);
    const [state, setState] = useState(false);
    const [horizontal, setHorizontal] = useState(false);
    const [dataList, setDataList] = useState<Array<UserData>>([]);

    const handleClick = {
        Increase: () => {
            if (count < dataList.length - 1) {
                setCount(count + 1);
            } else {
                toast.error('다음 데이터가 없습니다.');
            }
        },
        Decrease: () => {
            if (count > 0) {
                setCount(count - 1);
            } else {
                toast.error('이전 데이터가 없습니다.');
            }
        },
        ToggleAnswer: () => {
            setState(!state);
        },
        ToggleHorizontal: () => {
            setHorizontal(!horizontal);
        },
    };

    // DB에서 데이터 가져오기
    useEffect(() => {
        const userId = userData.get(DataType.uid);
        if (userId !== undefined) {
            setUid(userId);
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
                    results.sort(() => Math.random() - 0.5);
                    setDataList([...results]);
                    toast.success('데이터 불러오기 완료');
                } else {
                    toast.error('데이터가 존재하지 않습니다.');
                }
            }).catch((error) => {
                toast.error(`데이터 불러오기 오류 : ${error}`);
            });
        } else {
            toast.error('로그인이 필요합니다.');
            router.push("/sign");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="text-right">
                <button type="button" className="px-3 py-1.5 rounded-lg border-2 border-sky-300 text-sky-300 font-bold bg-white hover:text-white hover:bg-sky-300"
                    onClick={handleClick.ToggleHorizontal} style={{
                        transition: "all .2s ease-in",
                    }}>{horizontal ? "가로모드" : "세로모드"}</button>
            </div>
            <main className={`m-5 ${horizontal ? "flex" : ""}`}>
                <div className={`main-data ${horizontal ? "mx-2.5" : "mx-auto"} my-10 h-full w-2/3 flex flex-col items-center bg-yellow-300 rounded-lg relative`}>
                    {dataList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleLeft} className="prev-btn fa-2xl absolute top-8 left-0 opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                        onClick={handleClick.Decrease} style={{
                            transition: "all .2s ease-in",
                        }} />}
                    <section className="data-section mx-auto my-4 w-10/12">
                        {dataList.length === 0 ? null :
                            <div className="m-0 flex justify-between items-end">
                                <span>{`${count + 1} / ${dataList.length}`}</span>
                                <FontAwesomeIcon icon={state ? faToggleOn : faToggleOff} className="fa-2xl opacity-40 hover:opacity-100 hover:cursor-pointer"
                                    onClick={handleClick.ToggleAnswer} style={{
                                        transition: "all .2s ease-in",
                                    }} />
                            </div>
                        }
                        {
                            dataList.length === 0 ? <div className="no-content font-bold">{'No Data.'}</div> :
                                <TestContainer key={count} index={count} value={dataList[count]} state={state} />
                        }
                    </section>
                    {dataList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleRight} className="next-btn fa-2xl absolute top-8 right-0 opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                        onClick={handleClick.Increase} style={{
                            transition: "all .2s ease-in",
                        }} />}
                </div>
                <div className={`transcript-data ${horizontal ? "mx-2.5" : "mx-auto"} my-10 w-2/3 h-full flex flex-col items-center opacity-80 bg-yellow-200 rounded-lg`}>
                    <section className="data-section mx-auto my-4 w-10/12">
                        <Controller uid={uid} />
                    </section>
                </div>
            </main>

        </>
    );
}