import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
