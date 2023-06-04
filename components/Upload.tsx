import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setTranscript: Dispatch<SetStateAction<string>>,
}

export default function Upload({ setTranscript }: Props) {
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            let file = e.target.files[0];
            if (file) {
                setFile(file);
                toast.success(`첨부 파일 : ${file.name}`);
            }

        }
    };

    const handleClick = {
        Upload: async () => {
            if (!file) {
                return;
            }
            setUploading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('model', 'whisper-1');
            formData.append('language', 'ko');

            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                },
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setTranscript(result.text);
                toast.success('문자 변환 완료');
            } else {
                const result = await response.json();
                toast.error(result.error.message);
            }
            setUploading(false);
        },
        Reset: () => {
            const inputForm: HTMLInputElement = document.querySelector('#formFile')!;
            inputForm.value = "";
            setTranscript('');
        },
    };

    return (
        <>
            <div className="my-4 flex justify-between items-center">
                <div className="flex items-end">
                    <input
                        className="hover:cursor-pointer"
                        type="file"
                        accept='audio/*'
                        id="formFile"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="text-right">
                    <button type="button"
                        onClick={handleClick.Reset}
                        className="px-2 py-1">
                        <FontAwesomeIcon icon={faTrash} className="fa-xl opacity-60 hover:text-red-500 hover:opacity-100 hover:scale-105" style={{
                            transition: "all .2s ease-in",
                        }} />
                    </button>
                    <button
                        type="button"
                        onClick={handleClick.Upload}
                        disabled={uploading}
                        className="px-2 py-1 inline-block rounded-lg font-bold opacity-60 hover:text-sky-500 hover:opacity-100 hover:scale-105" style={{
                            transition: "all .2s ease-in",
                        }}>
                        {
                            uploading ? <FontAwesomeIcon icon={faRotate} className="fa-spin fa-xl" /> : <FontAwesomeIcon icon={faRotate} className="fa-xl" />
                        }
                    </button>
                </div>
            </div>
        </>
    );
}