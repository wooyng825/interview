import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    file: File | undefined,
    setFile: Dispatch<SetStateAction<File | undefined>>,
    setTranscript: Dispatch<SetStateAction<string>>,
}

export default function Upload({ file, setFile, setTranscript }: Props) {
    const [blobUrl, setBlobUrl] = useState("");

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            const inputFile = e.target.files[0];
            console.log(inputFile);
            if (inputFile) {
                const label = document.querySelector('#upload-label')!;
                setFile(inputFile);
                toast.success(`첨부 파일 : ${inputFile.name}`);
                label.textContent = `${inputFile.name}`;

                setBlobUrl(URL.createObjectURL(inputFile));
            }
        }
        e.target.value = '';
    };

    const handleClick = {
        Reset: () => {
            const label = document.querySelector('#upload-label')!;
            label.textContent = "클릭하여 파일 선택";
            setFile(undefined);
            setBlobUrl('');
            setTranscript('');
        },
    };

    return (
        <>

            <div id="upload" className="flex px-4 flex-col items-center">
                <div className="flex w-full justify-center relative">
                    <h4 className="text-sm font-bold">{"File Upload"}</h4>
                    <button type="button"
                        onClick={handleClick.Reset}
                        disabled={file ? false : true}
                        className="absolute top-1/2 right-0 -translate-y-1/2">
                        <FontAwesomeIcon icon={faTrash} className={`fa-xl ts opacity-80 ${file ? "hover:text-gray-500" : ""} hover:opacity-100 hover:scale-125`} />
                    </button>
                </div>
                <label htmlFor="formFile" id="upload-label" className={`w-11/12 p-3 my-2 text-center rounded-full ${file ? "text-black" : "text-gray-400"} bg-white`}>클릭하여 파일 선택</label>
                <input
                    className="hidden"
                    type="file"
                    accept='audio/*'
                    id="formFile"
                    onChange={handleFileChange}
                />
                <h4 className="text-sm font-bold">{"Audio Player"}</h4>
                <audio src={blobUrl} controls className="my-2" />
            </div>
        </>
    );
}