import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    icon: IconDefinition,
    index: number,
    value: UserData,
}

interface UserData {
    question: string,
    answer: string,
}


export default function DataContainer({ icon, index, value }: Props) {
    return (
        <>
            <div id={`${index}`} className="my-5 p-4 text-left bg-white rounded-lg relative">
                <FontAwesomeIcon icon={icon} className="fa-xl delete-btn text-gray-300 absolute top-1 -right-1 hover:cursor-pointer hover:text-red-500 hover:scale-105"
                    style={{
                        transition: "all .2s ease-in",
                    }} />
                <h2 id={`${index}`} className="question my-1 font-bold">{value.question}</h2>
                <hr />
                <p id={`${index}`} className="answer my-1 whitespace-pre-line">{value.answer}</p>
            </div>
        </>
    );
}