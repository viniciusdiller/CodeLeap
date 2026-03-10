"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PostForm } from "@/components/PostForm";
import { PostCard } from "@/components/PostCard";
import { DeletePostModal } from "@/components/DeletePostModal";
import { EditPostModal } from "@/components/EditPostModal";
import { api } from "@/lib/api";
import { Post } from "@/types";

export default function FeedPage() {
  const router = useRouter();
  const username = useSelector((state: RootState) => state.user.username);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getPosts();
      setPosts(data.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!username) {
      router.replace("/");
    } else {
      fetchPosts();
    }
  }, [username, router, fetchPosts]);

  const handleDeleteClick = (id: number) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (post: Post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  if (!username) return null;

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex justify-center">
      <div className="w-full max-w-200 bg-white min-h-screen shadow-lg flex flex-col relative">
        <header className="bg-[#7695EC] text-white px-9 py-7">
          <h1 className="text-[22px] font-bold">CodeLeap Network</h1>
        </header>

        <div className="p-6 flex flex-col gap-6">
          <PostForm onSuccess={fetchPosts} />

          {isLoading ? (
            <p className="text-center text-gray-500 font-bold mt-10">
              Loading posts...
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                />
              ))}
            </div>
          )}
        </div>

        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          postId={postToDelete}
          onSuccess={fetchPosts}
        />

        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={postToEdit}
          onSuccess={fetchPosts}
        />
      </div>
    </main>
  );
}
