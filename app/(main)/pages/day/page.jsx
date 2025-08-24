"use client";

import { Context } from "@/app/contextapi/ContextProvider";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import DaySkeleton from "./DaySkeleton";
dayjs.extend(relativeTime)

const Page = () => {
  const [alldays, setAlldays] = useState([]);
  const [comment, setComment] = useState({});
  const [activePost, setActivePost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState({})
  const { isloggedin } = useContext(Context)

  const getAlldays = async () => {
    try {
      const { data } = await axios.get("/api/day");
      if (data.success) {
        setAlldays(data.days);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAlldays();
  }, [])

  const postComment = async (postid) => {
    setPosting(prev => ({ ...prev, [postid]: true }))
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/comment', { comment: comment[postid], id: postid })
      if (data.success) {
        toast.success(`successfully commented`)
        setPosting(false)
        setComment(prev => ({ ...prev, [postid]: `` }))
        setAlldays(prev => prev.map(day => day._id === postid ? { ...day, commentCount: day.commentCount + 1 } : day))
      }
    } catch (error) {
      setPosting(false)
      console.log(error)
    }
    finally {
      setPosting(false)
    }
  }

  const openComments = async (id) => {
    try {
      const { data } = await axios.get(`/api/comment/${id}`);
      if (data.success) {
        setPostComments(data.comments);
        setActivePost(id);
        setModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">NGO Activity</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          <DaySkeleton />
        ) : (
          alldays.length > 0 ? (
            alldays.map((day, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden"
                style={{ width: "320px" }}
              >
                {day.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={day.image}
                      alt={day.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-3">
                    {day.blogger?.image ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={day.blogger.image}
                          alt={day.blogger.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300" />
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">
                        {day.blogger?.name || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {day.createdAt ? dayjs(day.createdAt).fromNow() : "Unknown time"}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {day.title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {day.content || "No description available"}
                  </p>

                  <div className="mt-4 border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition">
                        👍 <span className="text-sm">Like</span>
                      </button>

                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
                        onClick={() => openComments(day._id)}
                      >
                        💬 <span className="text-sm">Comment({day.commentCount}) </span>
                      </button>

                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {isloggedin && (<>
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={comment[day._id] || ``}
                          onChange={(e) => (setComment(prev => ({ ...prev, [day._id]: e.target.value })))}
                          className="flex-1 px-3 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        {posting[day._id] ? (<button
                          className="text-blue-500 font-semibold"
                          onClick={() => postComment(day._id)}
                        >
                          <Spinner />
                        </button>) : (<button
                          className="text-blue-500 font-semibold"
                          onClick={() => postComment(day._id)}
                        >
                          Post
                        </button>)}

                      </>)}

                      {modalOpen && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-[10000]">
                          <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-y-auto p-4 relative">
                            <button
                              className="absolute top-2 right-2 text-gray-500"
                              onClick={() => setModalOpen(false)}
                            >
                              ✕
                            </button>

                            <h2 className="text-lg font-bold mb-4">Comments</h2>

                            {postComments.length > 0 ? (
                              postComments.map((c, idx) => (
                                <div key={c._id || idx} className="flex items-center gap-2 mb-2">
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
                              ))
                            ) : (
                              <p className="text-gray-500">No comments yet.</p>
                            )}

                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No days found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
