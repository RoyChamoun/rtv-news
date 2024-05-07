import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAuthState,
  selectAccessToken,
  selectRefreshToken,
  setAccessToken,
} from "../../redux/authSlice";
import { savePost, unsavePost } from "../../redux/savedPostsSlice";
import { RootState } from "../../redux/store";
import { api } from "../../utils/api";

const saveIcon = require("../../assets/save.png");
const savedIcon = require("../../assets/saved.png");
const defaultImage = require("../../assets/logo.png");

interface Post {
  _id: string;
  title: string;
  link: string;
  image_url?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const News: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const savedPosts = useSelector((state: RootState) =>
    state.savedPosts.savedPosts.map((post) => post._id)
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenRefreshed, setTokenRefreshed] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken, pagination.currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    if (!accessToken) {
      dispatch(resetAuthState());
    }
    try {
      const response = await axios.get(`${api}posts`, {
        params: { page: pagination.currentPage, pageSize: 8 },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(response.data.results);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage,
      });
      setError(null);
    } catch (error: any) {
      if (!tokenRefreshed && error.response && error.response.status === 403) {
        await fetchNewAccessToken();
      } else {
        dispatch(resetAuthState());
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNewAccessToken = async () => {
    try {
      const response = await axios.post(`${api}refresh-token`, {
        refreshToken: refreshToken,
        token_expires_in: "0.2m",
      });
      const newAccessToken = response.data.accessToken;
      dispatch(setAccessToken(newAccessToken));
      setTokenRefreshed(true);
    } catch (error) {}
  };

  const handleSavePost = (post: Post) => {
    const isPostSaved = savedPosts.includes(post._id);
    if (isPostSaved) {
      dispatch(unsavePost(post._id));
    } else {
      dispatch(savePost(post));
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div
      className="flex flex-col h-full bg-blue-400"
      style={{ backgroundAttachment: "fixed" }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 pt-24"
        style={{ minHeight: "100vh" }}
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col items-center justify-between border border-gray-300 p-2 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out hover:shadow-xl"
            style={{ minHeight: "350px" }}
          >
            <img
              src={post.image_url || defaultImage}
              alt="Post"
              className="w-full h-60 object-cover rounded-md mb-2"
            />
            <div
              className="text-lg font-bold text-black mb-2 cursor-pointer"
              style={{ minHeight: "3rem" }}
              onClick={() => handleOpenLink(post.link)}
            >
              {post.title}
            </div>
            <button
              onClick={() => handleSavePost(post)}
              style={{ marginTop: "auto" }}
            >
              <img
                src={savedPosts.includes(post._id) ? savedIcon : saveIcon}
                alt="Save Icon"
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 p-4">{`Error: ${error}`}</div>}
      {loading && (
        <div className="my-4 flex justify-center">
          <span>Loading...</span>
        </div>
      )}
      <div className="flex flex-row justify-between p-2">
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage - 1,
            }))
          }
          disabled={!pagination.hasPrevPage}
          className="disabled:opacity-50 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Previous Page
        </button>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }))
          }
          disabled={!pagination.hasNextPage}
          className="disabled:opacity-50 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700  transition duration-300 ease-in-out"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default News;
