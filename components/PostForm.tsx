"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostFormProps {
  onSuccess?: () => void; // Função que chamaremos para avisar o Feed que um post foi criado
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pegamos o usuário logado para enviar na API
  const username = useSelector((state: RootState) => state.user.username);

  // Regra de negócio: Desativa se title OU content estiverem vazios (ou só com espaços)
  const isButtonDisabled =
    title.trim() === "" || content.trim() === "" || isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled || !username) return;

    setIsLoading(true);

    try {
      // Fazendo a requisição POST para a API do CodeLeap
      const response = await fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        // Limpa o formulário após o sucesso
        setTitle("");
        setContent("");
        // Avisa a página mãe (Feed) que precisa buscar os posts novamente
        if (onSuccess) onSuccess();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-[#999999] rounded-xl shadow-none">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-[22px] font-bold text-black">
          What's on your mind?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-base text-black">
              Title
            </label>
            <Input
              id="title"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border-[#777777] focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-base text-black">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg border-[#777777] focus-visible:ring-1 focus-visible:ring-black min-h-[80px] resize-y"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="bg-[#7695EC] hover:bg-[#7695EC]/90 text-white font-bold rounded-lg px-8 min-w-[120px] disabled:bg-[#DDDDDD] disabled:text-black disabled:opacity-100"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
