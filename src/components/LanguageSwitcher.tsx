"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  };

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      disabled={isPending}
      className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer disabled:opacity-50"
    >
      <option value="vi">VI</option>
      <option value="en">EN</option>
      <option value="zh">ZH</option>
    </select>
  );
}
