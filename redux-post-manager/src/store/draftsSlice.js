import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drafts: [],
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    addDraft: (state, action) => {
      state.drafts.push(action.payload);
    },

    deleteDraft: (state, action) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload
      );
    },
  },
});

export const { addDraft, deleteDraft } = draftsSlice.actions;

export default draftsSlice.reducer;