import { Button, NoPropagationButton } from "./components/Button";
import { LightSwitch } from "./components/Exercises";
import { Todos } from "./components/Todos"

function App() {
    return (
        <div className="flex flex-col justify-center items-center space-y-8 min-h-screen bg-gray-700">
            <div className="flex space-x-4" onClick={() => alert("parent activated")}>
                <Button onSmash={() => alert("Smashhhh")}>Smash</Button>
                <NoPropagationButton />
            </div>
            <div className="flex">
                <LightSwitch />
            </div>
            <div>
                <Todos />
            </div>
        </div>
    );
}

export default App;
