import { useTranslations } from "next-intl";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function KeywordInsights() {
  const t = useTranslations("KeywordInsights");

  // Translated keywords
  const keywords = [
    t("keywords.appointment"),
    t("keywords.hours"),
    t("keywords.price"),
    t("keywords.services"),
    t("keywords.location"),
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold capitalize">{t("title")}</h2>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2">
          {keywords.map((keyword, index) => (
            <li
              key={index}
              className="hover:bg-secondary/50 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              <span className="font-medium">{keyword}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
