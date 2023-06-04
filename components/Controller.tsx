import { useState } from "react";
import Upload from "./Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { ref, update } from "firebase/database";
import { db } from "@/config/firebaseClient";
import { toast } from "react-hot-toast";
import Record from "./Record";

enum Display { upload, record };

interface Props {
    uid: string,
}

export default function Controller({ uid }: Props) {
    const [display, setDisplay] = useState<Display>();
    const [transcript, setTranscript] = useState('');
    const saveDB = async () => {
        const time = Date.now();
        update(ref(db, `users/${uid}/transcripts/${time}`), {
            content: transcript,
        }).then(() => {
            toast.success('데이터 업데이트 완료');
        }).catch(() => {
            toast.error('데이터 업데이트 오류');
        });
    };

    const handleDisplay = {
        Upload: () => {
            setDisplay(Display.upload);
        },
        Record: () => {
            setDisplay(Display.record);
        },
    };

    return (
        <>
            <div className="flex w-full justify-between">
                <button type="button" className={`px-2 py-1 rounded-t-lg font-bold ${display == Display.upload ? "text-sky-300 bg-white" : "text-white bg-sky-300"} border-2 border-sky-300 hover:text-sky-300 hover:bg-white`}
                    onClick={handleDisplay.Upload} style={{
                        transition: "all .2s ease-in",
                    }}>파일 업로드</button>
                <button type="button" className={`px-2 py-1 rounded-t-lg font-bold ${display == Display.record ? "text-sky-300 bg-white" : "text-white bg-sky-300"} border-2 border-sky-300 hover:text-sky-300 hover:bg-white`}
                    onClick={handleDisplay.Record} style={{
                        transition: "all .2s ease-in",
                    }}>실시간 녹음 [다운로드]</button>
            </div>
            <div className="w-full py-2 bg-sky-300 rounded-b-lg border-2 border-sky-300">

                {
                    display == Display.upload ?
                        <Upload setTranscript={setTranscript} /> : <Record setTranscript={setTranscript} />
                }

                <div className="text-black bg-white font-bold p-3 rounded-lg border-2 grow overflow-auto">
                    {
                        <div className="flex justify-center items-center h-full">
                            <FontAwesomeIcon icon={faQuoteLeft} className="mx-4 opacity-20" />
                            <p className="text-lg">{transcript ? transcript : null}</p>
                            <FontAwesomeIcon icon={faQuoteRight} className="mx-4 opacity-20" />
                        </div>
                    }
                </div>
            </div>


            <button type="button" className={`flex mx-auto mt-5 px-3 py-1.5 font-extrabold text-white bg-sky-500 rounded-lg border-2 border-sky-500 ${transcript ? "hover:text-sky-500 hover:bg-white" : ""}`}
                onClick={saveDB} disabled={transcript ? false : true} style={{
                    transition: "all .2s ease-in",
                }}>저장</button>
        </>
    );
}