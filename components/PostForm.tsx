"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface PostFormProps {
  onSuccess?: () => void;
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const username = useSelector((state: RootState) => state.user.username);

  const isButtonDisabled =
    title.trim() === "" || content.trim() === "" || isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled || !username) return;

    setIsLoading(true);

    try {
      await api.createPost({
        username: username,
        title: title.trim(),
        content: content.trim(),
      });

      setTitle("");
      setContent("");
      if (onSuccess) onSuccess();
      toast.success("Post created successfully!");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7695EC", "#ffffff", "#000000"],
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-[#999999] dark:border-zinc-700 dark:bg-zinc-800 rounded-xl shadow-none transition-colors duration-300">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-[22px] font-bold text-black dark:text-zinc-100">
          What&apos;s on your mind?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-base text-black dark:text-zinc-300 font-medium"
            >
              Title
            </label>
            <Input
              id="title"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border-[#777777] dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-[#7695EC] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="content"
              className="text-base text-black dark:text-zinc-300 font-medium"
            >
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg border-[#777777] dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-[#7695EC] min-h-20 resize-y transition-colors"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="bg-[#7695EC] text-white font-bold rounded-lg px-8 min-w-30 
                         transition-all duration-200 ease-in-out cursor-pointer
                         hover:bg-[#7695EC]/90 hover:scale-[1.03] active:scale-95
                         disabled:bg-[#DDDDDD] disabled:text-black disabled:opacity-100 
                         dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400
                         disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#DDDDDD] dark:disabled:hover:bg-zinc-700"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
