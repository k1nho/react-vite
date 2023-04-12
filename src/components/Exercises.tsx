// Exercises

import { useState } from "react";


interface Iprops {
    onChangeColor: () => void;

}

// Event handlers
// EX1) Responding to events
export const LightSwitch: React.FC = () => {
    const [text, setText] = useState("change text click");
    const handleClick = () => {
        if (text === "change text click") setText("new text!");
        else setText("change text click");
    };

    return (
        <button onClick={handleClick} className="bg-green-500 text-white text-xl rounded-md p-2">
            {text}
        </button>
    );
};
// EX2) Responding to events
export const ColorSwitch: React.FC<Iprops> = ({ onChangeColor }) => {
    const handleColorChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onChangeColor()
    }
    return (
        <button onClick={(e) => handleColorChange(e)}>
            Change color
        </button>
    );
}

// State as snapshot 
// Ex)
export const TrafficLight: React.FC = () => {
    const [walk, setWalk] = useState(false);

    function handleClick() {
        alert(walk ? "Next up is stop" : "Next up is walk") // after or before setWalk does not change the result, since state is always queued to the next render cycle
        setWalk(!walk)
    }

    return (
        <div>
            <button className="p-4 h-2 w-2 rounded-md bg-indigo-500 text-xl" onClick={handleClick}>Change to {walk ? "stop" : "walk"}</button>
            <p>{walk ? "Walk" : "Stop"}</p>
        </div>
    )
}

// Queueing state with updater funcs
//EX1) 
export const RequestTracker: React.FC = () => {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    async function handleClick() {
        setPending(p => p + 1);
        alert(pending)
        await delay(3000);
        setPending(p => p - 1);
        setCompleted(c => c + 1);
    }

    return (
        <>
            <h3>
                Pending: {pending}
            </h3>
            <h3>
                Completed: {completed}
            </h3>
            <button onClick={handleClick}>
                Buy
            </button>
        </>
    );
}

function delay(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// EX2)
export const getFinalState = (baseState: number, queue: Array<number | ((n: number) => number)>) => {
    let finalState = baseState;

    // TODO: do something with the queue...
    for (let i = 0; i < queue.length; i++) {
        if (typeof (queue[i]) === "number") finalState = queue[i] as number;
        else {
            let f = queue[i] as (n: number) => number;
            finalState = f(finalState);
        }
    }

    return finalState;
}

