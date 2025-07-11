import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
export default function EditProfileDialog({
  openEditProfile,
  setOpenEditProfile,
}: {
  openEditProfile: boolean;
  setOpenEditProfile: (open: boolean) => void;
}) {
  const t = useTranslations("SettingsClient");
  return (
    <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editProfile")}</DialogTitle>
        </DialogHeader>
        {/* Profile form content would go here */}
      </DialogContent>
    </Dialog>
  );
}
