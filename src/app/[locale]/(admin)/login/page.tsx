"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || "vi";
    const supabase = createClient();
    const t = useTranslations("Auth");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(t("loginError"));
            setLoading(false);
        } else {
            router.push(`/${locale}/admin`);
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        {t("login")}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {t("loginSubtitle")}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("emailPlaceholder")}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">{t("password")}</Label>
                            <Link
                                href={`/${locale}/forgot-password`}
                                className="text-xs text-primary hover:text-primary/80 underline underline-offset-4"
                            >
                                {t("forgotPasswordLink")}
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("passwordPlaceholder")}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t("loginButton")}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    {t("noAccount")}{" "}
                    <Link
                        href={`/${locale}/register`}
                        className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                        {t("register")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
