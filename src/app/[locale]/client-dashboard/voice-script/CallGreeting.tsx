"use client";

import { voices } from "@/constants";
import { useSpeakMutation } from "@/store/api/chatbotApiSlice";
import { Loader2, Play } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface VoiceOptions {
  [key: string]: string[];
}

export default function CallGreeting() {
  const t = useTranslations("CallGreeting");
  const [text, setText] = useState("");
  const [lang, setLang] = useState("ar-XA");
  const [voice, setVoice] = useState("ar-XA-Standard-A");
  const [speak, { isLoading }] = useSpeakMutation();

  const handlePlay = async () => {
    if (!text) return;

    try {
      const blob = await speak({
        text,
        languageCode: lang,
        voiceName: voice,
      }).unwrap();

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-lg mt-10">
      <h3 className="text-2xl mb-3 font-semibold bg-gradient-to-r from-[#10a5b1] to-[#3d4d58] bg-clip-text text-transparent">
        {t("title")}
      </h3>

      <div className="flex flex-col gap-4 md:flex-row items-center p-4 rounded-2xl bg-muted/50 border">
        <div className="w-full md:flex-1">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("inputPlaceholder")}
          />
        </div>

        <div className="w-full md:w-auto space-y-2">
          <Label>{t("languageLabel")}</Label>
          <Select
            value={lang}
            onValueChange={(selectedLang) => {
              setLang(selectedLang);
              setVoice((voices as VoiceOptions)[selectedLang][0]);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("languagePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(voices as VoiceOptions).map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto space-y-2">
          <Label>{t("voiceLabel")}</Label>
          <Select
            value={voice}
            onValueChange={(selectedVoice) => setVoice(selectedVoice)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("voicePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {(voices as VoiceOptions)[lang].map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handlePlay}
          disabled={isLoading || !text}
          size="icon"
          className="w-12 h-12 flex-shrink-0"
          aria-label={t("playButtonAria")}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>{t("instructions")}</p>
      </div>
    </Card>
  );
}
