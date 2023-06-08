import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setFile: Dispatch<SetStateAction<File | undefined>>,
    setTranscript: Dispatch<SetStateAction<string>>,
}

export default function Upload({ setFile, setTranscript }: Props) {
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
        Reset: () => {
            const inputForm: HTMLInputElement = document.querySelector('#formFile')!;
            inputForm.value = "";
            setTranscript('');
        },
    };

    return (
        <>
            <div id="upload" className="flex p-3 justify-between items-center">
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
                </div>
            </div>
        </>
    );
}