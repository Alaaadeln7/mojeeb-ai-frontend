"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Inquiry } from "@/types/chatbot";

interface KeywordBaseRepliesProps {
  chatbot: Inquiry[];
  setOpenUpdateKeyword: (open: boolean) => void;
  setSelectInquiry: (inquiry: Inquiry) => void;
}

export default function KeywordBaseReplies({
  chatbot,
  setOpenUpdateKeyword,
  setSelectInquiry,
}: KeywordBaseRepliesProps) {
  const { theme } = useTheme();
  const t = useTranslations("KeywordBaseReplies");

  const handleEdit = (item: Inquiry) => {
    setOpenUpdateKeyword(true);
    setSelectInquiry(item);
  };

  return (
    <Card className="mt-6" data-theme={theme}>
      <CardHeader>
        <CardTitle className="text-primary">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("keywordHeader")}</TableHead>
                <TableHead>{t("responseHeader")}</TableHead>
                <TableHead className="text-right">
                  {t("actionsHeader")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatbot?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.keyword}</TableCell>
                  <TableCell className="line-clamp-1">{item.answer}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      {t("editButton")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile/Small Screen View (cards) */}
        <div className="sm:hidden space-y-4">
          {chatbot?.map((item) => (
            <Card key={item._id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{item.keyword}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.answer}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(item)}
                >
                  {t("editButton")}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 flex-wrap">
          <Button variant="outline">{t("restoreButton")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
