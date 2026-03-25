"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { registerUser } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const params = useParams();
    const locale = (params?.locale as string) || "vi";
    const t = useTranslations("Auth");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError(t("passwordMismatch"));
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        const result = await registerUser(email, password);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        {t("register")}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {t("registerSubtitle")}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm text-center">
                        <p className="font-medium mb-2">✓ {t("checkEmail")}</p>
                        <Link
                            href={`/${locale}/login`}
                            className="text-primary underline underline-offset-4 text-sm hover:text-primary/80"
                        >
                            {t("login")}
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
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
                            <Label htmlFor="password">{t("password")}</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("passwordPlaceholder")}
                                minLength={6}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                {t("confirmPassword")}
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder={t("confirmPasswordPlaceholder")}
                                minLength={6}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {t("registerButton")}
                        </Button>
                    </form>
                )}

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    {t("hasAccount")}{" "}
                    <Link
                        href={`/${locale}/login`}
                        className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                        {t("login")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
