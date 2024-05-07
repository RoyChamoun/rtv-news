import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  title: string;
  link: string;
  image_url?: string;
}

interface SavedPostsState {
  savedPosts: Post[];
}

const initialState: SavedPostsState = {
  savedPosts: [],
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    savePost: (state, action: PayloadAction<Post>) => {
      const existingPost = state.savedPosts.find(
        (post) => post._id === action.payload._id
      );
      if (!existingPost) {
        state.savedPosts.push(action.payload);
      }
    },
    unsavePost: (state, action: PayloadAction<string>) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post._id !== action.payload
      );
    },
    clearAllPosts: (state) => {
      state.savedPosts = [];
    },
  },
});

export const { savePost, unsavePost, clearAllPosts } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;
