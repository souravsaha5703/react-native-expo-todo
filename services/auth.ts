import { supabase } from "@/supabase/supabase";
import * as Linking from 'expo-linking';

export async function signUpNewUser(userEmail: string, userPass: string) {
    const redirectTo = Linking.createURL('/');

    const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPass,
        options: {
            emailRedirectTo: redirectTo,
        },
    });

    return { data, error }
}

export async function signInWithEmail(userEmail: string, userPass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPass,
    });

    return { data, error }
}