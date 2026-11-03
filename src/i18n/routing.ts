import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["pt-br", "en-us"],
  defaultLocale: "pt-br",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
