import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import routing from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "../../components/molecules/theme-provider";
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

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={locale === "ar" ? "arabic_font" : "english_font"}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
