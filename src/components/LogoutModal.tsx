import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in">
      <Card className="w-full max-w-sm mx-4 p-6 slide-up">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Confirm Logout</h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mb-6">
          Are you sure you want to logout? You'll need to sign in again to access your profile.
        </p>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};