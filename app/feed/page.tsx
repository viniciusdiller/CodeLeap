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
import { LogOut, Loader2, Search, ChevronUp } from "lucide-react";
import { PostSkeleton } from "@/components/PostSkeleton";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#DDDDDD] dark:bg-zinc-950 flex justify-center transition-all duration-300">
      <div className="w-full max-w-200 bg-white dark:bg-zinc-900 min-h-screen shadow-lg flex flex-col relative transition-colors duration-300">
        <header className="bg-[#7695EC] text-white px-9 py-7 flex justify-between items-center">
          <h1 className="text-[22px] font-bold">CodeLeap Network</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              title="Logout"
              className="hover:opacity-75 transition-opacity cursor-pointer p-2 rounded-full hover:bg-black/10"
            >
              <LogOut size={28} />
            </button>
          </div>
        </header>
        <div className="p-6 flex flex-col gap-6">
          <PostForm onSuccess={fetchInitialPosts} />

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search posts by title or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#999999] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#7695EC] transition-all"
            />
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 pb-10">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 font-medium">
                  No posts found matching {searchTerm}
                </div>
              )}

              {hasMore && searchTerm === "" && (
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
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#7695EC] text-white p-3 rounded-full shadow-lg hover:bg-[#7695EC]/90 hover:scale-110 active:scale-95 transition-all duration-300 z-50 animate-in fade-in slide-in-from-bottom-5 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} />
        </button>
      )}
    </main>
  );
}
