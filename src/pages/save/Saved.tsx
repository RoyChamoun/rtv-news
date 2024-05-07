import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { unsavePost } from "../../redux/savedPostsSlice";

const defaultImage = require("../../assets/logo.png");
const savedIcon = require("../../assets/saved.png");

const SavedNews: React.FC = () => {
  const dispatch = useDispatch();
  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts
  );

  const handleRemovePost = (postId: string) => {
    dispatch(unsavePost(postId));
  };
  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-400 bg-fixed bg-cover bg-center">
      {savedPosts.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl font-semibold text-white">
            No saved posts.
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-center mb-4 p-2 pt-24 text-white">
            Your Saved Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
            {savedPosts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col items-center justify-between border border-gray-300 p-2 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out hover:shadow-xl"
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
                  onClick={() => handleRemovePost(post._id)}
                  className="mt-auto"
                >
                  <img
                    src={savedIcon}
                    alt="Remove Saved Icon"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedNews;
