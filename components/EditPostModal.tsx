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
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-165 w-[95vw] rounded-2xl p-8 gap-6 md:p-10 flex flex-col justify-center min-h-62.2">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold text-black mb-4">
            Edit item
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-title" className="text-base text-black">
              Title
            </label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border-[#777777] focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-content" className="text-base text-black">
              Content
            </label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg border-[#777777] focus-visible:ring-1 focus-visible:ring-black min-h-20"
            />
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-lg px-8 border-[#999999] text-black font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isButtonDisabled}
              className="rounded-lg px-8 bg-[#47B960] hover:bg-[#47B960]/90 text-white font-bold disabled:bg-[#DDDDDD] disabled:text-black"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
