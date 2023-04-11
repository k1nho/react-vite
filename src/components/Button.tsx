import { MouseEventHandler } from "react";

interface Iprops {
    onSmash: () => void; children: string | JSX.Element;
}


export const Button: React.FC<Iprops> = ({ onSmash, children }) => {
    return <div>
        {children}
        <button className="h-4 w-4 bg-red-500" onClick={onSmash}>smash out</button>
    </div>;
};

export const NoPropagationButton: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); // stop from propagating to parent
        alert(e.currentTarget.value);
    };
    return (
        <div>
            <button onClick={(e) => handleClick(e)} value="I am no Propagation button">
                click button
            </button>
        </div>
    )
};
