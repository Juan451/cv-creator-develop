/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {},
  reducers: {
    addSkills: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { addSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
