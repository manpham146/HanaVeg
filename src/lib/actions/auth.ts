'use server';

import { createClient } from '@/utils/supabase/server';

export async function registerUser(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { role: 'staff' },
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function resetPassword(email: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}
