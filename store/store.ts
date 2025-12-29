import { create } from 'zustand';
import { Todo } from '@/utils/interfaces';

interface TodoStore {
    todos: Todo[]
    addTodo: (todo: Todo) => void
    addAllTodo: (todos: Todo[]) => void
    updateTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

export const useTodo = create<TodoStore>((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    addAllTodo: (todos) => set(() => ({ todos: todos })),
    updateTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) => {
            return todo.id == id ? { ...todo, completed: true } : todo
        })
    })),
    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
    }))
}));