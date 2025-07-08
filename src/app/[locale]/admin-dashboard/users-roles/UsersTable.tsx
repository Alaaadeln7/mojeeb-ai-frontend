import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeyRound, Pencil, ShieldCheck } from "lucide-react";
import { getHueFromName } from "@/helpers/getHueFromName";
import { useTranslations } from "next-intl";
import UsersTableSkeleton from "@/components/skeletons/UsersTableSkeleton";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "client" | string;
  status: "Active" | "Inactive" | "Pending" | string;
  lastActive: string;
}

interface UsersTableProps {
  users?: User[];
  getUsersLoading: boolean;
}

export default function UsersTable({
  users,
  getUsersLoading,
}: UsersTableProps) {
  const t = useTranslations("UsersTable");

  if (getUsersLoading) return <UsersTableSkeleton />;

  return (
    <div className="mt-10 space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("columns.user")}</TableHead>
                <TableHead>{t("columns.role")}</TableHead>
                <TableHead>{t("columns.status")}</TableHead>
                <TableHead>{t("columns.lastActive")}</TableHead>
                <TableHead className="text-right">
                  {t("columns.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full w-10 h-10 font-bold text-xl"
                        style={{
                          backgroundColor: `hsl(${getHueFromName(
                            user.fullName
                          )}, 70%, 60%)`,
                          color: "#000",
                        }}
                      >
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "default"
                          : user.role === "client"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active"
                          ? "default"
                          : user.status === "Inactive"
                          ? "destructive"
                          : user.status === "Pending"
                          ? "warning"
                          : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastActive}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("actions.edit")}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("actions.resetPassword")}
                      >
                        <KeyRound className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("actions.permissions")}
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users?.map((user) => (
          <Card key={user._id}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full w-10 h-10 font-bold text-xl"
                    style={{
                      backgroundColor: `hsl(${getHueFromName(
                        user.fullName
                      )}, 70%, 60%)`,
                      color: "#000",
                    }}
                  >
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    user.status === "Active"
                      ? "default"
                      : user.status === "Inactive"
                      ? "destructive"
                      : user.status === "Pending"
                      ? "warning"
                      : "outline"
                  }
                >
                  {user.status}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">{t("columns.role")}</p>
                  <Badge
                    variant={
                      user.role === "admin"
                        ? "default"
                        : user.role === "client"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {user.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {t("columns.lastActive")}
                  </p>
                  <p>{user.lastActive}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="ghost" size="icon" title={t("actions.edit")}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title={t("actions.resetPassword")}
                >
                  <KeyRound className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title={t("actions.permissions")}
                >
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
