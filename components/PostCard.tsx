"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Trash2, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onDeleteClick?: (id: number) => void;
  onEditClick?: (post: Post) => void;
}

export function PostCard({ post, onDeleteClick, onEditClick }: PostCardProps) {
  const currentUsername = useSelector(
    (state: RootState) => state.user.username,
  );

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
        <div className="flex justify-between items-center text-[#777777] text-lg font-bold">
          <span>@{post.username}</span>
          <span className="text-sm font-normal">{timeAgo}</span>
        </div>

        <p className="text-black text-lg wrap-break-words whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
    </div>
  );
}
