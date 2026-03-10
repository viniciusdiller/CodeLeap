"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number | null;
  onSuccess: () => void;
}

export function DeletePostModal({
  isOpen,
  onClose,
  postId,
  onSuccess,
}: DeletePostModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!postId) return;

    setIsLoading(true);
    try {
      await api.deletePost(postId);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-165 w-[95vw] rounded-2xl p-8 gap-6 md:p-10 flex flex-col justify-center min-h-62.2">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold text-black mb-6">
            Are you sure you want to delete this item?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg px-8 border-[#999999] text-black font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="rounded-lg px-8 bg-[#FF5151] hover:bg-[#FF5151]/90 text-white font-bold"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
