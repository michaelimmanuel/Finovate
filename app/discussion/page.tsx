"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

type Comment = {
  id: number;
  author: string;
  content: string;
  likes: number;
};

type Post = {
  isLiked: boolean;
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  image?: string;
  date: string;
  category: string;
};

export default function DiscussionPage() {
  /* -----------------------------
     Helper / Dummy generators
  ----------------------------- */
  const randomBioFinance = () =>
    [
      "Financial analyst with a focus on market trends and personal wealth growth.",
      "Passionate about budgeting, investments, and building long-term financial freedom.",
      "Tech-savvy investor sharing insights on crypto, stocks, and digital finance.",
      "Researching consumer behavior, fintech adoption, and modern money habits.",
    ][Math.floor(Math.random() * 4)];

  const randomCategory = () =>
    ["Investing", "Budgeting", "Economy", "Financial Tips", "Crypto"][
      Math.floor(Math.random() * 5)
    ];

  const randomFinancePost = () => ({
    title: [
      "How to Build a Solid Emergency Fund",
      "Why Young Adults Should Start Investing Early",
      "Managing Debt Without Stress",
      "Smart Saving Habits for 2025",
      "Understanding Market Volatility",
    ][Math.floor(Math.random() * 5)],
    likes: Math.floor(Math.random() * 300),
    comments: Math.floor(Math.random() * 50),
    category: randomCategory(),
  });

  const recommendedUsers = [
    { name: "Wilia+", starred: false },
    { name: "Marco", starred: true },
    { name: "Sena", starred: false },
    { name: "Livia", starred: true },
  ];

  const typeList = ["Finansial", "Saham", "Budgeting"];

  /* -----------------------------
     Initial posts (matching Post type)
  ----------------------------- */
  const initialPostsByCategory: Record<string, Post[]> = {
    crypto: Array.from({ length: 8 }, (_, i) => ({
      isLiked: false,
      id: 100 + i,
      title: `Crypto Post #${i + 1}`,
      content: `This is crypto discussion post #${
        i + 1
      }. What are your thoughts on the latest trends?`,
      author: ["alice", "bob", "carol", "dan"][i % 4],
      likes: 10 + ((i * 3) % 17),
      dislikes: Math.floor(Math.random() * 5),
      comments: [],
      image: `https://picsum.photos/seed/crypto${i}/600/300`,
      date: "2025-01-01",
      category: "crypto",
    })),

    macro: Array.from({ length: 8 }, (_, i) => ({
      isLiked: false,
      id: 200 + i,
      title: `Macro Post #${i + 1}`,
      content: `Macro trends and economic news post #${i + 1}.`,
      author: ["macrofan", "economist", "jane", "john"][i % 4],
      likes: 7 + ((i * 2) % 13),
      dislikes: Math.floor(Math.random() * 4),
      comments: [],
      image: `https://picsum.photos/seed/macro${i}/600/300`,
      date: "2025-01-01",
      category: "macro",
    })),

    // NOTE: key with space must be quoted
    "personal finance": Array.from({ length: 8 }, (_, i) => ({
      isLiked: false,
      id: 400 + i,
      title: `Personal Finance Post #${i + 1}`,
      content: `Tips and questions about personal finance #${i + 1}.`,
      author: ["pfuser", "saver", "alex", "kim"][i % 4],
      likes: 3 + ((i * 4) % 11),
      dislikes: Math.floor(Math.random() * 3),
      comments: [],
      image: `https://picsum.photos/seed/pf${i}/600/300`,
      date: "2025-01-01",
      category: "personal finance",
    })),

    stocks: Array.from({ length: 8 }, (_, i) => ({
      isLiked: false,
      id: 300 + i,
      title: `Stocks Post #${i + 1}`,
      content: `Which stock are you watching this week? Post #${i + 1}.`,
      author: ["stockpicker", "investor", "lisa", "mike"][i % 4],
      likes: 7 + ((i * 5) % 19),
      dislikes: Math.floor(Math.random() * 5),
      comments: [],
      image: `https://picsum.photos/seed/stocks${i}/600/300`,
      date: "2025-01-01",
      category: "stocks",
    })),
  };

  /* -----------------------------
     Component state
  ----------------------------- */
  const categories = ["crypto", "macro", "personal finance", "stocks"];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [postsByCategory, setPostsByCategory] = useState<
    Record<string, Post[]>
  >(initialPostsByCategory);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  /* -----------------------------
     Handlers
  ----------------------------- */
  function handleAddComment(postId: number) {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "guest",
      content: newComment.trim(),
      likes: 0,
    };

    setPostsByCategory((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      ),
    }));

    setOpenPost((prev) =>
      prev && prev.id === postId
        ? { ...prev, comments: [...prev.comments, comment] }
        : prev
    );

    setNewComment("");
  }

  function handleLike(postId: number) {
    setPostsByCategory((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1, isLiked: true } : p
      ),
    }));

    if (openPost?.id === postId) {
      setOpenPost({ ...openPost, likes: openPost.likes + 1, isLiked: true });
    }
  }

  function handleCommentLike(postId: number, commentId: number) {
    setPostsByCategory((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId ? { ...c, likes: c.likes + 1 } : c
              ),
            }
          : p
      ),
    }));

    setOpenPost((prev) =>
      prev && prev.id === postId
        ? {
            ...prev,
            comments: prev.comments.map((c) =>
              c.id === commentId ? { ...c, likes: c.likes + 1 } : c
            ),
          }
        : prev
    );
  }

  function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const created: Post = {
      isLiked: false,
      id: Date.now(),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      author: "guest",
      likes: 0,
      dislikes: 0,
      comments: [],
      image: `https://picsum.photos/seed/${Math.floor(
        Math.random() * 100000
      )}/600/300`,
      date: new Date().toISOString(),
      category: activeCategory,
    };

    setPostsByCategory((prev) => ({
      ...prev,
      [activeCategory]: [created, ...prev[activeCategory]],
    }));

    setNewPost({ title: "", content: "" });
    setShowPostModal(false);
  }

  /* -----------------------------
     Render
  ----------------------------- */
  return (
    <main className="flex gap-6 w-full max-w-7xl mx-auto px-4 py-8">
      {/* LEFT SIDEBAR */}
      <aside className="w-60 sticky top-6 h-fit">
        <h3 className="font-bold mb-4 text-lg">RECOMMENDED PEOPLE</h3>

        <div className="flex flex-col gap-3 mb-10">
          {recommendedUsers.map((u) => (
            <Link
              key={u.name}
              href={`/people/${encodeURIComponent(u.name)}`}
              className="flex items-center gap-2 cursor-pointer hover:opacity-60"
            >
              <div className="w-5 h-5 rounded-full bg-gray-300" />
              <span className="text-sm">{u.name}</span>
              {u.starred && <Star className="w-4 h-4 text-yellow-500" />}
            </Link>
          ))}
        </div>

        <h3 className="font-bold mb-3 text-lg">TYPE</h3>
        <div className="flex flex-col gap-2">
          {typeList.map((t) => (
            <div key={t} className="text-sm">
              {t}
            </div>
          ))}
        </div>
      </aside>

      {/* MIDDLE CONTENT */}
      <section className="flex-1 flex flex-col gap-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCategory === cat ? "bg-black text-white" : "bg-white"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="mb-4 flex justify-end">
          <Button onClick={() => setShowPostModal(true)}>New Post</Button>
        </div>

        <div className="flex flex-col gap-8">
          {postsByCategory[activeCategory]?.length === 0 && (
            <div className="text-center text-muted-foreground">
              No posts yet in this category.
            </div>
          )}

          {postsByCategory[activeCategory]?.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-accent/10 transition flex gap-4"
              onClick={() => setOpenPost(post)}
            >
              <img
                src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(
                  post.author
                )}`}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover border flex-shrink-0 mt-1"
              />

              <div className="flex-1 flex flex-col">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}

                <div className="mb-3">
                  <h2 className="font-heading text-lg font-semibold mb-1 leading-tight tracking-wide">
                    {post.title}
                  </h2>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-3">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    {post.comments.length} comment
                    {post.comments.length !== 1 ? "s" : ""}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      by {post.author}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      aria-label="Like post"
                      className="hover:bg-red-100"
                    >
                      <Heart
                        className="w-5 h-5 text-red-500"
                        fill={post.isLiked ? "red" : "none"}
                      />
                    </Button>

                    <span className="font-bold text-lg">{post.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RIGHT: Post Modal (contains right-sidebar inside modal) */}
      <Modal open={showPostModal} onClose={() => setShowPostModal(false)}>
        {/* Create Post modal */}
        <form
          onSubmit={handleAddPost}
          className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg mx-auto"
        >
          <h2 className="font-heading text-xl mb-2">
            Create a new post in{" "}
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h2>
          <input
            className="border rounded px-3 py-2"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            autoFocus
          />
          <textarea
            className="border rounded px-3 py-2 min-h-[80px]"
            placeholder={`Share something in ${activeCategory}...`}
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPostModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!openPost} onClose={() => setOpenPost(null)}>
        {openPost && (
          <div className="mt-96 bg-white rounded-lg shadow p-6 w-full max-w-7xl mx-auto flex gap-6">
            {/* LEFT: main post content */}
            <div className="flex-1">
              <h2 className="font-bold text-xl mb-3">{openPost.title}</h2>

              {openPost.image && (
                <img src={openPost.image} className="w-full rounded-md mb-4" />
              )}

              <p className="text-sm mb-6">{openPost.content}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-muted-foreground">
                  {openPost.comments.length} comment
                  {openPost.comments.length !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    by {openPost.author}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(openPost.id)}
                    aria-label="Like post"
                  >
                    <Heart
                      className="w-5 h-5 text-red-500"
                      fill={openPost.isLiked ? "red" : "none"}
                    />
                  </Button>
                  <span className="font-bold text-lg">{openPost.likes}</span>
                </div>
              </div>

              <h3 className="font-semibold mb-2">Comments</h3>

              <div className="flex flex-col gap-3 mb-4">
                {openPost.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-100 p-3 rounded flex gap-3 items-start"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCommentLike(openPost.id, comment.id)}
                      aria-label="Like comment"
                    >
                      <Heart className="w-4 h-4 text-red-500" fill="none" />
                    </Button>
                    <div>
                      <span className="text-xs text-gray-600">
                        {comment.author}
                      </span>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      {comment.likes} 👍
                    </div>
                  </div>
                ))}
                {openPost.comments.length === 0 && (
                  <div className="text-xs text-muted-foreground">
                    No comments yet.
                  </div>
                )}
              </div>

              <form
                className="flex gap-2 mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(openPost.id);
                }}
              >
                <textarea
                  className="border rounded px-3 py-2 flex-1 resize-none min-h-[40px]"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={1}
                  required
                />
                <Button type="submit" disabled={!newComment.trim()}>
                  Comment
                </Button>
              </form>
            </div>

            {/* RIGHT: sidebar inside modal */}
            <aside className="w-80 flex-shrink-0">
              {/* AUTHOR CARD */}
              <div className="p-4 bg-white rounded shadow mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(
                      openPost.author
                    )}`}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <h4 className="font-semibold">{openPost.author}</h4>
                    <Button
                      size="sm"
                      className="mt-1"
                      onClick={() =>
                        setFollowed((prev) => ({
                          ...prev,
                          [openPost.author]: !prev[openPost.author],
                        }))
                      }
                    >
                      {followed?.[openPost.author] ? "Followed" : "Follow"}
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{randomBioFinance()}</p>
              </div>

              {/* OTHER THREAD */}
              <div className="p-4 bg-white rounded shadow mb-6">
                <h4 className="font-bold mb-3 text-sm">
                  OTHER THREAD THEY WROTE
                </h4>

                {Array.from({ length: 3 }).map((_, i) => {
                  const p = randomFinancePost();
                  return (
                    <div key={i} className="mb-4">
                      <p className="font-medium text-sm">{p.title}</p>

                      <div className="flex items-center text-xs mt-1 justify-between">
                        <div className="flex gap-3">
                          <span>👍 {p.likes}</span>
                          <span>💬 {p.comments}</span>
                        </div>

                        <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                          {p.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RECOMMENDED POSTS */}
              <div className="p-4 bg-white rounded shadow">
                <h4 className="font-bold mb-3 text-sm">RECOMMENDED POSTS</h4>

                {Array.from({ length: 4 }).map((_, i) => {
                  const r = randomFinancePost();
                  const author = [
                    "Liam",
                    "Chloe",
                    "Nathan",
                    "Sophia",
                    "Evelyn",
                  ][Math.floor(Math.random() * 5)];

                  return (
                    <div key={i} className="mb-3 flex gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${author}`}
                        className="w-9 h-9 rounded-full border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{author}</p>
                        <p className="text-sm">{r.title}</p>

                        <div className="text-xs mt-1 flex justify-between">
                          <div className="flex gap-3">
                            <span>👍 {r.likes}</span>
                            <span>💬 {r.comments}</span>
                          </div>

                          <span className="px-2 py-1 bg-orange-200 rounded text-xs">
                            {r.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        )}
      </Modal>
    </main>
  );
}
