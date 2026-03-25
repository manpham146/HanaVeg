"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { resetPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const params = useParams();
    const locale = (params?.locale as string) || "vi";
    const t = useTranslations("Auth");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await resetPassword(email);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(true);
        }
        setLoading(false);
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
                        {t("forgotPassword")}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">
                        {t("forgotPasswordSubtitle")}
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm text-center border border-green-100">
                            <p className="font-medium">{t("checkEmail")}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("email")}</Label>
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
                            <Button
                                type="submit"
                                className="w-full h-10 bg-[#D4A100] hover:bg-[#C09300] text-white font-medium transition-colors"
                                disabled={loading}
                            >
                                {loading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {t("continueButton")}
                            </Button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        <Link
                            href={`/${locale}/login`}
                            className="font-medium text-[#D4A100] hover:text-[#C09300] transition-colors"
                        >
                            ← {t("login")}
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
