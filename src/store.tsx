import { create } from "zustand"


interface Todo {
    id: number,
    text: string,
    done: boolean
}

const createTodo = (todos: Todo[], text: string): Todo[] => {
    return [...todos, { id: Math.max(0, Math.max(...todos.map(({ id }) => id)) + 1), text, done: false }]
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] => {
    return todos.map((todo) => ({
        ...todo,
        text: todo.id === id ? text : todo.text,
    }));
}

const deleteTodo = (todos: Todo[], id: number): Todo[] => {
    return todos.filter((todo) => todo.id !== id);
}

const toggleTodo = (todos: Todo[], id: number) => {
    return todos.map((todo) => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done
    }));
}

interface Store {
    todos: Todo[],
    newTodo: string,
    addTodo: () => void
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
    toggleTodo: (id: number) => void;
    setNewTodo: (text: string) => void
}


// store
const useTodoStore = create<Store>()((set) => ({
    todos: [],
    newTodo: "",
    addTodo() {
        set((state) => ({
            todos: createTodo(state.todos, state.newTodo),
            newTodo: ""
        }))
    },
    setNewTodo(text) {
        set((state) => ({
            ...state,
            newTodo: text
        }))
    },
    deleteTodo(id) {
        set((state) => ({
            ...state,
            todos: deleteTodo(state.todos, id)
        }))
    },
    updateTodo(id, text) {
        set((state) => ({
            ...state,
            todos: updateTodo(state.todos, id, text)
        }))
    },
    toggleTodo(id) {
        set((state) => ({
            ...state,
            todos: toggleTodo(state.todos, id)
        }))
    },
}));

export default useTodoStore;
