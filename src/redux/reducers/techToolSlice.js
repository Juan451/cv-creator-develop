import { createSlice } from '@reduxjs/toolkit';

const techToolSlice = createSlice({
  name: 'techTool',
  initialState: [],
  reducers: {
    addTechTool: (state, action) => [...state, action.payload],
  },
});

export const { addTechTool } = techToolSlice.actions;

export default techToolSlice.reducer;
