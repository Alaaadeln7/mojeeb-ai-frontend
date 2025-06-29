import { useTranslations } from "next-intl";
import Image from "next/image";
import callIcon from "../../../public/featuresImages/call.png";
import aiNetwork from "../../../public/featuresImages/ai-network.png";
import settings from "../../../public/featuresImages/settings.png";
import bell from "../../../public/featuresImages/bell.png";
import translate from "../../../public/featuresImages/translate.png";
import analysis from "../../../public/featuresImages/analysis.png";
export default function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      description: t("feature1.description"),
      icon: callIcon,
    },
    {
      description: t("feature2.description"),
      icon: aiNetwork,
    },
    {
      description: t("feature3.description"),
      icon: settings,
    },
    {
      description: t("feature4.description"),
      icon: bell,
    },
    {
      description: t("feature4.description"),
      icon: translate,
      image: "/feature4.jpg",
    },
    {
      description: t("feature4.description"),
      icon: analysis,
    },
  ];

  return (
    <section className="w-full py-16 bg-teal-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-start text-[#10a5b1] mb-12">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 flex items-center gap-3">
              <Image
                src={feature.icon}
                alt={feature.description}
                className="w-5 h-5"
              />
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
