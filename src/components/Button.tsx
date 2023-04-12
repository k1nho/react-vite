import { MouseEventHandler } from "react";

interface Iprops {
    onSmash: () => void;
    children: string | JSX.Element;
}

export const Button: React.FC<Iprops> = ({ onSmash, children }) => {
    return (
        <div>
            <button className="p-2 rounded-md bg-red-500 text-white text-lg" onClick={onSmash}>
                {children}
            </button>
        </div>
    );
};

export const NoPropagationButton: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); // stop from propagating to parent
        alert(e.currentTarget.value);
    };
    return (
        <div>
            <button
                onClick={(e) => handleClick(e)}
                value="I am no Propagation button"
                className="p-2 rounded-md bg-blue-500 text-white text-lg"
            >
                No Propagation
            </button>
        </div>
    );
};
