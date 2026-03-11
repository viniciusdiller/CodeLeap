"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onSuccess: () => void;
}

export function EditPostModal({
  isOpen,
  onClose,
  post,
  onSuccess,
}: EditPostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const isButtonDisabled =
    title.trim() === "" || content.trim() === "" || isLoading;

  const handleSave = async () => {
    if (!post || isButtonDisabled) return;

    setIsLoading(true);
    try {
      await api.updatePost(post.id, {
        title: title.trim(),
        content: content.trim(),
      });
      onSuccess();
      onClose();
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-165 w-[95vw] rounded-2xl p-8 gap-6 md:p-10 flex flex-col justify-center min-h-62.2 dark:bg-zinc-800 dark:border-zinc-700 transition-colors duration-500 ease-in-out">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold text-black dark:text-zinc-100 mb-4 transition-colors duration-500">
            Edit item
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-title"
              className="text-base text-black dark:text-zinc-300 transition-colors duration-500"
            >
              Title
            </label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border-[#777777] dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-[#7695EC] transition-colors duration-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-content"
              className="text-base text-black dark:text-zinc-300 transition-colors duration-500"
            >
              Content
            </label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg border-[#777777] dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-[#7695EC] min-h-20 transition-colors duration-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-lg px-8 border-[#999999] text-black dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 font-bold transition-colors duration-500 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isButtonDisabled}
              className="rounded-lg px-8 bg-[#47B960] hover:bg-[#47B960]/90 text-white font-bold disabled:bg-[#DDDDDD] disabled:text-black dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400 transition-colors duration-500 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
