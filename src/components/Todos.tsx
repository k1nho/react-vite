import useTodoStore from "../store";

export const Todos: React.FC = () => {
    const store = useTodoStore();
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <h1 className="text-white text-2xl">Todos</h1>
            <div className="flex space-x-4 justify-center">
                <input
                    type="text"
                    value={store.newTodo}
                    onChange={(e) => store.setNewTodo(e.target.value)}
                    className="p-2 bg-gray=50 rounded-md"
                />
                <button
                    onClick={store.addTodo}
                    className="p-2 rounded-md text-lg bg-blue-500 text-white"
                >
                    add todo
                </button>
            </div>
            <TodoListItem />
        </div>
    );
};

export const TodoListItem: React.FC = () => {
    const store = useTodoStore();
    return (
        <div className="flex-col space-y-4">
            {store.todos.map((todo) => (
                <div
                    className="flex space-x-2 justify-center items-center"
                    key={todo.id}
                >
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => store.toggleTodo(todo.id)}
                        className=" p-2 rounded-sm bg-gray-500"
                    />
                    <input
                        type="text"
                        onChange={(e) => store.updateTodo(todo.id, e.target.value)}
                        value={todo.text}
                        className="p-2 bg-gray=50 rounded-md"
                    />
                    <button
                        className="p-2 rounded-md bg-red-500 text-white"
                        onClick={() => store.deleteTodo(todo.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};
