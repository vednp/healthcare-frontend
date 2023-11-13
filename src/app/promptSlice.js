import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
  summary: "",
  isLoading: false, // Added isLoading boolean
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPrompt, setSummary, setLoading } = promptSlice.actions;
export default promptSlice.reducer;
