"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function FeedPage() {
  const router = useRouter();
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    if (!username) {
      router.replace("/");
    }
  }, [username, router]);

  if (!username) return null;

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex justify-center">
      <div className="w-full max-w-[800px] bg-white min-h-screen shadow-lg flex flex-col">
        <header className="bg-[#7695EC] text-white px-9 py-7">
          <h1 className="text-[22px] font-bold">CodeLeap Network</h1>
        </header>

        <div className="p-6 flex flex-col gap-6">
          <p className="text-gray-500 text-center mt-10">
            Form and posts will go here shortly...
          </p>
        </div>
      </div>
    </main>
  );
}
