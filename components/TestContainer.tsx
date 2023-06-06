interface Props {
    value: (UserData),
    state: boolean,
}

interface UserData {
    question: string,
    answer: string,
}

export default function TestContainer({ value, state }: Props) {
    return (
        <>
            <div className="my-2 p-4 text-left bg-white rounded-lg">
                <h2 className="question my-1 font-bold">{value.question}</h2>
                <hr />
                {state == false ? <p>{" "}</p> : <p className="answer my-1 whitespace-pre-line">{value.answer}</p>}
            </div>
        </>
    );
}