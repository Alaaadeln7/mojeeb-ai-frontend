import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-screen bg-teal-100">
      <div className="absolute inset-0 bg-[url('/landingPageImage.jpg')] bg-cover bg-center opacity-85"></div>
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-start text-center p-6">
        <h1 className="text-5xl text-start font-bold text-white mb-4">
          {t("title")}
        </h1>
        <div className="flex items-center space-x-3">
          <Button className="bg-teal-600 text-white cursor-pointer">
            {t("getStarted")}
          </Button>
          <Button className="bg-gray-600 text-white cursor-pointer">
            {" "}
            <Play className="size-4" />
            {t("listen")}
          </Button>
        </div>
      </div>
    </section>
  );
}
