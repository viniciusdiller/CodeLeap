"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUsername, logout } from "@/store/userSlice";
import { PostForm } from "@/components/PostForm";
import { PostCard } from "@/components/PostCard";
import { DeletePostModal } from "@/components/DeletePostModal";
import { EditPostModal } from "@/components/EditPostModal";
import { api } from "@/lib/api";
import { Post } from "@/types";
import { LogOut, Loader2 } from "lucide-react";

export default function FeedPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

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

  // Session persistence: Recover user from localStorage if Redux state is lost (e.g., page refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("@codeleap:username");

    if (username) {
      setIsCheckingSession(false);
      fetchPosts();
    } else if (storedUser) {
      dispatch(setUsername(storedUser));
    } else {
      router.replace("/");
    }
  }, [username, router, dispatch, fetchPosts]);

  const handleLogout = () => {
    localStorage.removeItem("@codeleap:username");
    dispatch(logout());
    router.replace("/");
  };

  const handleDeleteClick = (id: number) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (post: Post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  // Prevent flashing the feed layout before validating the user session
  if (isCheckingSession) return null;

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex justify-center transition-all">
      <div className="w-full max-w-200 bg-white min-h-screen shadow-lg flex flex-col relative">
        <header className="bg-[#7695EC] text-white px-9 py-7 flex justify-between items-center">
          <h1 className="text-[22px] font-bold">CodeLeap Network</h1>
          <button
            onClick={handleLogout}
            title="Logout"
            className="hover:opacity-75 transition-opacity cursor-pointer p-2 rounded-full hover:bg-black/10"
          >
            <LogOut size={28} />
          </button>
        </header>

        <div className="p-6 flex flex-col gap-6">
          <PostForm onSuccess={fetchPosts} />

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-[#7695EC]" size={48} />
            </div>
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
