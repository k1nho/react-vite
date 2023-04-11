import { Button, NoPropagationButton } from "./components/Button";

function App() {
    return (
        <div className="App">
            <div onClick={() => alert("parent activated")}>
                <Button onSmash={() => alert("Smashhhh")}>Power</Button>
                <NoPropagationButton />
            </div>
        </div>
    );
}

export default App;
