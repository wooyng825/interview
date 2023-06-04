interface Props {
    index: number,
    value: UserData,
    state: boolean,
}

interface UserData {
    question: string,
    answer: string,
}

export default function TestContainer({ index, value, state }: Props) {
    return (
        <>
            <div id={`${index}`} className="my-2 p-4 text-left bg-white rounded-lg">
                <h2 id={`${index}`} className="question my-1 font-bold">{value.question}</h2>
                <hr />
                {state == false ? <p>{" "}</p> : <p id={`${index}`} className="answer my-1 whitespace-pre-line">{value.answer}</p>}
            </div>
        </>
    );
}