"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const locale = params?.locale as string || "vi";
    const supabase = createClient();
    const t = useTranslations("Admin");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push(`/${locale}/admin`);
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-serif text-slate-800 mb-6 text-center">{t("adminLogin")}</h1>
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">{t("password")}</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t("loggingIn") : t("login")}
                    </Button>
                </form>
            </div>
        </div>
    );
}
