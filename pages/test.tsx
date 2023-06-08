import { db } from "@/config/firebaseClient";
import { get, ref, remove } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faChevronCircleLeft, faChevronCircleRight, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import TestContainer from "@/components/TestContainer";
import Controller from "@/components/Controller";
import { toast } from "react-hot-toast";
import DataContainer from "@/components/DataContainer";
import { useAuth } from "@/components/AuthProvider";
import { GetServerSidePropsContext } from "next";
import nookies from 'nookies';
import { admin } from "@/config/firebaseAdmin";

type Props = {
    uid: string
};

interface UserData {
    question: string,
    answer: string,
    time: string,
}

export default function Test({ uid }: Props) {
    const router = useRouter();
    const { user } = useAuth();
    const [userId, setUserId] = useState<string>();
    const [count, setCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);
    const [showState, setShowState] = useState(false);
    const [horizontal, setHorizontal] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [savedKeys, setSavedKeys] = useState<Array<string>>([]);
    const [dataList, setDataList] = useState<Array<UserData>>([]);
    const [savedList, setSavedList] = useState<Array<UserData>>([]);

    // Web API 적용하기
    const setSynthesis = (data: string) => {
        if (!window.speechSynthesis) {
            toast.error('음성 재생을 지원하지 않는 브라우저입니다.\n크롬, 파이어폭스 등의 최신 브라우저를 이용해 주세요.');
            return;
        }

        const utterance = new window.SpeechSynthesisUtterance(data);

        utterance.lang = 'ko-KR';
        window.speechSynthesis.speak(utterance);

        utterance.onstart = (e: any) => {
            setIsSpeaking(true);
        };
        utterance.onerror = (e: any) => {
            toast.error(`음성 재생 오류 : ${e}`);
        };
        utterance.onend = (e: any) => {
            setIsSpeaking(false);
        };
    };

    const handleClick = {
        Increase: () => {
            if (count < dataList.length - 1) {
                setCount(count + 1);
                const currentQuestion = dataList[count + 1].question;
                setSynthesis(currentQuestion);
            } else {
                toast.error('다음 데이터가 없습니다.');
            }
        },
        Decrease: () => {
            if (count > 0) {
                setCount(count - 1);
                const currentQuestion = dataList[count - 1].question;
                setSynthesis(currentQuestion);
            } else {
                toast.error('이전 데이터가 없습니다.');
            }
        },
        Prev: () => {
            if (savedCount > 0) {
                setSavedCount(savedCount - 1);
            } else {
                setSavedCount(savedList.length - 1);
            }
        },
        Next: () => {
            if (savedCount < savedList.length - 1) {
                setSavedCount(savedCount + 1);
            } else {
                setSavedCount(0);
            }
        },
        ToggleAnswer: () => {
            setShowState(!showState);
        },
        ToggleHorizontal: () => {
            setHorizontal(!horizontal);
        },
        Speak: () => {
            const currentQuestion = dataList[count].question;
            setSynthesis(currentQuestion);
        },
        Horizontal: () => {
            setHorizontal(!horizontal);
        }
    };

    // DB handler
    const handleDB = {
        LoadData: async () => {
            let result = false;
            await get(ref(db, `users/${userId ?? uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const answers: (string)[] = data['answers'];
                    const questions: (string)[] = data['questions'];
                    const results: (UserData)[] = [];

                    if (answers !== undefined) {
                        for (let i = 0; i < answers.length; i++) {
                            results.push({
                                question: questions[i],
                                answer: answers[i],
                                time: '',
                            });
                        }
                        results.sort(() => Math.random() - 0.5);
                        setDataList([...results]);

                        const currentQuestion = results[count].question;
                        setSynthesis(currentQuestion);
                        result = true;
                    } else {
                        toast.error('데이터가 존재하지 않습니다.');
                    }
                } else {
                    toast.error('데이터가 존재하지 않습니다.');
                }
            }).catch((error) => {
                toast.error(`데이터 불러오기 오류 : ${error}`);
            });

            return result;
        },
        LoadTranscript: async () => {
            let result = false;
            await get(ref(db, `users/${userId ?? uid}/transcripts`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const keys = Object.keys(data);
                    setSavedKeys([...keys]);
                    const results: (UserData)[] = [];
                    for (let i = 0; i < keys.length; i++) {
                        results.push(data[keys[i]]);
                    }
                    setSavedList([...savedList, ...results]);
                    result = true;
                } else {
                    toast.error('데이터가 존재하지 않습니다.');
                }
            }).catch((error) => {
                toast.error(`데이터 불러오기 오류 : ${error}`);
            });

            return result;
        },
        remove: (id: string) => {
            remove(ref(db, `users/${userId}/transcripts/${id}`)).then((_) => {
                toast.success('해당 데이터 삭제 완료');
            }).catch((_) => {
                toast.error('데이터 삭제 오류');
            });
        },
    };

    useEffect(() => {
        toast.loading('사용자 정보 불러오는 중..', { duration: 500 });
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            if (uid) {
                if (user !== null) {
                    toast.loading('데이터 불러오는 중..');
                    setUserId(uid);
                    const dataState = await handleDB.LoadData();
                    const savedState = await handleDB.LoadTranscript();

                    if (dataState && savedState) {
                        toast.remove();
                        toast.success('데이터 불러오기 완료');
                    }
                }
            } else {
                if (user === null) {
                    toast.error('로그인이 필요합니다.');
                    router.push('/');
                }
            }
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, uid]);

    useEffect(() => {
        const deleteBtns = document.querySelectorAll('.delete-btns');
        const onClick = (e: any) => {
            const data = e.currentTarget.parentElement;
            const removeId = data.id;
            const removeTitle = data.title;
            const temp = [...savedList];
            const newList = temp.filter((value) => value.time != removeTitle);
            handleDB.remove(removeId);
            setSavedList([...newList]);
        }
        deleteBtns.forEach((value) => {
            value.addEventListener("click", onClick);
        });

        return () => {
            deleteBtns.forEach((value) => {
                value.removeEventListener("click", onClick);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedList])

    return (
        <>
            <div className="text-right">
                <button onClick={handleClick.Horizontal} style={{ transition: "all .2s ease-in" }}
                    className="px-3 py-2 font-bold rounded-lg text-sky-300 bg-white border-2 border-sky-300 hover:text-white hover:bg-sky-300">
                    {horizontal ? "가로 보기" : "세로 보기"}
                </button>
            </div>
            <main className={`flex ${horizontal ? "" : "flex-col"}`}>
                <div className="transcript-data fixed bottom-0 right-0 mx-auto w-1/3 opacity-80 flex flex-col items-center rounded-lg">
                    <section className="data-section w-11/12">
                        <Controller uid={userId!} value={dataList[count]} setSavedList={setSavedList} />
                    </section>
                </div>
                <div className={`main-data ${horizontal ? "mr-2.5" : "mx-auto"} my-4 w-2/3 h-full flex flex-col items-center opacity-70 bg-yellow-300 border-2 border-amber-300 rounded-lg hover:scale-105 hover:opacity-100`} style={{ transition: "all .2s ease-in" }}>
                    <h2 className="p-3 italic text-xl">{"Random Questions"}</h2>
                    <section className="data-section mx-auto my-4 w-10/12">
                        {dataList.length === 0 ? null :
                            <div className="m-0 flex justify-between items-end">
                                <button className="hover:scale-125" onClick={handleClick.Speak}>
                                    {isSpeaking ? <FontAwesomeIcon icon={faVolumeHigh} className="fa-beat-fade" /> : <FontAwesomeIcon icon={faVolumeHigh} />}
                                </button>
                                <div className="font-bold">
                                    {dataList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleLeft} className="prev-btn fa-xl opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                                        onClick={handleClick.Decrease} style={{
                                            transition: "all .2s ease-in",
                                        }} />}
                                    <span className="p-4">{`${dataList.length === 0 ? 0 : count + 1} / ${dataList.length}`}</span>
                                    {dataList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleRight} className="next-btn fa-xl opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                                        onClick={handleClick.Increase} style={{
                                            transition: "all .2s ease-in",
                                        }} />}
                                </div>
                                <FontAwesomeIcon icon={showState ? faToggleOn : faToggleOff} className="fa-2xl opacity-40 hover:opacity-100 hover:cursor-pointer"
                                    onClick={handleClick.ToggleAnswer} style={{
                                        transition: "all .2s ease-in",
                                    }} />
                            </div>
                        }
                        <span className="text-xs font-extralight">{"[안내] 음성이 부자연스러울 수 있습니다."}</span>
                        {
                            dataList.length === 0 ? <div className="no-content font-bold">{'No Data.'}</div> :
                                <TestContainer key={count} value={dataList[count]} state={showState} />
                        }
                    </section>
                </div>
                <div className={`saved-data ${horizontal ? "ml-2.5" : "mx-auto"} my-4 w-2/3 h-full flex flex-col items-center opacity-70 bg-yellow-300 border-2 border-amber-300 rounded-lg hover:scale-105 hover:opacity-100`} style={{ transition: "all .2s ease-in" }}>
                    <h2 className="p-3 italic text-xl">{"Record Data"}</h2>
                    <section className="data-section mx-0 my-4 w-10/12">
                        <div className="flex justify-center items-center">
                            {savedList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleLeft} className="prev-btn fa-xl opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                                onClick={handleClick.Prev} style={{
                                    transition: "all .2s ease-in",
                                }} />}
                            <span className="font-bold p-4">{`${savedList.length === 0 ? 0 : savedCount + 1} / ${savedList.length}`}</span>
                            {savedList.length === 0 ? null : <FontAwesomeIcon icon={faChevronCircleRight} className="prev-btn fa-xl opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-125"
                                onClick={handleClick.Next} style={{
                                    transition: "all .2s ease-in",
                                }} />}
                        </div>
                        {savedList.length === 0 ? null : <span className="font-bold text-sm">{`저장 시간 : ${savedList[savedCount].time}`}</span>}
                        {
                            savedList.length === 0 ? null : <DataContainer key={savedCount} time={savedList[savedCount].time!} index={savedKeys[savedCount]} value={savedList[savedCount]} />
                        }
                    </section>
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
                uid,
            }
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        };
    }
}