import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface Props {
    index: string,
    time: string,
    value: UserData,
}

interface UserData {
    question: string,
    answer: string,
    time: string | null,
}


export default function DataContainer({ index, time, value }: Props) {

    return (
        <>
            <div id={index} title={time} className="my-2 p-4 text-left bg-white rounded-lg relative">
                <h2 id={index} className="question my-1 font-bold">{value.question}</h2>
                <FontAwesomeIcon icon={faDeleteLeft} className={`fa-2xl ts ${time === "" ? "delete-btn" : "delete-btns"} text-gray-300 absolute top-1 -right-1 hover:cursor-pointer hover:text-red-500 hover:scale-105`} />
                <hr />
                {time === '' ? <FontAwesomeIcon icon={faPenToSquare} className="fa-xl ts edit-btn text-gray-300 absolute bottom-1 right-0 hover:text-sky-500 hover:scale-105 hover:cursor-pointer" /> : null}
                <p id={index} className="answer my-1 whitespace-pre-line">{value.answer}</p>
            </div>
        </>
    );
}