import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import routing from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "../../components/molecules/theme-provider";
import Footer from "@/components/molecules/Footer";
import ClientProviderWrapper from "./ClientProviderWrapper";
import { cn } from "@/lib/utils";
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
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        locale === "ar" ? "arabic_font" : "english_font",
        "antialiased"
      )}
    >
      <body>
        <ClientProviderWrapper>
          <NextIntlClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ClientProviderWrapper>
      </body>
    </html>
  );
}
