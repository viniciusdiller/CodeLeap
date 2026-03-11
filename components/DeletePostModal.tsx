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
import { toast } from "sonner";

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
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-165 w-[95vw] rounded-2xl p-8 gap-6 md:p-10 flex flex-col justify-center min-h-62.2 dark:bg-zinc-800 dark:border-zinc-700 transition-colors duration-500 ease-in-out">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold text-black dark:text-zinc-100 mb-6 transition-colors duration-500">
            Are you sure you want to delete this item?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg px-8 border-[#999999] text-black dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 font-bold transition-colors duration-500 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="rounded-lg px-8 bg-[#FF5151] hover:bg-[#FF5151]/90 text-white font-bold transition-colors duration-500 cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
