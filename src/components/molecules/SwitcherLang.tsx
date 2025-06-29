import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SwitcherLang() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>language</SelectLabel>
          <SelectItem value="en" onClick={() => switchLocale("en")}>
            <div className="flex items-center gap-2">
              <span>🇬🇧</span>
              <span>English</span>
            </div>
          </SelectItem>
          <SelectItem value="ar" onClick={() => switchLocale("ar")}>
            <div className="flex items-center gap-2">
              <span>🇸🇦</span>
              <span>العربية</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
