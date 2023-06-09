import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

const MicRecorder = require('mic-recorder-to-mp3');

interface Props {
    file: File | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setFile: Dispatch<SetStateAction<File | undefined>>,
    setTranscript: Dispatch<SetStateAction<string>>,
};

export default function Record({ file, setFile, setLoading, setTranscript }: Props) {
    const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
    const [blobUrl, setBlobUrl] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleRecord = {
        Start: () => {
            if (!isRecording) {
                recorder.start().then(() => {
                    if (file) {
                        handleRecord.Reset();
                    }
                    setIsRecording(true);
                }).catch((e: any) => { toast.error(`${e}`) });
            }
        },
        Stop: () => {
            setIsRecording(false);
            recorder.stop().getMp3().then(([buffer, blob]: any) => {

                const file = new File(buffer, 'test.mp3', {
                    type: blob.type,
                    lastModified: Date.now(),
                });

                setBlobUrl(URL.createObjectURL(file));
                setFile(file);
            })
        },
        Reset: () => {
            setTranscript('');
            setBlobUrl('');
            setFile(undefined);
            setLoading(false);
            setIsRecording(false);
            setTimer(0);
        },
    };

    useEffect(() => {
        let interval: any;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [isRecording]);

    return (
        <>
            <div id="record" className="flex flex-col flex-wrap px-4 items-center">
                <div className="w-full flex justify-center relative">
                    <h4 className="text-sm font-bold">{"Record Control"}</h4>
                    <button type="button" className={`ts absolute top-1/2 right-0 -translate-y-1/2 ${isRecording ? "hover:text-gray-500 " : "opacity-80 hover:opacity-100"} hover:scale-125`}
                        disabled={isRecording} onClick={handleRecord.Reset}>
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                    </button>
                </div>
                <div className="btn-section flex w-10/12 p-3 mx-auto my-2 justify-around items-center bg-white rounded-3xl border border-blue-400">
                    <div className="font-bold">{`${Math.floor(timer / 60)}`.padStart(2, '0')} : {`${(timer % 60)}`.padStart(2, '0')}</div>
                    <button type="button" className={`ts ${isRecording ? "text-red-500 hover:text-black" : "opacity-80 hover:opacity-100 hover:text-red-500"} hover:scale-125`}
                        disabled={isRecording} onClick={handleRecord.Start}>
                        {
                            isRecording ? <FontAwesomeIcon icon={faPlay} className="fa-xl fa-beat-fade" /> : <FontAwesomeIcon icon={faPlay} className="fa-xl" />
                        }
                    </button>
                    <button type="button" className={`ts ${isRecording ? "hover:text-yellow-500" : "opacity-80 hover:opacity-100"} hover:scale-125`}
                        disabled={!isRecording} onClick={handleRecord.Stop}>
                        <FontAwesomeIcon icon={faStop} className="fa-xl" />
                    </button>
                </div>
                <h4 className="text-sm font-bold">{"Audio Player"}</h4>
                <audio src={blobUrl} controls className="mx-auto my-2" />

            </div>
        </>
    );
}