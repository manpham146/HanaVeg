"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
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
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Form */}
            <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-16 xl:px-24">
                {/* Form content */}
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex items-center gap-4 mb-10">
                        <Image
                            src="/images/hana-badge.png"
                            alt="Hana"
                            width={80}
                            height={80}
                            className=""
                        />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-tight text-[#0B1C10]">
                                {locale === "vi"
                                    ? "Nhà hàng chay Hana"
                                    : locale === "zh"
                                      ? "Hana素食餐厅"
                                      : "Hana Vegetarian"}
                            </span>
                            <span className="text-sm text-muted-foreground">Admin Panel</span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-[#0B1C10] mb-1">
                        {t("login")}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">
                        {t("loginSubtitle")}
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("emailPlaceholder")}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    {t("password")}
                                </Label>
                                <Link
                                    href={`/${locale}/forgot-password`}
                                    className="text-xs font-medium text-[#0B1C10] underline underline-offset-4 hover:text-[#D4A100] transition-colors"
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder={t("passwordPlaceholder")}
                                    className="h-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                            className="w-full h-10 bg-[#D4A100] hover:bg-[#C09300] text-white font-medium transition-colors"
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
                            className="font-medium text-[#D4A100] hover:text-[#C09300] transition-colors"
                        >
                            {t("register")}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block relative">
                <Image
                    src="/images/hana-restaurant.png"
                    alt="Hana Vegetarian Restaurant"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                />
                {/* Subtle overlay for branding */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C10]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                        Nhà hàng Chay
                    </p>
                    <p className="text-white text-3xl font-bold tracking-tight mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Hana
                    </p>
                    <p className="text-white/70 text-sm mt-2">
                        An nhiên trong từng trải nghiệm ẩm thực
                    </p>
                </div>
            </div>
        </div>
    );
}
