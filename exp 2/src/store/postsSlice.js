import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: postsAdapter.addOne,

    deletePost: postsAdapter.removeOne,

    updatePost: postsAdapter.updateOne,
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;