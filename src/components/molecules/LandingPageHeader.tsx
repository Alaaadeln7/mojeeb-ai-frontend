"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoImage from "../../../public/mojeb-ai-logo.png";
export default function LandingPageHeader() {
  const t = useTranslations("Header");

  return (
    <header className="w-full bg-white shadow-md container p-4 ">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-teal-600">
          <Link href={"/"}>
            <Image src={LogoImage} alt={"logo image"} className="w-14" />
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/">{t("home")}</Link>
          </li>
          <li>
            <Link href="/features">{t("features")}</Link>
          </li>
          <li>
            <Link href="/pricing">{t("pricing")}</Link>
          </li>
          <li>
            <Link href="/contact">{t("contact")}</Link>
          </li>
        </ul>
        <Button
          onClick={() => {
            window.location.href = "/auth/login";
          }}
          className="bg-primary"
        >
          {t("getStarted")}
        </Button>
      </nav>
    </header>
  );
}
