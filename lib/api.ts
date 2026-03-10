const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  createPost: async (data: {
    username: string;
    title: string;
    content: string;
  }) => {
    const response = await fetch(`${API_URL}/careers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create post");
    return response.json();
  },

  getPosts: async (offset = 0, limit = 10) => {
    const response = await fetch(
      `${API_URL}/careers/?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },
};
