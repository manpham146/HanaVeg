import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminBreadcrumb } from '@/components/admin/AdminBreadcrumb';

export default async function AdminLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        redirect(`/${locale}/login`);
    }

    // Role check
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
    if (!profile || profile.role !== 'admin') {
        redirect(`/${locale}/login`);
    }

    return (
        <SidebarProvider>
            <AdminSidebar 
                userEmail={user.email || ''} 
                userRole={profile.role} 
            />
            <SidebarInset>
                <AdminBreadcrumb />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
