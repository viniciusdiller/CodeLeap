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
import { Loader2, LogOut } from "lucide-react";
import { PostSkeleton } from "@/components/PostSkeleton";
import { Button } from "@/components/ui/button";

export default function FeedPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const fetchInitialPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getPosts(0, 10);
      setPosts(data.results);
      setOffset(10);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const data = await api.getPosts(offset, 10);
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setOffset((prev) => prev + 10);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("@codeleap:username");

    if (username) {
      setIsCheckingSession(false);
      fetchInitialPosts();
    } else if (storedUser) {
      dispatch(setUsername(storedUser));
    } else {
      router.replace("/");
    }
  }, [username, router, dispatch, fetchInitialPosts]);

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
          <PostForm onSuccess={fetchInitialPosts} />

          {isLoading ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 pb-10">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                />
              ))}

              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={loadMorePosts}
                    disabled={isLoadingMore}
                    variant="outline"
                    className="border-[#7695EC] text-[#7695EC] hover:bg-[#7695EC] hover:cursor-pointer hover:text-white font-bold px-8 py-6 rounded-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Loading...
                      </>
                    ) : (
                      "Load More Posts"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          postId={postToDelete}
          onSuccess={fetchInitialPosts}
        />

        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={postToEdit}
          onSuccess={fetchInitialPosts}
        />
      </div>
    </main>
  );
}
