import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["en", "ar"] as const,

  defaultLocale: "en",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});

export default routing;
