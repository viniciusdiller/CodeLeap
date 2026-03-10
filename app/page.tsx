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
      // Salva o usuário no estado global do Redux
      dispatch(setUsername(inputValue.trim()));
      // Opcional/Bônus: Salvar no localStorage para manter a sessão ao atualizar a página
      localStorage.setItem("@codeleap:username", inputValue.trim());
      // Redireciona para a tela do Feed (que criaremos a seguir)
      router.push("/feed");
    }
  };

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px] rounded-2xl border-0 shadow-lg p-2">
        <CardHeader>
          <CardTitle className="text-[22px] font-bold text-black">
            Welcome to CodeLeap network!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEnter} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-black"
              >
                Please enter your username
              </label>
              <Input
                id="username"
                placeholder="John doe"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded-lg border-gray-400 focus-visible:ring-1 focus-visible:ring-black"
              />
            </div>

            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="bg-[#7695EC] hover:bg-[#7695EC]/90 text-white font-bold rounded-lg px-8 min-w-[111px]"
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
