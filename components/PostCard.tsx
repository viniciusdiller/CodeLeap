"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Trash2, Edit, Heart, MessageSquare, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/types";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  onDeleteClick?: (id: number) => void;
  onEditClick?: (post: Post) => void;
}

const formatSmartText = (text: string) => {
  const regex = /(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.match(regex)) {
      return (
        <span
          key={index}
          className="text-[#7695EC] font-semibold hover:underline cursor-pointer"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export function PostCard({ post, onDeleteClick, onEditClick }: PostCardProps) {
  const currentUsername = useSelector(
    (state: RootState) => state.user.username,
  );

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    (post.id % 12) + (isLiked ? 1 : 0),
  );
  const [commentsCount, setCommentsCount] = useState(post.id % 5);

  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentsCount((prev) => prev + 1);
    setCommentText("");
    setIsCommenting(false);
    toast.success("Comment added successfully!");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${post.title}\n\n${post.content}\n\n-- Shared from CodeLeap Network`,
      );
      toast.success("Post copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text.");
    }
  };

  const isOwner = currentUsername === post.username;

  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  return (
    <div className="w-full flex flex-col border border-[#999999] rounded-xl overflow-hidden shadow-none transition-all duration-500 hover:shadow-lg hover:border-[#7695EC]/50 animate-in fade-in slide-in-from-bottom-8 ">
      <div className="bg-[#7695EC] p-6 flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-white truncate pr-4">
          {post.title}
        </h2>

        {isOwner && (
          <div className="flex items-center gap-6">
            <button
              onClick={() => onDeleteClick && onDeleteClick(post.id)}
              className="text-white hover:opacity-80 transition-opacity hover:cursor-pointer"
            >
              <Trash2 size={24} />
            </button>
            <button
              onClick={() => onEditClick && onEditClick(post)}
              className="text-white hover:opacity-80 transition-opacity hover:cursor-pointer"
            >
              <Edit size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-white flex flex-col gap-4">
        <div className="flex justify-between items-center text-[#777777] text-lg font-bold mb-4">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${post.username}&background=random&color=fff&rounded=true&bold=true`}
              alt={`${post.username} avatar`}
              className="w-8 h-8 rounded-full shadow-sm"
            />
            <span>@{post.username}</span>
          </div>
          <span className="text-sm font-normal">{timeAgo}</span>
        </div>

        <p className="text-black text-lg wrap-break-words whitespace-pre-wrap">
          {formatSmartText(post.content)}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
              <span className="font-bold">{likesCount}</span>
            </button>

            <button
              onClick={() => setIsCommenting(!isCommenting)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#7695EC] transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare size={22} />
              <span className="font-bold">{commentsCount}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            title="Share Post"
            className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Share2 size={22} />
          </button>
        </div>

        {isCommenting && (
          <form
            onSubmit={handleCommentSubmit}
            className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border border-[#999999] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7695EC] transition-all"
              autoFocus
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-[#7695EC] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#7695EC]/90 disabled:opacity-50 transition-all cursor-pointer"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
