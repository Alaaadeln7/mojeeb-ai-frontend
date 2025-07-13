"use client";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  FileText,
  DollarSign,
  Globe,
  Info,
} from "lucide-react";
import useClient from "@/hooks/useClient";
import { Button } from "@/components/ui/button";

export default function ProfileInfoDialog({
  isOpenProfile,
  setIsOpenProfile,
}: {
  isOpenProfile: boolean;
  setIsOpenProfile: (open: boolean) => void;
}) {
  const t = useTranslations("Profile");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { currentClient } = useClient();

  if (!currentClient) {
    return (
      <Dialog open={isOpenProfile} onOpenChange={setIsOpenProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="space-y-2 text-center">
                  <Info className="mx-auto h-10 w-10 text-destructive" />
                  <DialogTitle>{t("Error.title")}</DialogTitle>
                  <DialogDescription>
                    {t("Error.description")}
                  </DialogDescription>
                </div>

                <div className="space-y-2 text-sm">
                  <h4 className="font-medium text-foreground">
                    {t("Error.possibleReasons.title")}
                  </h4>
                  <ul className="space-y-1 text-muted-foreground list-disc pl-5">
                    <li>{t("Error.possibleReasons.reason1")}</li>
                    <li>{t("Error.possibleReasons.reason2")}</li>
                    <li>{t("Error.possibleReasons.reason3")}</li>
                  </ul>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpenProfile(false)}>
                {t("Error.close")}
              </Button>
              <Button onClick={() => window.location.reload()}>
                {t("Error.tryAgain")}
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <Dialog open={isOpenProfile} onOpenChange={setIsOpenProfile}>
      <DialogContent
        className="max-w-9xl rounded-3xl p-0 overflow-hidden border-0 max-h-[95vh]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div
          className="bg-background rounded-3xl shadow-2xl w-full overflow-hidden relative"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-primary to-primary/90 p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="relative flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="bg-background/20 backdrop-blur-sm rounded-2xl p-4 border">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-3xl text-primary-foreground mb-2">
                    {t("Modal.title")}
                  </DialogTitle>
                  <Badge variant="secondary" className="text-sm">
                    {t("Modal.id")}:{" "}
                    <span className="font-mono">{currentClient._id}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Scrollable Content */}
          <CardContent className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Main Info Section */}
              <motion.div
                variants={itemVariants}
                className="bg-secondary/30 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-2">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  {t("Modal.companyInfo")}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <InfoCard
                      icon={<User className="h-5 w-5 text-blue-600" />}
                      title={t("Modal.companyName")}
                      value={currentClient.name}
                      iconBg="bg-blue-100"
                    />
                    <InfoCard
                      icon={<MapPin className="h-5 w-5 text-green-600" />}
                      title={t("Modal.address")}
                      value={currentClient.address}
                      iconBg="bg-green-100"
                    />
                    <InfoCard
                      icon={<Phone className="h-5 w-5 text-purple-600" />}
                      title={t("Modal.phone")}
                      value={currentClient.phone}
                      iconBg="bg-purple-100"
                      isMono
                    />
                    <InfoCard
                      icon={<Mail className="h-5 w-5 text-red-600" />}
                      title={t("Modal.email")}
                      value={currentClient.email}
                      iconBg="bg-red-100"
                    />
                  </div>

                  <div className="space-y-6">
                    <InfoCard
                      icon={<Briefcase className="h-5 w-5 text-orange-600" />}
                      title={t("Modal.industry")}
                      value={currentClient.industry}
                      iconBg="bg-orange-100"
                    />
                    <InfoCard
                      icon={<Users className="h-5 w-5 text-teal-600" />}
                      title={t("Modal.companySize")}
                      value={currentClient.size}
                      iconBg="bg-teal-100"
                    />
                    <InfoCard
                      icon={<FileText className="h-5 w-5 text-indigo-600" />}
                      title={t("Modal.commercialRegister")}
                      value={currentClient.commercialRegister}
                      iconBg="bg-indigo-100"
                      isMono
                    />
                    <InfoCard
                      icon={<DollarSign className="h-5 w-5 text-yellow-600" />}
                      title={t("Modal.taxId")}
                      value={currentClient.taxId}
                      iconBg="bg-yellow-100"
                      isMono
                    />
                  </div>
                </div>
              </motion.div>

              {/* Website Section */}
              <motion.div
                variants={itemVariants}
                className="bg-secondary/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-2">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">
                    {t("Modal.website")}
                  </span>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm">
                  <a
                    href={currentClient.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    {currentClient.website}
                  </a>
                </div>
              </motion.div>

              {/* Description Section */}
              <motion.div
                variants={itemVariants}
                className="bg-secondary/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-2">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">
                    {t("Modal.description")}
                  </span>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm">
                  <p className="leading-relaxed">{currentClient.description}</p>
                </div>
              </motion.div>

              {/* Footer Info */}
              <motion.div variants={itemVariants} className="rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <Badge variant="outline" className="gap-2">
                      <Info className="h-4 w-4" />
                      {t("Modal.created")}:{" "}
                      {new Date(currentClient.createdAt).toLocaleDateString(
                        locale
                      )}
                    </Badge>
                    <Badge variant="outline" className="gap-2">
                      <Info className="h-4 w-4" />
                      {t("Modal.updated")}:{" "}
                      {new Date(currentClient.updatedAt).toLocaleDateString(
                        locale
                      )}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

function InfoCard({
  icon,
  title,
  value,
  iconBg,
  isMono = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
  isMono?: boolean;
}) {
  return (
    <div className="bg-background rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`${iconBg} rounded-lg p-2`}>{icon}</div>
        <span className="font-semibold">{title}</span>
      </div>
      <p className={`ml-11 ${isMono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
