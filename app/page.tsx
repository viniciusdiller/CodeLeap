"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUsername } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const isButtonDisabled = inputValue.trim() === "";

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      dispatch(setUsername(inputValue.trim()));
      localStorage.setItem("@codeleap:username", inputValue.trim());
      router.push("/feed");
    }
  };

  return (
    <main className="min-h-screen bg-[#DDDDDD] dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors duration-500">
      <Card className="w-full max-w-125 rounded-2xl border-0 shadow-lg p-2 dark:bg-zinc-800 transition-colors duration-500">
        <CardHeader>
          <CardTitle className="text-[22px] font-bold text-black dark:text-zinc-100 transition-colors duration-500">
            Welcome to CodeLeap network!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEnter} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-black dark:text-zinc-300 transition-colors duration-500"
              >
                Please enter your username
              </label>
              <Input
                id="username"
                placeholder="John doe"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded-lg border-gray-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-[#7695EC] transition-colors duration-500"
              />
            </div>

            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="bg-[#7695EC] hover:bg-[#7695EC]/90 text-white font-bold rounded-lg px-8 min-w-27.75 transition-all duration-300 disabled:bg-[#DDDDDD] disabled:text-black disabled:opacity-100 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
              >
                ENTER
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
