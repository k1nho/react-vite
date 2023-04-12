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
