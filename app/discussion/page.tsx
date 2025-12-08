"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Heart } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: Comment[];
  image: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
}

const initialPostsByCategory: Record<string, Post[]> = {
  crypto: Array.from({ length: 10 }, (_, i) => ({
    id: 100 + i,
    title: `Crypto Post #${i + 1}`,
    content: `This is a sample crypto discussion post number ${i + 1}. What are your thoughts on the latest trends?`,
    author: ["alice", "bob", "carol", "dan", "eve"][i % 5],
    likes: 10 + (i * 3) % 17,
    comments: [],
    image: `https://picsum.photos/seed/crypto${i}/600/300`,
  })),
  macro: Array.from({ length: 10 }, (_, i) => ({
    id: 200 + i,
    title: `Macro Post #${i + 1}`,
    content: `Macro trends and economic news post #${i + 1}.`,
    author: ["macrofan", "economist", "jane", "john", "emma"][i % 5],
    likes: 5 + (i * 2) % 13,
    comments: [],
    image: `https://picsum.photos/seed/macro${i}/600/300`,
  })),
  "personal finance": Array.from({ length: 10 }, (_, i) => ({
    id: 400 + i,
    title: `Personal Finance Post #${i + 1}`,
    content: `Tips and questions about personal finance #${i + 1}.`,
    author: ["pfuser", "saver", "alex", "kim", "lee"][i % 5],
    likes: 3 + (i * 4) % 11,
    comments: [],
    image: `https://picsum.photos/seed/pf${i}/600/300`,
  })),
  stocks: Array.from({ length: 10 }, (_, i) => ({
    id: 300 + i,
    title: `Stocks Post #${i + 1}`,
    content: `Which stock are you watching this week? Post #${i + 1}.`,
    author: ["stockpicker", "investor", "lisa", "mike", "nancy"][i % 5],
    likes: 7 + (i * 5) % 19,
    comments: [],
    image: `https://picsum.photos/seed/stocks${i}/600/300`,
  })),
};

export default function DiscussionPage() {
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const categories = ["crypto", "macro", "personal finance", "stocks"];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [postsByCategory, setPostsByCategory] = useState<Record<string, Post[]>>(initialPostsByCategory);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showPostModal, setShowPostModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  function handleAddComment(postId: number) {
    if (!newComment.trim()) return;
    setPostsByCategory(posts => ({
      ...posts,
      [activeCategory]: posts[activeCategory].map(p =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now(),
                  author: "guest",
                  content: newComment,
                  likes: 0,
                },
              ],
            }
          : p
      ),
    }));
    setNewComment("");
    // Optionally update openPost to reflect the new comment immediately
    setOpenPost(prev =>
      prev && prev.id === postId
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              {
                id: Date.now(),
                author: "guest",
                content: newComment,
                likes: 0,
              },
            ],
          }
        : prev
    );
  }

  function handleLike(postId: number) {
    setPostsByCategory(posts => ({
      ...posts,
      [activeCategory]: posts[activeCategory].map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
    }));
  }
  function handleCommentLike(postId: number, commentId: number) {
    setPostsByCategory(posts => ({
      ...posts,
      [activeCategory]: posts[activeCategory].map(p => p.id === postId ? {
        ...p,
        comments: p.comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
      } : p)
    }));
  }
  function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    setPostsByCategory(posts => ({
      ...posts,
      [activeCategory]: [
        {
          id: Date.now(),
          title: newPost.title,
          content: newPost.content,
          author: "guest",
          likes: 0,
          comments: [],
          image: `https://picsum.photos/seed/${Math.floor(Math.random()*100000)}/600/300`,
        },
        ...posts[activeCategory],
      ]
    }));
    setNewPost({ title: "", content: "" });
    setShowPostModal(false);
  }
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="font-heading text-3xl mb-8">Forum</h1>
      <div className="flex gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-accent text-black border-accent" : "bg-white text-muted-foreground border-muted"}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="mb-8 flex justify-end">
        <Button onClick={() => setShowPostModal(true)}>New Post</Button>
      </div>
      <Modal open={showPostModal} onClose={() => setShowPostModal(false)}>
        <form onSubmit={handleAddPost} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg mx-auto">
          <h2 className="font-heading text-xl mb-2">Create a new post in {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
          <input
            className="border rounded px-3 py-2"
            placeholder="Title"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            autoFocus
          />
          <textarea
            className="border rounded px-3 py-2 min-h-[80px]"
            placeholder={`Share something in ${activeCategory}...`}
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowPostModal(false)}>Cancel</Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </Modal>
      <div className="flex flex-col gap-8">
        {postsByCategory[activeCategory].length === 0 && (
          <div className="text-center text-muted-foreground">No posts yet in this category.</div>
        )}
        {postsByCategory[activeCategory].map(post => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-accent/10 transition flex items-start gap-4 min-h-[140px]"
            onClick={() => setOpenPost(post)}
          >
            <img
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(post.author)}`}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover border flex-shrink-0 mt-1"
            />
            <div className="flex-1 flex flex-col justify-between h-full">
              <img
                src={post.image}
                alt="Post visual"
                className="w-full h-48 object-cover rounded mb-3"
              />
              <div className="mb-3">
                <h2 className="font-heading text-lg font-semibold mb-1 leading-tight tracking-wide">{post.title}</h2>
                <p className="mb-2 text-sm text-muted-foreground line-clamp-3">{post.content}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="text-xs text-muted-foreground">{post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">by {post.author}</span>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); handleLike(post.id); }} aria-label="Like post">
                    <Heart className="w-5 h-5 text-red-500" fill="none" />
                  </Button>
                  <span className="font-bold text-lg">{post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post details modal */}
      <Modal open={!!openPost} onClose={() => setOpenPost(null)}>
        {openPost && (
          <div className="bg-white rounded-lg shadow p-6 flex items-start gap-4 w-full max-w-4xl mx-auto min-h-[140px]">
            <img
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(openPost.author)}`}
              alt={openPost.author}
              className="w-12 h-12 rounded-full object-cover border flex-shrink-0 mt-1"
            />
            <div className="flex-1 flex flex-col justify-between h-full">
              <img
                src={openPost.image}
                alt="Post visual"
                className="w-full h-64 object-cover rounded mb-3"
              />
              <div className="mb-3">
                <h2 className="font-heading text-lg font-semibold mb-1 leading-tight tracking-wide">{openPost.title}</h2>
                <p className="mb-2 text-sm text-muted-foreground">{openPost.content}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="text-xs text-muted-foreground">{openPost.comments.length} comment{openPost.comments.length !== 1 ? "s" : ""}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">by {openPost.author}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleLike(openPost.id)} aria-label="Like post">
                    <Heart className="w-5 h-5 text-red-500" fill="none" />
                  </Button>
                  <span className="font-bold text-lg">{openPost.likes}</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-sm mt-6">Comments</h3>
              <div className="flex flex-col gap-3 mb-4">
                {openPost.comments.map(comment => (
                  <div key={comment.id} className="bg-accent/10 rounded p-3 flex items-start gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleCommentLike(openPost.id, comment.id)} aria-label="Like comment">
                      <Heart className="w-4 h-4 text-red-500" fill="none" />
                    </Button>
                    <span className="font-bold text-base">{comment.likes}</span>
                    <div>
                      <span className="text-xs text-muted-foreground">{comment.author}</span>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
                {openPost.comments.length === 0 && <div className="text-xs text-muted-foreground">No comments yet.</div>}
              </div>
              <form
                className="flex gap-2 mt-2"
                onSubmit={e => {
                  e.preventDefault();
                  handleAddComment(openPost.id);
                }}
              >
                <textarea
                  className="border rounded px-3 py-2 flex-1 resize-none min-h-[40px]"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={1}
                  required
                />
                <Button type="submit" disabled={!newComment.trim()}>Comment</Button>
              </form>
            </div>
          </div>
        )}
      </Modal>

    </main>
  );
}
  
