"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/collector/getAllDayPost", { withCredentials: true });
      if (data.success) {
        setPosts(data.post);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Day Posts</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 w-96 flex flex-col overflow-hidden"
            >
              {post.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {post.blogger?.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.blogger.image}
                        alt={post.blogger.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{post.blogger?.name || "Unknown"}</span>
                    <span className="text-xs text-gray-500">
                      {post.createdAt ? dayjs(post.createdAt).fromNow() : "Unknown time"}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-gray-700">{post.content}</p>

                <div className="flex items-center justify-between mt-2">
                  <span>👍 {post.likes || 0}</span>
                  <span>💬 {post.commentCount || 0} Comments</span>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-2">
                    <h3 className="font-semibold mb-1">Comments:</h3>
                    {post.comments.map((c) => (
                      <div key={c._id} className="flex items-center gap-2 mb-1">
                        <Image
                          src={c.image || "/default-profile.png"}
                          alt={c.commenter || "Anonymous"}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <div>
                          <span className="font-medium">{c.commenter || "Anonymous"}</span>
                          <p className="text-sm">{c.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
