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
    const [audio, setAudio] = useState<String>();
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

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const base64Data: any = reader.result;
                    const base64String = base64Data.split(',')[1];
                    setAudio(base64String);
                };

            })
        },
        Reset: () => {
            setTranscript('');
            setBlobUrl('');
            setAudio('');
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
            <div id="record" className="flex justify-around">
                <div className="btn-section w-2/5 flex justify-evenly items-center bg-white rounded-lg border-2 border-sky-500">
                    <div className="font-bold">{`${Math.floor(timer / 60)}`.padStart(2, '0')} : {`${(timer % 60)}`.padStart(2, '0')}</div>
                    <button type="button" className={`${isRecording ? "text-red-500 hover:text-black" : "opacity-80 hover:opacity-100 hover:text-red-500"} hover:scale-125`}
                        style={{ transition: "all .2s ease-in" }}
                        disabled={isRecording} onClick={handleRecord.Start}>
                        {
                            isRecording ? <FontAwesomeIcon icon={faPlay} className="fa-xl fa-beat-fade" /> : <FontAwesomeIcon icon={faPlay} className="fa-xl" />
                        }
                    </button>
                    <button type="button" className={`${isRecording ? "hover:text-yellow-500" : "opacity-80 hover:opacity-100"} hover:scale-125`} style={{ transition: "all .2s ease-in" }}
                        disabled={!isRecording} onClick={handleRecord.Stop}>
                        <FontAwesomeIcon icon={faStop} className="fa-xl" />
                    </button>
                    <button type="button" className={`${isRecording ? "hover:text-gray-500 " : "opacity-80 hover:opacity-100"} hover:scale-125`} style={{ transition: "all .2s ease-in" }}
                        disabled={isRecording}
                        onClick={handleRecord.Reset}>
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                    </button>
                </div>
                <audio src={blobUrl} controls></audio>
            </div>
        </>
    );
}