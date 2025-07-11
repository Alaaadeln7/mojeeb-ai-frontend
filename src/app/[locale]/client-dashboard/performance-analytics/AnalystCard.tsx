import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface AnalystCardProps {
  title: string;
  number: number | string;
  dir?: "ltr" | "rtl";
}

export default function AnalystCard({ title, number, dir }: AnalystCardProps) {
  const t = useTranslations("AnalystCard");
  const { theme } = useTheme();

  return (
    <Card
      className={`shadow-sm ${theme === "dark" ? "bg-card" : "bg-background"}`}
      dir={dir}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{t(title)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{number}</p>
      </CardContent>
    </Card>
  );
}
