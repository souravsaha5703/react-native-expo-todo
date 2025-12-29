import { supabase } from "@/supabase/supabase";
import { Todo } from "@/utils/interfaces";

interface NewTodo {
    task: string
    priority: number
    due_date: Date
}

export const insertData = async (todo: NewTodo) => {
    const { data, error } = await supabase
        .from('todos')
        .insert(todo)
        .select()

    return { data, error }
}

export const fetchData = async () => {
    const { data, error } = await supabase
        .from('todos')
        .select()

    return { data, error }
}

export const updateData = async (todoId: string) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ completed: true })
        .eq('id', todoId)
        .select()

    return { data, error }
}

export const deleteData = async (todoId: string) => {
    const response = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId)
}