// Exercises

import { useState } from "react";
import { Background } from "./Background";
import { Box } from "./Box";

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
        <button
            onClick={handleClick}
            className="bg-green-500 text-white text-xl rounded-md p-2"
        >
            {text}
        </button>
    );
};
// EX2) Responding to events
export const ColorSwitch: React.FC<Iprops> = ({ onChangeColor }) => {
    const handleColorChange = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        onChangeColor();
    };
    return <button onClick={(e) => handleColorChange(e)}>Change color</button>;
};

// State as snapshot
// Ex)
export const TrafficLight: React.FC = () => {
    const [walk, setWalk] = useState(false);

    function handleClick() {
        alert(walk ? "Next up is stop" : "Next up is walk"); // after or before setWalk does not change the result, since state is always queued to the next render cycle
        setWalk(!walk);
    }

    return (
        <div>
            <button
                className="p-4 h-2 w-2 rounded-md bg-indigo-500 text-xl"
                onClick={handleClick}
            >
                Change to {walk ? "stop" : "walk"}
            </button>
            <p>{walk ? "Walk" : "Stop"}</p>
        </div>
    );
};

// Queueing state with updater funcs
//EX1)
export const RequestTracker: React.FC = () => {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    async function handleClick() {
        setPending((p) => p + 1);
        alert(pending);
        await delay(3000);
        setPending((p) => p - 1);
        setCompleted((c) => c + 1);
    }

    return (
        <>
            <h3>Pending: {pending}</h3>
            <h3>Completed: {completed}</h3>
            <button onClick={handleClick}>Buy</button>
        </>
    );
};

function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// EX2)
export const getFinalState = (
    baseState: number,
    queue: Array<number | ((n: number) => number)>
) => {
    let finalState = baseState;

    // TODO: do something with the queue...
    for (let i = 0; i < queue.length; i++) {
        if (typeof queue[i] === "number") finalState = queue[i] as number;
        else {
            let f = queue[i] as (n: number) => number;
            finalState = f(finalState);
        }
    }

    return finalState;
};

// Updating Objects
// EX1)
export const Scoreboard = () => {
    const [player, setPlayer] = useState({
        firstName: "Ranjani",
        lastName: "Shettar",
        score: 10,
    });

    function handlePlusClick() {
        setPlayer({ ...player, score: player.score + 1 });
    }

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayer({
            ...player,
            firstName: e.target.value,
        });
    }

    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayer({
            ...player,
            lastName: e.target.value,
        });
    }

    return (
        <>
            <label>
                Score: <b>{player.score}</b>{" "}
                <button onClick={handlePlusClick}>+1</button>
            </label>
            <label>
                First name:
                <input value={player.firstName} onChange={handleFirstNameChange} />
            </label>
            <label>
                Last name:
                <input value={player.lastName} onChange={handleLastNameChange} />
            </label>
        </>
    );
};

const initialPosition = { x: 0, y: 0 };
export default function Canvas() {
    const [shape, setShape] = useState({
        color: "orange",
        position: initialPosition,
    });

    function handleMove(dx: number, dy: number) {
        setShape({
            ...shape,
            position: { x: shape.position.x + dx, y: shape.position.y + dy },
        });
    }

    function handleColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setShape({
            ...shape,
            color: e.target.value,
        });
    }

    return (
        <>
            <select value={shape.color} onChange={handleColorChange}>
                <option value="orange">orange</option>
                <option value="lightpink">lightpink</option>
                <option value="aliceblue">aliceblue</option>
            </select>
            <Background position={initialPosition} />
            <Box color={shape.color} position={shape.position} onMove={handleMove}>
                Drag me!
            </Box>
        </>
    );
}

// Updating arrays
// EX1) arrays of objects

const initialProducts = [
    {
        id: 0,
        name: "Baklava",
        count: 1,
    },
    {
        id: 1,
        name: "Cheese",
        count: 5,
    },
    {
        id: 2,
        name: "Spaghetti",
        count: 2,
    },
];

export const ShoppingCart = () => {
    const [products, setProducts] = useState(initialProducts);

    function handleIncreaseClick(productId: number) {
        const newProds = [...products];

        setProducts(
            newProds.map((prod) => {
                if (prod.id === productId) {
                    return { ...prod, count: prod.count + 1 };
                } else return prod;
            })
        );
    }
    function handleDecreaseClick(productId: number, cnt: number) {
        if (cnt === 1) {
            setProducts(products.filter((product) => product.id !== productId));
        } else {
            setProducts(
                products.map((product) => {
                    if (product.id === productId) {
                        return { ...product, count: product.count - 1 };
                    } else return product;
                })
            );
        }
    }

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    {product.name} (<b>{product.count}</b>)
                    <button
                        onClick={() => {
                            handleIncreaseClick(product.id);
                        }}
                    >
                        {" "}
                        +{" "}
                    </button>
                    <button
                        onClick={() => handleDecreaseClick(product.id, product.count)}
                    >
                        -
                    </button>
                </li>
            ))}
        </ul>
    );
};

// Reacting to input state
// EX1)
export const Picture = () => {
    const [bgActive, setBgActive] = useState(true);
    return (
        <div
            className={`background ${bgActive && "background--active"}`}
            onClick={() => setBgActive(true)}
        >
            <img
                className={`picture ${!bgActive && "picture--active"}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setBgActive(false);
                }}
                alt="Rainbow houses in Kampung Pelangi, Indonesia"
                src="https://i.imgur.com/5qwVYb1.jpeg"
            />
        </div>
    );
};
//EX2)
export const EditProfile = () => {
    const [firstName, setFirstName] = useState("Jane");
    const [lastName, setLastName] = useState("Jacobs");
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();
        setEditMode(!editMode);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First name:{" "}
                {editMode ? (
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                ) : (
                    <b>{firstName}</b>
                )}
            </label>
            <label>
                Last name:{" "}
                {editMode ? (
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                ) : (
                    <b>{lastName}</b>
                )}
            </label>
            <button type="submit">
                {editMode ? "Save Profile" : "Edit Profile"}
            </button>
            <p>
                <i>Hello, {firstName + " " + lastName}!</i>
            </p>
        </form>
    );
};

// Choosing the state structure
// EX4)
const letters = [
    {
        id: 0,
        subject: "Ready for adventure?",
        isStarred: true,
    },
    {
        id: 1,
        subject: "Time to check in!",
        isStarred: false,
    },
    {
        id: 2,
        subject: "Festival Begins in Just SEVEN Days!",
        isStarred: false,
    },
];

interface Letter {
    letter: { id: number; subject: string; isStarred: boolean };
    onToggle: (id: number) => void;
    isSelected: boolean;
}

export const MailClient = () => {
    const [ids, setIds] = useState<number[]>([]);

    // TODO: allow multiple selection
    const selectedCount = ids.length;

    function handleToggle(toggledId: number) {
        if (!ids.includes(toggledId)) setIds([...ids, toggledId]);
        else setIds(ids.filter((id) => id !== toggledId));
    }

    return (
        <>
            <h2>Inbox</h2>
            <ul>
                {letters.map((letter) => (
                    <Letter
                        key={letter.id}
                        letter={letter}
                        isSelected={
                            // TODO: allow multiple selection
                            ids.includes(letter.id)
                        }
                        onToggle={handleToggle}
                    />
                ))}
                <hr />
                <p>
                    <b>You selected {selectedCount} letters</b>
                </p>
            </ul>
        </>
    );
};

export const Letter: React.FC<Letter> = ({ letter, onToggle, isSelected }) => {
    {
        return (
            <li className={isSelected ? "selected" : ""}>
                <label>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                            onToggle(letter.id);
                        }}
                    />
                    {letter.subject}
                </label>
            </li>
        );
    }
};

// Sharing State Between Components
// Ex1)
export const SyncedInputs = () => {
    const [text, setText] = useState("");
    return (
        <>
            <Input label="First input" text={text} onTextChange={setText} />
            <Input label="Second input" text={text} onTextChange={setText} />
        </>
    );
};

function Input({
    label,
    text,
    onTextChange,
}: {
    label: string;
    text: string;
    onTextChange: React.Dispatch<React.SetStateAction<string>>;
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onTextChange(e.target.value);
    }
    return (
        <label>
            {label} <input value={text} onChange={handleChange} />
        </label>
    );
}

interface Item {
    id: number,
    name: string,
    description: string
}

// Ex2)
const filterItems = (items: Item[], query: string): Item[] => {
    query = query.toLowerCase();
    return items.filter(item =>
        item.name.split(' ').some(word =>
            word.toLowerCase().startsWith(query)
        )
    );
}

const foods = [
    {
        id: 0,
        name: "pizza",
        description: "its a pizza"
    },
    {
        id: 1,
        name: "lobster",
        description: "its a lobster"
    }
]


export const FilterableList = () => {
    const [query, setQuery] = useState('');
    let items = filterItems(foods, query)
    return (
        <>
            <SearchBar query={query} onQueryChange={setQuery} />
            <hr />
            <List items={items} />
        </>
    );
}

function SearchBar({ query, onQueryChange }: { query: string, onQueryChange: React.Dispatch<React.SetStateAction<string>> }) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onQueryChange(e.target.value);
    }

    return (
        <label>
            Search:{' '}
            <input
                value={query}
                onChange={handleChange}
            />
        </label>
    );
}

function List({ items }: { items: Item[] }) {
    return (
        <table>
            <tbody>
                {items.map(food => (
                    <tr key={food.id}>
                        <td>{food.name}</td>
                        <td>{food.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Preserving and Resetting state
// EX1) The hint problem
export const HintApp = () => {
    const [showHint, setShowHint] = useState(false);

    return (
        <div>
            {showHint && <p><i>Hint: Your favorite city?</i></p>}
            <Form />
            <button onClick={() => {
                setShowHint(!showHint);
            }}>{showHint ? "Hide hint" : "Show Hint"}</button>
        </div>
    );
}

function Form() {
    const [text, setText] = useState('');
    return (
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
        />
    );
}

// EX2) The reverse problem

export const ReverseApp = () => {
    const [reverse, setReverse] = useState(false);
    let checkbox = (
        <label>
            <input
                type="checkbox"
                checked={reverse}
                onChange={e => setReverse(e.target.checked)}
            />
            Reverse order
        </label>
    );
    if (reverse) {
        return (
            <>
                <Field key="last" label="Last name" />
                <Field key="first" label="First name" />
                {checkbox}
            </>
        );
    } else {
        return (
            <>
                <Field key="first" label="First name" />
                <Field key="last" label="Last name" />
                {checkbox}
            </>
        );
    }
}

function Field({ label }: { label: string }) {
    const [text, setText] = useState('');
    return (
        <label>
            {label}:{' '}
            <input
                type="text"
                value={text}
                placeholder={label}
                onChange={e => setText(e.target.value)}
            />
        </label>
    );
}
