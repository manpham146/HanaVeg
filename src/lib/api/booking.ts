import { createClient } from '@/utils/supabase/client';
import type { BookingRequest } from '@/types';

/**
 * Submit a booking request to Supabase.
 * Keeps data logic out of UI components (API-First principle).
 */
export async function submitBooking(data: BookingRequest) {
    const supabase = createClient();

    const { error } = await supabase
        .from('bookings')
        .insert({
            guest_name: data.name,
            guest_phone: data.phone,
            party_size: parseInt(data.persons, 10),
            booking_time: data.time,
            booking_date: data.date,
            note: data.note,
            status: 'pending',
        });

    if (error) {
        throw new Error(error.message);
    }

    return { success: true };
}
