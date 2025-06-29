"use client";

import { useTranslations } from "next-intl";
import { Facebook, Linkedin, MessageCircle, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-[#3d4d58] text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href={t("facebookLink")} target="_blank" rel="noopener noreferrer">
            <Facebook className="size-5" />
          </a>
          <a href={t("twitterLink")} target="_blank" rel="noopener noreferrer">
            <Twitter className="size-5" />
          </a>
          <a href={t("linkedinLink")} target="_blank" rel="noopener noreferrer">
            <Linkedin className="size-5" />
          </a>
          <a href={t("whatsappLink")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="s" />
          </a>
        </div>
        <nav className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/about" className="hover:text-white">
            {t("about")}
          </Link>
          <Link href="/services" className="hover:text-white">
            {t("services")}
          </Link>
          <Link href="/contact" className="hover:text-white">
            {t("contact")}
          </Link>
        </nav>
        <div className="text-center md:text-right">
          <p>{t("phone")}</p>
          <p>{t("email")}</p>
          <p>{t("address")}</p>
          <p className="mt-2">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
