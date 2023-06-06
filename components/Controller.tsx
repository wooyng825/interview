import { Dispatch, SetStateAction, useState } from "react";
import Upload from "./Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faQuoteLeft, faQuoteRight, faArrowsRotate, faArrowUp, faArrowDown, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { ref, update } from "firebase/database";
import { db } from "@/config/firebaseClient";
import { toast } from "react-hot-toast";
import Record from "./Record";
import Whisper from "@/api/whisper";

enum Display { upload, record };

interface Props {
    uid: string,
    value: UserData,
    setSavedList: Dispatch<SetStateAction<UserData[]>>
}
interface UserData {
    question: string,
    answer: string,
    time: string,
}

export default function Controller({ uid, value, setSavedList }: Props) {
    const [file, setFile] = useState<File>();
    const [display, setDisplay] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showing, setShowing] = useState(true);
    const [transcript, setTranscript] = useState('');

    const saveDB = async () => {
        const time = Date.now();
        const data = {
            question: value.question,
            answer: transcript,
            time: new Date(time).toLocaleString(),
        };
        update(ref(db, `users/${uid}/transcripts/${time}`), data).then(() => {
            setSavedList((prev) => [...prev, data])
            toast.success('데이터 업데이트 완료');
        }).catch(() => {
            toast.error('데이터 업데이트 오류');
        });
    };

    const handleDisplay = () => {
        switch (display) {
            case 0:
                setDisplay(display + 1);
                break;
            case 1:
                setDisplay(display - 1);
                break;
        }
    };

    const handleClick = {
        Toggle: () => {
            setShowing(!showing);
        },
        Transcript: async () => {
            setLoading(true);

            if (!file) {
                setLoading(false);
                return;
            }

            const response = await Whisper(file);

            if (response.ok) {
                const result = await response.json();
                toast.success('텍스트 변환 완료');
                setTranscript(result.text);
            } else {
                const result = await response.json();
                toast.error(result.error.message);
            }
            setLoading(false);
        }
    };

    return (
        <>
            <FontAwesomeIcon icon={showing ? faChevronDown : faChevronUp} style={{ transition: "all .2s ease-in" }}
                onClick={handleClick.Toggle}
                className={`fa-xl px-3 py-2 flex mx-auto mr-10 text-white bg-sky-500 border border-b-0 border-sky-500 rounded-t-lg hover:text-sky-500 hover:bg-white hover:cursor-pointer ${showing ? "" : "translate-y-48"}`} />
            <div className={`py-2 bg-sky-300 rounded-lg border border-sky-500 ${showing ? "" : "translate-y-48"}`} style={{ transition: "all .2s ease-in" }}>
                <div className="flex justify-between items-start">
                    <button type="button" className="mx-1 opacity-60 hover:opacity-100 hover:scale-125" style={{ transition: "all .2s ease-in" }}
                        disabled={loading} onClick={handleClick.Transcript}>
                        {
                            loading ? <FontAwesomeIcon icon={faArrowsRotate} className="fa-xl fa-beat-fade" /> : <FontAwesomeIcon icon={faArrowsRotate} className="fa-xl" />
                        }
                    </button>
                    <button type="button" className="flex mx-auto px-3 py-1.5 font-extrabold text-white bg-sky-500 rounded-lg border-2 border-sky-500 hover:text-sky-500 hover:bg-white"
                        onClick={saveDB} disabled={transcript ? false : true}
                        style={{ transition: "all .2s ease-in" }}>Save</button>
                    <FontAwesomeIcon icon={display === 0 ? faToggleOff : faToggleOn} className="fa-xl mx-1 opacity-60 hover:opacity-100 hover:cursor-pointer"
                        style={{ transition: "all .2s ease-in" }}
                        onClick={handleDisplay} />
                </div>
                <section className="w-full py-4">
                    {
                        display === 0 ?
                            <Upload setFile={setFile} setTranscript={setTranscript} /> : <Record file={file} setFile={setFile} setLoading={setLoading} setTranscript={setTranscript} />
                    }
                </section>

                <div className="p-3 font-bold text-black bg-white rounded-lg border-2 grow overflow-auto">
                    {
                        <div className="flex justify-center items-center h-full">
                            <FontAwesomeIcon icon={faQuoteLeft} className="mx-4 opacity-20" />
                            <p className="text-lg">{transcript ? transcript : null}</p>
                            <FontAwesomeIcon icon={faQuoteRight} className="mx-4 opacity-20" />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}