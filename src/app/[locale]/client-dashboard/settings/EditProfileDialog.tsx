"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useClient from "@/hooks/useClient";

export default function EditProfileDialog({
  openEditProfile,
  setOpenEditProfile,
}: {
  openEditProfile: boolean;
  setOpenEditProfile: (open: boolean) => void;
}) {
  const { currentClient } = useClient();

  return (
    <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              defaultValue={currentClient?.name || ""}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={currentClient?.email || ""}
              placeholder="Enter email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              defaultValue={currentClient?.phone || ""}
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              defaultValue={currentClient?.address || ""}
              placeholder="Enter company address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              defaultValue={currentClient?.website || ""}
              placeholder="Enter website URL"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpenEditProfile(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenEditProfile(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
