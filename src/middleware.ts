import { updateSession } from '@/utils/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
    // First, let next-intl handle the routing and create a response
    const response = handleI18nRouting(request);

    // Then, pass both request and the next-intl response to Supabase to attach session cookies
    return await updateSession(request, response);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(vi|en|zh)/:path*']
};
