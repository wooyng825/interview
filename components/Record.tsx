import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import Whisper from "@/api/whisper";

const MicRecorder = require('mic-recorder-to-mp3');

interface Props {
    setTranscript: Dispatch<SetStateAction<string>>,
};

export default function Record({ setTranscript }: Props) {
    const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
    const [blobUrl, setBlobUrl] = useState("");
    const [audio, setAudio] = useState<String>();
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [timer, setTimer] = useState(0);

    const handleRecord = {
        Start: () => {
            if (!isRecording) {
                recorder.start().then(() => { setIsRecording(true); }).catch((e: any) => { toast.error(`${e}`) });
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
        const timerId = setInterval(() => {
            if (isRecording) {
                setTimer(timer + 1);
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    });

    return (
        <>
            <div className="flex my-4 justify-around">

                <div className="btn-section w-2/5 flex justify-evenly items-center bg-white rounded-lg border-2 border-sky-500">
                    <div className="font-bold">{`${Math.floor(timer / 60)}`.padStart(2, '0')} : {`${(timer % 60)}`.padStart(2, '0')}</div>
                    <button type="button" className={`${isRecording ? "text-red-500 hover:text-black" : "hover:text-lime-500"} hover:scale-125`}
                        style={{ transition: "all .2s ease-in" }}
                        disabled={isRecording} onClick={handleRecord.Start}>
                        {
                            isRecording ? <FontAwesomeIcon icon={faPlay} className="fa-xl fa-beat-fade" /> : <FontAwesomeIcon icon={faPlay} className="fa-xl" />
                        }
                    </button>
                    <button type="button" className="hover:text-yellow-500 hover:scale-125" style={{ transition: "all .2s ease-in" }}
                        disabled={!isRecording} onClick={handleRecord.Stop}>
                        <FontAwesomeIcon icon={faStop} className="fa-xl" />
                    </button>
                    <button type="button" className="hover:text-sky-500 hover:scale-125" style={{ transition: "all .2s ease-in" }}
                        disabled={loading} onClick={handleRecord.Transcript}>
                        {
                            loading ? <FontAwesomeIcon icon={faRotate} className="fa-xl fa-spin" /> : <FontAwesomeIcon icon={faRotate} className="fa-xl" />
                        }
                    </button>
                    <button type="button" className="hover:text-red-500 hover:scale-125" style={{ transition: "all .2s ease-in" }}
                        onClick={handleRecord.Reset}>
                        <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                    </button>
                </div>
                <audio src={blobUrl} controls></audio>
            </div>
        </>
    );
}