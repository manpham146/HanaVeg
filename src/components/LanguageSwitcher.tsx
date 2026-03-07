"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (value: string) => {
    startTransition(() => {
      router.replace({ pathname }, { locale: value });
    });
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange} disabled={isPending}>
      <SelectTrigger className="w-auto h-auto px-2 py-1 bg-transparent border-0 shadow-none font-medium outline-none focus:ring-0 focus:outline-none disabled:opacity-50 text-inherit [&_svg]:text-inherit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="vi">VI</SelectItem>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="zh">ZH</SelectItem>
      </SelectContent>
    </Select>
  );
}
