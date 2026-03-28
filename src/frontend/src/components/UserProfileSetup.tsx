import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "@/hooks/useQueries";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserProfileSetup() {
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isFetched && userProfile === null) {
      setOpen(true);
    }
  }, [isFetched, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      toast.success("Profile created successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    }
  };

  if (profileLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome! Set up your profile</DialogTitle>
          <DialogDescription>
            Please enter your name to continue. This will be used for your
            bookings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
