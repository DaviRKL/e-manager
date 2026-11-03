import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { poppins, roboto } from "@/utils/fonts";
import { GlobalProvider } from "@/components/providers";
import "../globals.css";

export const metadata: Metadata = {
  title: "e-manager",
  description: "e-manager application",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${roboto.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <GlobalProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
